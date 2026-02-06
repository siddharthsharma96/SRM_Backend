const express = require("express");
const cors = require("cors");
const productRouter = require("./Routes/productRoutes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.config.env" });
app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db Connected Succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  const now = new Date();
  req.requestTimeOfHit = now.toLocaleString();
  next();
});

app.use("/api/v1/products", productRouter);
app.listen(process.env.PORT_NO, () => {
  console.log("Server started on port no ", process.env.PORT_NO);
});
