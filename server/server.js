const express = require("express");
require("dotenv").config()
const cors = require("cors");
const app = express();
const db = require("./config/dbConnection");

const userRoutes = require("./routes/user.routes");

app.use(cors())

app.use(express.json());

app.use("/api", userRoutes);

//server listening
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
    }   
);
