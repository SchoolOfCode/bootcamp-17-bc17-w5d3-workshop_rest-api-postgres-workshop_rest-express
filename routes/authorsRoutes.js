import express from "express";

import * as authorsController from "../controllers/authorsController.js";

export const authorsRoutes = express.Router();

authorsRoutes.get("/", authorsController.getAuthors);

authorsRoutes.get("/:id", authorsController.getAuthorById);

authorsRoutes.post("/", authorsController.createAuthor);

authorsRoutes.patch("/:id", authorsController.updateAuthorById);

authorsRoutes.delete("/:id", authorsController.deleteAuthorById);
