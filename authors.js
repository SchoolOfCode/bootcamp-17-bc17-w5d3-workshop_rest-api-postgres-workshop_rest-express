// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Query the database and return all authirs

  // Define the SQL query to fetch all authors from the 'authors' table
  const queryText = "SELECT * FROM authors;";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null

	// Define the SQL query to fetch the author with the specified id from the 'author' table
  const queryText = "SELECT * FROM authors WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author

	const { first_name, last_name } = author;
  const queryText = `
  INSERT INTO authors (first_name, last_name)
  VALUES ($1, $2)
  RETURNING *`;

  try {
    const res = await pool.query(queryText, [first_name, last_name]);
    return res.rows[0];
  } catch (err) {
    console.error("Error creating author:", err);
  }
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null

	const queryText =
    "UPDATE authors SET first_name = $2, last_name = $3 WHERE id = $1";

  try {
    const res = await pool.query(queryText, [
      id,
      updates.first_name,
      updates.last_name
    ]);
    if (res.rowCount > 0) {
      return `Author with id ${id} has been updated successfully`;
    } else {
			console.log(res);
      return false;
    }
  } catch (error) {
		console.error(error)
		return false;
	}
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null

  let queryText = "DELETE FROM authors WHERE id = $1";
  try {
    let res = await pool.query(queryText, [id]);

		if (res.rowCount > 0) {
			return `Author with id ${id} has been deleted successfully`
		} else {
			return false;
		}
  } catch (error) {
    console.log(error);
		return false;
  }
}
