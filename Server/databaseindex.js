const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "admin",
    host: "database-1.cy1m3s5bdkpt.us-east-2.rds.amazonaws.com",
    password: "DargonBallS051701!",
    database: "roaringdb",
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3001, () => {
    console.log("running server");
});