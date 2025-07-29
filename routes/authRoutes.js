require("dotenv").config();
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);

//Routes

//Add new user
router.post("/register", async(req, res) => {
    try{
        const { firstname, lastname, jobtitle, username, password } = req.body;

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

        //Hash password with salt 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //Check if username already exists
        const sqlOne = "SELECT username FROM admin WHERE username = ?";
        db.get(sqlOne, [username], (err, row) => {
            if(err){
                return res.status(500).json({ error: "Error with query in database" });
            }
            if(row){
                return res.status(400).json({ message: "Username already exists, choose another one"})
            }

        //Correct inputs - save new error
        const sql = `INSERT INTO admin(firstname, lastname, jobtitle, username, password) VALUES(?, ?, ?, ?, ?)`;
        db.run(sql, [firstname, lastname, jobtitle, username, hashedPassword], (err) => {
            if(err) {
                return res.status(500).json({message: "Error creating admin"})
            } else {
                return res.status(201).json({ message: "Admin created!" });
            }
        })
    });

        

    }catch(error){
        return res.status(500).json({ error: "Server error: " + error });
    }
})

//Login user
router.post("/login", async(req, res) => {
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ message: "Username and password is required" });
        }

        //Check credentials
        //Does user exist?
        const sql = `SELECT * FROM admin WHERE username = ?`;
        db.get(sql, [username], async(err, row) => {
            if(err){
                return res.status(400).json({ message: "Error authenticating" });
            }else if(!row){
                res.status(401).json({ message: "Incorrect username/password" });
            } else {
                //Existing user - check matching username/password
                const correctPassword = await bcrypt.compare(password, row.password);

                if(!correctPassword){
                    res.status(401).json({ message: "Incorrect username/password" });
                } else {
                    //Create JWT
                    const payload = { username: username };
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
                    const response = {
                        message: "Correct login, welcome!",
                        user: username,
                        token: token
                    }
                    //Matched password
                    res.status(200).json({ response });
                }
            }
        })

    } catch(error) {
        res.status(500).json({ error: "Server error: " + error})
    }
})

//Export to call
module.exports = router;