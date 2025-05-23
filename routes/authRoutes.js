//Routes for auth
const express = require("express");
const router = express.Router();


//Add new user
router.post("/register", async(req, res) => {
    try{
        const { username, password } = req.body;

        let errors = [];

        //Validate input
        if(username.length < 7){
            errors.push("Too short username");
        }
        if(password.length < 7){
            errors.push("Too short password");
        }
        if(!/[a-z]/.test(password)){
            errors.push("Password must contain lowercase letters (a-z)");
        }
        if(!/[A-Z]/.test(password)){
            errors.push("Password must contain uppercase letters (A-Z)");
        }
        if(!/[0-9]/.test(password)){
            errors.push("Password must contain digits");
        }
        if(errors !== 0){
            return errors;
        }else {

        }

    }catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

//Login user
router.post("/login", async(req, res) => {
    console.log("Login user test")
})

//Export to call
module.exports = router;