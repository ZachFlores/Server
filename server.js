const express = require("express");
const app = express();
const fs = require('fs');

app.use(express.static("public"));

app.get("/api/crafts", (req, res) => {
    console.log("Someone is using our API");
    fs.readFile('crafts.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading crafts.json:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const crafts = JSON.parse(data);
        res.json(crafts);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
