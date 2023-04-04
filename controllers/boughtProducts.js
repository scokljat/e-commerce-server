const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBoughtProducts = async (req, res) => {
  const boughtProducts = await prisma.boughtProducts.findMany({
    include: { user: true, product: true },
  });
  res.status(200).send(boughtProducts);
};

const addBoughtProduct = async (req, res) => {
  const newBoughtProduct = await prisma.boughtProducts.create({
    data: {
      product: { connect: { id: req.body.productId } },
      user: { connect: { id: req.body.userId } },
      size: req.body.size,
    },
  });
  res.status(200).send(newBoughtProduct);
};

const filteredBoughtProducts = async (req, res) => {
  const userId = req.params.id;
  const boughtProducts = await prisma.boughtProducts.findMany({
    where: { userId: Number(userId) },
  });

  res.status(200).send(boughtProducts);
};

module.exports = {
  getBoughtProducts,
  addBoughtProduct,
  filteredBoughtProducts,
};
