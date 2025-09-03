const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

module.exports = (pool) => {
    router.get("/", (req, res) => songController.getSongs(req, res, pool)); // GET route for fetching songs
    router.post("/", (req, res) => songController.addSong(req, res, pool));
    router.put("/:id", (req, res) => songController.updateSong(req, res, pool));
    router.delete("/:id", (req, res) => songController.deleteSong(req, res, pool));

    return router;
};