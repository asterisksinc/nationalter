import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("\n📋 All Users in Database:\n");
    console.log("=" + "=".repeat(79));

    const users = await prisma.authUser.findMany({
      include: {
        registration: true,
      },
      orderBy: { id: "asc" },
    });

    if (users.length === 0) {
      console.log("No users found in database");
      return;
    }

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Email Verified: ${user.isEmailVerified}`);
      console.log(`   Is Active: ${user.isActive}`);
      console.log(`   Last Login: ${user.lastLoginAt || "Never"}`);
      console.log(
        `   Registration ID: ${user.registration?.id || "Not linked"}`
      );
      console.log(
        `   Registration Status: ${user.registration?.status || "N/A"}`
      );
    });

    console.log("\n" + "=".repeat(80));
    console.log(`\nTotal Users: ${users.length}\n`);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
