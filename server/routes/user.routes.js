const express = require("express");
const router = express.Router();

const { getUsers, createUser, deleteUser } = require("../controllers/user.controller");

router.get("/get-users", getUsers )

router.post("/create-user", createUser)

router.delete("/delete-user/:id", deleteUser)

module.exports = router;