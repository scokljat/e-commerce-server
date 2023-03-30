const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
