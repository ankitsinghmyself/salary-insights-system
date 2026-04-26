import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const BATCH_SIZE = 1000;
const TOTAL = 10000;

// simple pools (faster than faker loops for some fields)
const jobTitles = [
  "Software Engineer",
  "Senior Engineer",
  "Manager",
  "Tech Lead",
  "QA Engineer",
  "DevOps Engineer",
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
    country: countries[Math.floor(Math.random() * countries.length)]!,
    salary: Math.floor(Math.random() * 90000 + 10000),
  };
}

async function main() {
  console.log("Seeding 10,000 employees...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const batch = Array.from({ length: BATCH_SIZE }).map(generateEmployee);

    await prisma.employee.createMany({
      data: batch,
    });

    console.log(`Inserted ${i + BATCH_SIZE}/${TOTAL}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });