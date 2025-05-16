const express = require("express");
const path = require('node:path');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../shared/points.db');

const USERS = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"];

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/status", (_req, res) => {
    db.all("SELECT * FROM points", (_err, rows) => {
        res.send(JSON.stringify(rows));
    });
})
app.get('/index.js', (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.js"));
});
app.get('/index.css', (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.css"));
});
app.get('/score.js', (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/score.js"));
});
app.get('/score.css', (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/score.css"));
});
USERS.forEach((user) => {
    app.get(`/${user.toLowerCase()}.html`, (_req, res) => {
        res.sendFile(path.join(__dirname, "/public/score.html"));
    });
});
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});