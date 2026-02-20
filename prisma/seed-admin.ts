import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type SeedAccount = {
  email: string;
  password: string;
  role: "ADMIN" | "SCHOLAR" | "ORG";
};

type PendingSeed = {
  email: string;
  type: "MEDICAL" | "RESEARCHER" | "ORG";
  name: string;
  mobileOrNumber: string;
  city: string;
  state: string;
};

function getEnvOrFallback(key: string, fallback: string) {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function generateTempNationciteId() {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REG${ymd}${rand}`;
}

async function generateTicketId() {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const prefix = `TCK-${ymd}-`;

  const lastForDay = await prisma.tickets.findFirst({
    where: { ticketId: { startsWith: prefix } },
    orderBy: { id: "desc" },
    select: { ticketId: true },
  });

  let seq = 1;
  if (lastForDay?.ticketId) {
    const parts = lastForDay.ticketId.split("-");
    const lastSeq = Number(parts[parts.length - 1]);
    if (Number.isFinite(lastSeq)) {
      seq = lastSeq + 1;
    }
  }

  let candidate = `${prefix}${String(seq).padStart(4, "0")}`;
  while (await prisma.tickets.findUnique({ where: { ticketId: candidate }, select: { ticketId: true } })) {
    seq += 1;
    candidate = `${prefix}${String(seq).padStart(4, "0")}`;
  }

  return candidate;
}

async function upsertAdminAccount(account: SeedAccount) {
  const passwordHash = await bcrypt.hash(account.password, 10);

  await prisma.authUser.upsert({
    where: { email: account.email },
    update: {
      passwordHash,
      role: account.role,
      isEmailVerified: true,
      isActive: true,
    },
    create: {
      email: account.email,
      passwordHash,
      role: account.role,
      isEmailVerified: true,
      isActive: true,
    },
  });
}

async function cleanupExistingDummy(seed: PendingSeed) {
  const relatedRegistrations = new Set<number>();
  const relatedTickets = new Set<string>();

  const [medRows, resRows, orgRows] = await Promise.all([
    prisma.medicalProfessional.findMany({
      where: { email: seed.email },
      select: { registrationId: true },
    }),
    prisma.researchers.findMany({
      where: { email: seed.email },
      select: { registrationId: true },
    }),
    prisma.orgsRegistered.findMany({
      where: { email: seed.email },
      select: { registrationId: true },
    }),
  ]);

  for (const row of [...medRows, ...resRows, ...orgRows]) {
    if (row.registrationId) relatedRegistrations.add(row.registrationId);
  }

  if (relatedRegistrations.size > 0) {
    const regs = await prisma.registration.findMany({
      where: { id: { in: Array.from(relatedRegistrations) } },
      select: { id: true, ticketId: true },
    });

    for (const reg of regs) {
      if (reg.ticketId) relatedTickets.add(reg.ticketId);
    }
  }

  await prisma.$transaction(async (tx) => {
    await tx.medicalProfessional.deleteMany({ where: { email: seed.email } });
    await tx.researchers.deleteMany({ where: { email: seed.email } });
    await tx.orgsRegistered.deleteMany({ where: { email: seed.email } });

    if (relatedRegistrations.size > 0) {
      await tx.registration.deleteMany({
        where: { id: { in: Array.from(relatedRegistrations) } },
      });
    }

    if (relatedTickets.size > 0) {
      await tx.tickets.deleteMany({
        where: { ticketId: { in: Array.from(relatedTickets) } },
      });
    }

    await tx.authUser.deleteMany({ where: { email: seed.email } });
  });
}

async function seedPendingRegistration(seed: PendingSeed) {
  await cleanupExistingDummy(seed);

  const tempNationciteId = generateTempNationciteId();
  const ticketId = await generateTicketId();

  await prisma.$transaction(async (tx) => {
    const ticket = await tx.tickets.create({
      data: {
        ticketId,
        nationciteId: tempNationciteId,
        name: seed.name,
        type: seed.type,
        issueType: "NEW_REGISTRATION",
        description: "Seeded pending registration for admin review",
        status: "PENDING",
      },
    });

    const registration = await tx.registration.create({
      data: {
        nationciteId: tempNationciteId,
        type: seed.type,
        status: "PENDING",
        authUserId: null,
        ticketId: ticket.ticketId,
      },
    });

    if (seed.type === "RESEARCHER") {
      await tx.researchers.create({
        data: {
          registrationId: registration.id,
          nationciteId: tempNationciteId,
          name: seed.name,
          institute: "Indian Institute of Technology Hyderabad",
          instituteEmail: seed.email,
          orcidId: "0000-0002-1825-0097",
          institutionalIdCardUrl: null,
          mobile: seed.mobileOrNumber,
          email: seed.email,
          primaryDomain: "Computer Science",
          googleScholarUrl: "https://scholar.google.com/citations?user=seedtest",
          profilePhotoUrl: "https://example.com/profile-seed.jpg",
          status: "PENDING",
          plan: "FREE",
          city: seed.city,
          state: seed.state,
        },
      });
    }

    if (seed.type === "MEDICAL") {
      await tx.medicalProfessional.create({
        data: {
          registrationId: registration.id,
          nationciteId: tempNationciteId,
          name: seed.name,
          medCouncilRegNo: "MED-SEED-0001",
          stateCouncil: seed.state,
          mobile: seed.mobileOrNumber,
          email: seed.email,
          primaryHospital: "Apollo Hospitals",
          specialty: "General Medicine",
          researchFocus: "Public Health",
          medicalDegreeUrl: null,
          regCertificateUrl: null,
          status: "PENDING",
          plan: "FREE",
          city: seed.city,
          state: seed.state,
        },
      });
    }

    if (seed.type === "ORG") {
      await tx.orgsRegistered.create({
        data: {
          registrationId: registration.id,
          nationciteId: tempNationciteId,
          domain: "seed-org.example.edu.in",
          name: seed.name,
          email: seed.email,
          number: seed.mobileOrNumber,
          letterOfAuthorizationUrl: "https://example.com/seed-letter.pdf",
          accreditationProofUrl: "https://example.com/seed-accreditation.pdf",
          status: "PENDING",
          plan: "FREE",
          city: seed.city,
          state: seed.state,
        },
      });
    }
  });
}

async function main() {
  const adminEmail = getEnvOrFallback("ADMIN_EMAIL", "nationcitetesting@gmail.com");
  const adminPassword = getEnvOrFallback("ADMIN_PASSWORD", "NationCiteTesting@123");

  await upsertAdminAccount({
    email: adminEmail,
    password: adminPassword,
    role: "ADMIN",
  });
  console.log(` Seeded/updated admin: ${adminEmail}`);

  const pendingSeeds: PendingSeed[] = [
    {
      email: getEnvOrFallback("SEED_RESEARCHER_EMAIL", "yaswanth.kancharla65@gmail.com"),
      type: "RESEARCHER",
      name: "Yaswanth Kancharla",
      mobileOrNumber: "9990002222",
      city: "Hyderabad",
      state: "Telangana",
    },
    {
      email: getEnvOrFallback("SEED_MEDICAL_EMAIL", "ashitoshsable009@gmail.com"),
      type: "MEDICAL",
      name: "Ashitosh Sable",
      mobileOrNumber: "9990001111",
      city: "Pune",
      state: "Maharashtra",
    },
    {
      email: getEnvOrFallback("SEED_ORG_EMAIL", "ashitoshsable99@gmail.com"),
      type: "ORG",
      name: "Seed Research Institute",
      mobileOrNumber: "9990003333",
      city: "Bengaluru",
      state: "Karnataka",
    },
  ];

  for (const seed of pendingSeeds) {
    await seedPendingRegistration(seed);
    console.log(` Seeded pending registration: ${seed.email} (${seed.type})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
