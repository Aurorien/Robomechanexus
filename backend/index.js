const express = require("express"),
  path = require("path");

const app = express(),
  port = process.env.PORT || 3000;

app.get("/api", (_request, response) => {
  response.send({ chip: "Obsidiflake" });
});

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Ready at http://localhost:${port}/`);
});
