const express = require("express");
const path = require('node:path');
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/status", (req, res) => {
    res.send(47);
})
app.get('/index.js', function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.js"                                                                                                                                                                                                                                                                                                                                                                     ));
  });
app.listen(8080, () => {
    console.log("Server is running on localhost:8080");
});