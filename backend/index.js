const express = require("express"),
  path = require("path"),
  dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

async function databaseConnection() {
  try {
    await client.connect();
    console.log("Database is running and the connection is established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
databaseConnection();

const app = express(),
  port = process.env.PORT || 3000;

app.get("/api", async (_request, response) => {
  try {
    const sql =
      "SELECT chip.chipId, chip.chipName, chip.chipUse, item_type.itemTypeName FROM chip INNER JOIN item_type ON chip.chipItemTypeId=item_type.itemTypeId ";
    const { rows } = await client.query(sql);
    response.send(rows);
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Ready at http://localhost:${port}/`);
});

// app.get("/api", async (_request, response) => {
// const sql =
//   "SELECT chip.chipId, chip.chipName, chip.chipUse, item_type.itemTypeName FROM chip INNER JOIN item_type ON chip.chipItemTypeId=item_type.itemTypeId ";

// const { rows } = await client.query(sql);

//   response.send(rows);
// });
