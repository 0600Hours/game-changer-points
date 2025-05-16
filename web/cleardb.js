var fs = require('fs');

const dbPath = "./points.db";

if (fs.existsSync(dbPath)) {
    fs.rmSync(dbPath);
}