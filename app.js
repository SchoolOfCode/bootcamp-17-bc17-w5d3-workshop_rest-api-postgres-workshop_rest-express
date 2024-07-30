import express from "express";
import morgan from "morgan";

import { booksRoutes } from "./routes/booksRoutes.js";
import { authorsRoutes } from "./routes/authorsRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
