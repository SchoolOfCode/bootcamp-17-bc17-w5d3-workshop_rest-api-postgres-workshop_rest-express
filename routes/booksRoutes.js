import express from "express";

import * as booksController from "../controllers/booksController.js";

export const booksRoutes = express.Router();

booksRoutes.get("/", booksController.getBooks);

booksRoutes.get("/:id", booksController.getBookById);

booksRoutes.post("/", booksController.createBook);

booksRoutes.patch("/:id", booksController.updateBookById);
