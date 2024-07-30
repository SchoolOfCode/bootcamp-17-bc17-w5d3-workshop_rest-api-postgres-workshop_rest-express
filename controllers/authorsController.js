import * as authorsModel from "../models/authorsModel.js";

export async function getAuthors(req, res) {
  const authors = await authorsModel.getAuthors();
  res.status(200).json({ status: "success", data: authors });
}

export async function getAuthorById(req, res) {
  const id = req.params.id;
  const author = await authorsModel.getAuthorById(id);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
}

export async function createAuthor(req, res) {
  const data = req.body;
  const author = await authorsModel.createAuthor(data);
  res.status(201).json({ status: "success", data: author });
}

export async function updateAuthorById(req, res) {
  const id = req.params.id;
  const data = req.body;
  const author = await authorsModel.updateAuthorById(id, data);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
}

export async function deleteAuthorById(req, res) {
  const id = req.params.id;
  const author = await authorsModel.deleteAuthorById(id);
  // Assume 404 status if the author is not found
  if (!author) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Author not found" } });
  }
  res.status(200).json({ status: "success", data: author });
}
