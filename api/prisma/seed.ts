import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.habitLog.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    },
  });

  const category1 = await prisma.category.create({
    data: { name: 'Health', userId: user1.id },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Fitness', userId: user1.id },
  });

  const habit1 = await prisma.habit.create({
    data: {
      title: 'Drink Water',
      description: 'Drink 8 glasses of water per day',
      frequency: 'DAILY',
      userId: user1.id,
      categoryId: category1.id,
      habitLogs: {
        create: [{ loggedAt: new Date() }],
      },
    },
  });

  const habit2 = await prisma.habit.create({
    data: {
      title: 'Exercise',
      description: 'Exercise for 30 minutes',
      frequency: 'DAILY',
      userId: user1.id,
      categoryId: category2.id,
      habitLogs: {
        create: [{ loggedAt: new Date() }],
      },
    },
  });

  console.log('seed complete', { user1, category1, category2, habit1, habit2 });
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
