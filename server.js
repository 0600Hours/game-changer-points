const express = require("express");
const path = require('node:path');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./points.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS points (id INTEGER PRIMARY KEY AUTOINCREMENT, contestant TEXT NOT NULL, score INTEGER NOT NULL);")
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/status", (req, res) => {
    db.all("SELECT * FROM points", (err, rows) => {
        console.log(rows);
        res.send(JSON.stringify(rows));
    });

})
app.get('/index.js', function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.js"                                                                                                                                                                                                                                                                                                                                                                     ));
  });
app.listen(8080, () => {
    console.log("Server is running on localhost:8080");
});