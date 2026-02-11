import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.authUser.upsert({
        where: { email },
        update: {
        passwordHash,
        role: "ADMIN",
        isEmailVerified: true,
        isActive: true,
        },
        create: {
        email,
        passwordHash,
        role: "ADMIN",
        isEmailVerified: true,
        isActive: true,
        },
    });

    console.log("✅ Admin user seeded/updated successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
