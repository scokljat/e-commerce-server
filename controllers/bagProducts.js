const BagProductsService = require("../services/bagProducts");

const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

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
        quantity: 1,
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

const increaseProductInBag = async (req, res) => {
  try {
    const product = await BagProductsService.findUserProduct({
      where: {
        userId: Number(req.body.userId),
        productId: Number(req.body.productId),
        size: req.body.size,
      },
    });

    if (product.quantity === 10) {
      res
        .status(200)
        .send("The maximum number of this product is 10 in the bag.");
    } else {
      const editedProduct = await BagProductsService.editUserProduct({
        where: {
          id: Number(product.id),
        },
        data: { ...req.body, quantity: product.quantity + 1 },
      });

      res.status(200).send(editedProduct);
    }
  } catch (error) {}
};

const decreaseProductInBag = async (req, res) => {
  try {
    const product = await BagProductsService.findUserProduct({
      where: {
        userId: Number(req.body.userId),
        productId: Number(req.body.productId),
        size: req.body.size,
      },
    });

    if (product.quantity === 1) {
      res
        .status(200)
        .send("The minimum number of this product is 1 in the bag.");
    } else {
      const editedProduct = await BagProductsService.editUserProduct({
        where: {
          id: Number(product.id),
        },
        data: { ...req.body, quantity: product.quantity - 1 },
      });

      res.status(200).send(editedProduct);
    }
  } catch (error) {}
};

const payProducts = async (req, res) => {
  const { product, token } = req.body;

  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: Math.round(product.price * 100),
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
  getBagProducts,
  addProductToBag,
  getUserProducts,
  deleteUserProduct,
  deleteAllUserProducts,
  increaseProductInBag,
  decreaseProductInBag,
  payProducts,
};
