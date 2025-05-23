require("dotenv").config();
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);

//Routes

//Add new user
router.post("/register", async(req, res) => {
    try{
        const { username, password } = req.body;

        let errors = [];

        //Validate input

        //Check if username or password i empty
        if(!username || !password){
            return res.status(400).json({ error: "Username and password is required" });
        }

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
        if(errors.length > 0){
            return res.status(400).json({ errors });
        }

        //Check if username already exists
        db.get("SELECT username FROM admin WHERE username = ?", [username], (error, row) => {
            if(error){
                return res.status(500).json({ error: "Error with query in database" });
            }
            if(row){
                return res.status(400).json({ message: "Username already exists, choose another one"})
            }
        });

        //Correct inputs - save new error
        const sql = `INSERT INTO admin(firstname, lastname, jobtitle, username, password) VALUES(?, ?, ?, ?, ?)`;
        db.run(sql, [firstname, lastname, jobtitle, username, password], (err) => {
            if(err) {
                res.status(500).json({message: "Error creating admin"})
            } else {
                res.status(201).json({ message: "Admin created!" });
            }
        })

        

    }catch(error){
        res.status(500).json({ error: "Server error: " + error });
    }
})

//Login user
router.post("/login", async(req, res) => {
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ error: "Username and password is required" });
        }

        //Check credentials
        

    } catch(error) {
        res.status(500).json({ error: "Server error: " + error})
    }
})

//Export to call
module.exports = router;