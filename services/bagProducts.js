const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BagProductsService = {
  findAll: async () => {
    const bagProducts = await prisma.boughtProducts.findMany({
      include: { user: true, product: true },
    });

    return bagProducts;
  },
  addProductToBag: async (values) => {
    const newProduct = await prisma.boughtProducts.create(values);

    return newProduct;
  },
  findUserProducts: async (options) => {
    const userProducts = await prisma.boughtProducts.findMany(options);

    return userProducts;
  },
  deleteUserProduct: async (options) => {
    const deletedProduct = await prisma.boughtProducts.delete(options);

    return deletedProduct;
  },
};

module.exports = BagProductsService;
