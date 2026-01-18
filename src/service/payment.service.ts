// import { Injectable } from '@nestjs/common';
// import { PrismaService } from './prisma.service'; // Asumsi lu udah setup PrismaService

// @Injectable()
// export class PaymentService {
//   constructor(private prisma: PrismaService) {}

// async createPayout(userId: string, amount: number, bankDetail: any) {
//   return this.prisma.$transaction(async (tx) => {

//     // 1. CEK SALDO DULU (Paling krusial!)
//     const currentBalance = await tx.balance.findUnique({
//       where: { userId: userId },
//     });

//     if (!currentBalance || currentBalance.amount < amount) {
//       // Lempar error biar transaksi otomatis batal (rollback)
//       throw new Error("Sori bre, saldo lu gak cukup buat narik segitu!");
//     }

//     // 2. KURANGI SALDO
//     await tx.balance.update({
//       where: { userId: userId },
//       data: {
//         amount: { decrement: amount }, // Ngurangin saldo dengan aman
//       },
//     });

//     // 3. CATAT DI TABEL PAYOUT
//     const payout = await tx.payout.create({
//       data: {
//         userId: userId,
//         amount: amount,
//         bankName: bankDetail.bankName,
//         accountNumber: bankDetail.accountNumber,
//         status: 'pending',
//       },
//     });

//     return payout;
//   });
// }

//   async createCharge(merchantId: string, customerId: string, amount: number) {
//     // Kita jalanin dalam satu TRANSACTION
//     return this.prisma.$transaction(async (tx) => {

//       // 1. Catat transaksi baru
//       const transaction = await tx.transaction.create({
//         data: {
//           amount: amount,
//           status: 'succeeded', // Langsung sukses buat simulasi
//           userId: merchantId,
//           customerId: customerId,
//         },
//       });

//       // 2. Update saldo merchant (Update di tabel Balances)
//       const updatedBalance = await tx.balance.update({
//         where: { userId: merchantId },
//         data: {
//           amount: { increment: amount }, // Pake increment biar gak kena race condition
//         },
//       });

//       return { transaction, newBalance: updatedBalance.amount };
//     });
//   }
// }
