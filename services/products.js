const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ProductsService = {
  findAll: async () => {
    const products = await prisma.products.findMany();

    return products;
  },
};

module.exports = ProductsService;
