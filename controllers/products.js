const ProductsService = require("../services/products");

const getProducts = async (req, res) => {
  try {
    const products = await ProductsService.findAll();

    res.status(200).send(products);
  } catch (error) {}
};

const getPaginatedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = await ProductsService.findAll();
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.status(200).send(paginatedProducts);
  } catch (error) {}
};

const getFilteredProducts = async (req, res) => {
  try {
    const category = req.query.category;

    const products = await ProductsService.findAll();
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    res.status(200).send(filteredProducts);
  } catch (error) {}
};

const getSearchedProducts = async (req, res) => {
  try {
    const search = req.query.search;
    const searchedProducts = await ProductsService.searchProducts({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    res.status(200).send(searchedProducts);
  } catch (error) {}
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductsService.findProduct({
      where: { id: Number(id) },
    });

    res.status(200).send(product);
  } catch (error) {}
};

module.exports = {
  getProducts,
  getPaginatedProducts,
  getFilteredProducts,
  getSearchedProducts,
  getProductById,
};
