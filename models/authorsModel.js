// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors

  // Define the SQL query to fetch all authors from the 'authors' table
  const queryText = "SELECT * FROM authors";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null

  // Define the SQL query to fetch the author with the specified id from the 'authors' table
  const queryText = "SELECT * FROM authors WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author

  // Define the SQL query for inserting a new author into the 'authors' table
  const queryText = `
      INSERT INTO authors (first_name, last_name)
      VALUES ($1, $2)
      RETURNING *;
    `;

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText, [
    author.first_name,
    author.last_name,
  ]);

  // The rows property of the result object contains the inserted record
  return result.rows[0];
}

export async function updateAuthorById(id, updates) {
  // Define the SQL query for updating the specified author in the 'authors' table
  const queryText = `
      UPDATE authors
      SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name)
      WHERE id = $3
      RETURNING *;
    `;

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText, [
    updates.first_name,
    updates.last_name,
    id,
  ]);

  // The rows property of the result object contains the updated record
  return result.rows[0] || null;
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null

  // Define the SQL query for deleting the specified author from the 'authors' table
  const queryText = `
      DELETE FROM authors
      WHERE id = $1
      RETURNING *;
    `;

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the deleted record
  return result.rows[0] || null;
}
