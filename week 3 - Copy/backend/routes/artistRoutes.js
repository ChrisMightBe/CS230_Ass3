const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

module.exports = (pool) => {
    
    router.get("/", (req, res) => artistController.getArtists(req, res, pool));
    router.post("/", (req, res) => artistController.addArtist(req, res, pool));
    router.put("/:id", (req, res) => artistController.updateArtist(req, res, pool));
    router.delete("/:id", (req, res) => artistController.deleteArtist(req, res, pool));

    return router;
};