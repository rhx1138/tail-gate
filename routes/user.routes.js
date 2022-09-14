var express = require('express');
const users = require("../controllers/user.controller.js");
const router = express.Router();

// Create a new User
router.post("/", users.create);
// Retrieve a single User with id
router.get("/:id", users.findOne);



module.exports = router;