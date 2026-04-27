import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/**
 * CONFIG (production-safe via env)
 */
const TOTAL = Number(process.env.SEED_TOTAL || 10000);
const BATCH_SIZE = Number(process.env.SEED_BATCH_SIZE || 1000);
const CLEAR_BEFORE_SEED = process.env.SEED_RESET === "true";

const jobTitles = [
  "Software Engineer",
  "Senior Engineer",
  "Tech Lead",
  "Manager",
  "QA Engineer",
  "DevOps Engineer",
];

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "HR",
  "Operations",
  "Finance",
];

const countries = ["India", "USA", "UK", "Germany", "Canada"];

function generateEmployee() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)]!,
    department: departments[Math.floor(Math.random() * departments.length)]!,
    country: countries[Math.floor(Math.random() * countries.length)]!,
    salary: Math.floor(Math.random() * 90000 + 10000),
    experienceYears: Math.floor(Math.random() * 20),
  };
}

/**
 * Optional cleanup (idempotent seeding)
 */
async function clearData() {
  console.log("🧹 Clearing existing employees...");
  await prisma.employee.deleteMany();
}

/**
 * Batch insert for performance
 */
async function seedBatch(batchNumber: number, totalBatches: number) {
  const data = Array.from({ length: BATCH_SIZE }).map(generateEmployee);

  await prisma.employee.createMany({
    data,
  });

  console.log(
    `Batch ${batchNumber}/${totalBatches} inserted (${data.length} records)`
  );
}

async function main() {
  console.log("Starting production-grade seed...");

  console.log(`Total: ${TOTAL}`);
  console.log(`Batch Size: ${BATCH_SIZE}`);

  if (CLEAR_BEFORE_SEED) {
    await clearData();
  }

  const totalBatches = Math.ceil(TOTAL / BATCH_SIZE);

  for (let i = 1; i <= totalBatches; i++) {
    await seedBatch(i, totalBatches);
  }

  console.log("Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
