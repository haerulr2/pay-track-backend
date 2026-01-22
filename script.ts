import { prisma } from './lib/prisma.js';

async function main() {
  console.log('Sedang mengisi data contoh...');

  // 1. Buat User (Merchant)
  const user = await prisma.user.upsert({
    where: { email: 'haerul@paytrack.test' },
    update: {},
    create: {
      email: 'haerul@paytrack.test',
      username: 'haerulr2',
      password: 'password_rahasia', // Nanti di real apps harus di-hash ya!
      balance: {
        create: {
          amount: 5000.0, // Kasih modal awal 5000 dollar biar gaya
        },
      },
    },
  });

  // 2. Buat Customer (Orang yang belanja ke lu)
  const customer = await prisma.customer.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi@gmail.test',
      merchantId: user.id,
    },
  });

  // 3. Buat Transaksi Contoh (Uang Masuk)
  await prisma.transaction.create({
    data: {
      amount: 150.0,
      status: 'succeeded',
      userId: user.id,
      customerId: customer.id,
    },
  });

  console.log('Seeding selesai, bre! Data udah masuk semua.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
