const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ProductsService = {
  findAll: async () => {
    const products = await prisma.products.findMany();

    return products;
  },
  findProduct: async (options) => {
    const product = await prisma.products.findUnique(options);

    return product;
  },
};

module.exports = ProductsService;
