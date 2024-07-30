import * as booksModel from "../models/booksModel.js";

export async function getBooks(req, res) {
  const books = await booksModel.getBooks();
  res.status(200).json({ status: "success", data: books });
}

export async function getBookById(req, res) {
  const id = req.params.id;
  const book = await booksModel.getBookById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }
  res.status(200).json({ status: "success", data: book });
}

export async function createBook(req, res) {
  const data = req.body;
  const book = await booksModel.createBook(data);
  res.status(201).json({ status: "success", data: book });
}

export async function updateBookById(req, res) {
  const id = req.params.id;
  const data = req.body;
  const book = await booksModel.updateBookById(id, data);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }

  res.status(200).json({ status: "success", data: book });
}

export async function deleteBookById(req, res) {
  const id = req.params.id;
  const book = await booksModel.deleteBookById(id);
  // Assume 404 status if the book is not found
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Book not found" } });
  }
  res.status(200).json({ status: "success", data: book });
}
