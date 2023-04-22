const BagProductsService = require("../services/bagProducts");

const getBagProducts = async (req, res) => {
  try {
    const bagProducts = await BagProductsService.findAll({
      include: { user: true, product: true },
    });

    res.status(200).send(bagProducts);
  } catch (error) {}
};

const addProductToBag = async (req, res) => {
  try {
    const args = {
      data: {
        product: { connect: { id: req.body.productId } },
        user: { connect: { id: req.body.userId } },
        size: req.body.size,
      },
    };

    const newProduct = await BagProductsService.addProductToBag(args);

    res.status(200).send(newProduct);
  } catch (error) {}
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    const userProducts = await BagProductsService.findUserProducts({
      where: { userId: Number(userId) },
      include: { product: true },
    });

    res.status(200).send(userProducts);
  } catch (error) {}
};

const deleteUserProduct = async (req, res) => {
  try {
    const id = req.body.id;

    const deletedProduct = await BagProductsService.deleteUserProduct({
      where: { id: Number(id) },
    });

    res.status(200).send(deletedProduct);
  } catch (error) {}
};

const deleteAllUserProducts = async (req, res) => {
  try {
    const id = req.body.userId;

    await BagProductsService.deleteAllUserProducts({
      where: { userId: Number(id) },
    });

    res.status(200).send("Bag is empty");
  } catch (error) {}
};

module.exports = {
  getBagProducts,
  addProductToBag,
  getUserProducts,
  deleteUserProduct,
  deleteAllUserProducts,
};
