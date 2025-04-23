/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express"),
  path = require("path"),
  dotenv = require("dotenv"),
  { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function databaseConnection() {
  try {
    await pool.connect();
    console.log("Database is running and the connection is established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
databaseConnection();

const app = express(),
  port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", async (_request, response) => {
  try {
    const sql =
      "SELECT c.chip_id, c.chip_name, c.chip_use, it.item_type_name FROM chip c INNER JOIN item_type it ON c.chip_item_type_id=it.item_type_id ";
    const { rows } = await pool.query(sql);
    response.send(rows);
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.post("/api/post", async (_request, response) => {
  try {
    const { name, use, type } = _request.body;

    await pool.query("BEGIN");

    if (type) {
      const insertItemTypeQuery =
        "INSERT INTO item_type (item_type_name) VALUES ($1) RETURNING item_type_id";
      const typeValues = [type];

      const { rows } = await pool.query(insertItemTypeQuery, typeValues);
      const newitemtypeid = rows[0].item_type_id;

      if (name && use) {
        const insertChipQuery =
          "INSERT INTO chip (chip_name, chip_use, chip_item_type_id) VALUES ($1, $2, $3)";
        const chipValues = [name, use, newitemtypeid];
        await pool.query(insertChipQuery, chipValues);
      }
    }

    await pool.query("COMMIT");

    response.send("Data successfully inserted into the database");
  } catch (error) {
    await pool.query("ROLLBACK");

    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.delete("/api/delete/:id", async (_request, response) => {
  console.log("ENTERED DELETE ENDPOINT");
  console.log(_request);
  try {
    const chipId = _request.params.id;

    console.log("chipId", chipId);

    await pool.query("BEGIN");

    const deleteChipQuery = "DELETE FROM chip WHERE chip_id = $1";
    const chipResult = await pool.query(deleteChipQuery, [chipId]);

    await pool.query("COMMIT");

    if (chipResult.rowCount > 0) {
      response.send(`Chip with ID ${chipId} successfully deleted`);
    } else {
      response.status(404).send(`No chip found with ID ${chipId}`);
    }
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error executing the delete query:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Ready at http://localhost:${port}/`);
});
