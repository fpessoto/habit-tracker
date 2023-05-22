import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // await prisma.habitLog.deleteMany();
  // await prisma.habit.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      habits: {
        create: [
          {
            title: 'Drink Water',
            description: 'Drink 8 glasses of water per day',
            frequency: 'DAILY',
            category: {
              create: { name: 'Health' },
            },
            habitLogs: {
              create: [{ loggedAt: new Date() }],
            },
          },
          {
            title: 'Exercise',
            description: 'Exercise for 30 minutes',
            frequency: 'DAILY',
            category: {
              create: { name: 'Fitness' },
            },
            habitLogs: {
              create: [{ loggedAt: new Date() }],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password1',
      habits: {
        create: [
          {
            title: 'Drink Water',
            description: 'Drink 8 glasses of water per day',
            frequency: 'DAILY',
            category: {
              create: { name: 'Health' },
            },
            habitLogs: {
              create: [{ loggedAt: new Date() }],
            },
          },
          {
            title: 'Exercise',
            description: 'Exercise for 30 minutes',
            frequency: 'DAILY',
            category: {
              create: { name: 'Fitness' },
            },
            habitLogs: {
              create: [{ loggedAt: new Date() }],
            },
          },
        ],
      },
    },
  });

  console.log('seed complete', { user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
