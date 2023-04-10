const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BagProductsService = {
  findAll: async (options) => {
    const bagProducts = await prisma.bagProducts.findMany(options);

    return bagProducts;
  },
  addProductToBag: async (values) => {
    const newProduct = await prisma.bagProducts.create(values);

    return newProduct;
  },
  findUserProducts: async (options) => {
    const userProducts = await prisma.bagProducts.findMany(options);

    return userProducts;
  },
  deleteUserProduct: async (options) => {
    const deletedProduct = await prisma.bagProducts.delete(options);

    return deletedProduct;
  },
};

module.exports = BagProductsService;
