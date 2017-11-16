const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/app/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require(path.join(__dirname, "/app/routing/apiRoutes.js"))(app);
require(path.join(__dirname, "/app/routing/htmlRoutes.js"))(app);

app.listen(port, () => console.log("Listening on port " + port));