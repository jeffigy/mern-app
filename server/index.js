import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import booksRoute from "./routes/booksRoute.js";
//middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
