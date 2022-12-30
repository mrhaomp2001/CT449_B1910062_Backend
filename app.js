const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("hello");
    return res.status(200).json({message: "welcome"});
});

app.use("/api/contacts", contactsRouter);

module.exports = app;