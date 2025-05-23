//Applikation för registrering och inloggning
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/admin", authRoutes);

//Protected route with token
app.get("/admin/secret", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route" });
})

//Token-validator as middleware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    //Token
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "You are not authorized for this route - missing token!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Invalid JWT" });

        req.username = username;
        next();
    })
}

//Start application
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})