import { prisma } from "../lib/prisma";

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  // Create sample projects
  const projects = await prisma.project.createMany({
    data: [
      {
        name: "AI Dashboard",
        status: "In Progress",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-11-15"),
        progress: 60,
        budget: 20000,
      },
      {
        name: "E-commerce Platform",
        status: "Pending",
        startDate: new Date("2025-10-10"),
        endDate: new Date("2026-01-20"),
        progress: 0,
        budget: 50000,
      },
      {
        name: "Mobile Banking App",
        status: "Completed",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-06-30"),
        progress: 100,
        budget: 75000,
      },
    ],
  });

  console.log(`✅ Seeded ${projects.count} projects.`);

  const allProjects = await prisma.project.findMany();

  for (const project of allProjects) {
    await prisma.task.createMany({
      data: [
        {
          name: "Initial Planning",
          status: "Completed",
          priority: "High",
          assignedTo: "Alice Johnson",
          projectId: project.id,
        },
        {
          name: "Design Phase",
          status: "In Progress",
          priority: "Medium",
          assignedTo: "Bob Lee",
          projectId: project.id,
        },
        {
          name: "Development Sprint 1",
          status: "Pending",
          priority: "High",
          assignedTo: "Charlie Brown",
          projectId: project.id,
        },
      ],
    });
  }

  console.log("✅ Seeded tasks for all projects.");
}

main()
  .then(() => {
    console.log("🌱 Database seeded successfully!");
  })
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
