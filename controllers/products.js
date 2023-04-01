const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.products.findMany();
  res.status(200).send(products);
};

const getPaginatedProducts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const products = await prisma.products.findMany();
  const paginatedProducts = products.slice(startIndex, endIndex);
  res.status(200).send(paginatedProducts);
};

const getFilteredProducts = async (req, res) => {
  const category = req.query.category;
  const products = await prisma.products.findMany();
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  res.status(200).send(filteredProducts);
};

module.exports = { getProducts, getPaginatedProducts, getFilteredProducts };
