const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const artistRoutes = require("./routes/artistRoutes"); 
const songRoutes = require("./routes/songRoutes");
const albumRoutes = require("./routes/albumRoutes");

const app = express();


app.use(cors());
app.use(express.json());


const pool = mysql.createPool({
    host: "webcourse.cs.nuim.ie",
    user: "u230733",
    password: "ahS5OghooGeighae",
    database: "cs230_u230733"
});


pool.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
        console.error("Error testing the database connection:", err);
    } else {
        console.log("Database connection test successful:", results[0].solution);
    }
});


app.use("/api/artists", artistRoutes(pool));
app.use("/api/songs", songRoutes(pool));
app.use("/api/albums", albumRoutes(pool));


app.listen(3001, () => {
    console.log("Server running on port 3001");
});