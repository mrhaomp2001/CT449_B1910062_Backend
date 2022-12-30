const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("hello");
    return res.status(200).json({message: "welcome"});
});

module.exports = app;