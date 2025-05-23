require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Create table admin
db.serialize(() => {
    //Drop table if exists
    db.run("DROP TABLE IF EXISTS admin");

    //Create table
    db.run(`CREATE TABLE admin(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname VARCHAR(50),
        lastname VARCHAR(50),
        jobtitle VARCHAR(50),
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Table created!");
});