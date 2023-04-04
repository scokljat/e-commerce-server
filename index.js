const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const productRoutes = require("./routes/products");
const boughtProductsRoutes = require("./routes/boughtProducts");
const userRoutes = require("./routes/users");

app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use(productRoutes);
app.use(userRoutes);
app.use(boughtProductsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
