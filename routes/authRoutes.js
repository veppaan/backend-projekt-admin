//Routes for auth
const express = require("express");
const router = express.Router();


//Add new user
router.post("/register", async(req, res) => {
    console.log("Register user test")
})

//Login user
router.post("/login", async(req, res) => {
    console.log("Login user test")
})

//Export to call
module.exports = router;