const { PrismaClient } = require("@prisma/client");

const res = require("express/lib/response");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.products.findMany();
  res.status(200).send(products);
};

module.exports = { getProducts };
