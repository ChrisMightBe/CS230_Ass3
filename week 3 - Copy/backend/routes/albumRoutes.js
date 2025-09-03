const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

module.exports = (pool) => {
    router.get("/", (req, res) => albumController.getAlbums(req, res, pool));
    router.post("/", (req, res) => albumController.addAlbum(req, res, pool)); // POST route for adding an album
    router.put("/:id", (req, res) => albumController.updateAlbum(req, res, pool));
    router.delete("/:id", (req, res) => albumController.deleteAlbum(req, res, pool));

    return router;
};