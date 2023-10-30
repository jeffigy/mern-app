import express from "express";
const router = express.Router();
import { Book } from "../models/BookModel.js";

// Route
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // body
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publisherYear: req.body.publisherYear,
    };

    // create
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update a book by id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error({ message: error.message });
  }
});

// delete a book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).send({ message: error.message });
  }
});

export default router;
