import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.$queryRaw`SELECT * FROM "Cms" WHERE key = 'home.hero' LIMIT 1`;
  console.log("DB RAW HERO:", JSON.stringify(rows, null, 2));
}
main().finally(() => prisma.$disconnect());