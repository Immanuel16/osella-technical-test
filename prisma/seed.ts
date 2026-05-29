import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { productId: '1', sku: 'SKU-001', stock: 50 },
    { productId: '2', sku: 'SKU-002', stock: 10 },
    { productId: '3', sku: 'SKU-003', stock: 1 },
  ];

  for (const p of products) {
    await prisma.productStock.upsert({
      where: { productId: p.productId },
      update: {},
      create: p,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
