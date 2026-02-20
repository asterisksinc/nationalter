/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const emails = [
  "yaswanth.kancharla65@gmail.com",
  "ashitoshsable009@gmail.com",
  "ashitoshsable99@gmail.com",
  "nationcitetesting@gmail.com",
];

async function getPendingByEmail(prisma, email) {
  const [medical, researcher, org] = await Promise.all([
    prisma.medicalProfessional.findFirst({
      where: { email },
      include: { registration: { include: { ticket: true } } },
    }),
    prisma.researchers.findFirst({
      where: { email },
      include: { registration: { include: { ticket: true } } },
    }),
    prisma.orgsRegistered.findFirst({
      where: { email },
      include: { registration: { include: { ticket: true } } },
    }),
  ]);

  const source = medical || researcher || org;
  if (!source) return null;

  const registration = source.registration;

  return {
    email,
    registrationType: registration?.type ?? null,
    registrationStatus: registration?.status ?? null,
    tempNationciteId: registration?.nationciteId ?? null,
    ticketId: registration?.ticket?.ticketId ?? null,
    ticketStatus: registration?.ticket?.status ?? null,
    submittedAt: registration?.ticket?.createdAt ?? registration?.createdAt ?? null,
    profileStatus: source.status ?? null,
    linkedAuthUser: registration?.authUserId ?? null,
  };
}

async function main() {
  const prisma = new PrismaClient();

  for (const email of emails) {
    const authUser = await prisma.authUser.findUnique({
      where: { email },
      include: { registration: true },
    });

    const pending = await getPendingByEmail(prisma, email);

    console.log(
      JSON.stringify(
        {
          email,
          authUserExists: !!authUser,
          authRole: authUser?.role ?? null,
          authHasRegistration: !!authUser?.registration,
          pendingRegistration: pending,
        },
        null,
        2,
      ),
    );
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
