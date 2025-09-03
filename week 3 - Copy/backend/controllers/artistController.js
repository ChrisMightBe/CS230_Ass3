
const util = require("util");

exports.getArtists = async (req, res, pool) => {
    try {
        pool.query = util.promisify(pool.query); 
        const artists = await pool.query("SELECT * FROM artists");
        res.json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addArtist = async (req, res, pool) => {
    try {
        const { name, monthly_listeners, genre } = req.body;
        console.log("Received data:", req.body);

        pool.query = util.promisify(pool.query); 
        const result = await pool.query(
            "INSERT INTO artists (name, monthly_listeners, genre) VALUES (?, ?, ?)",
            [name, monthly_listeners, genre]
        );
        res.json({ message: "Artist added successfully", artistId: result.insertId });
    } catch (err) {
        console.error("Error in addArtist:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateArtist = async (req, res, pool) => {
    try {
        const { name, monthly_listeners, genre } = req.body;
        const { id } = req.params;

        pool.query = util.promisify(pool.query); 
        await pool.query(
            "UPDATE artists SET name = ?, monthly_listeners = ?, genre = ? WHERE id = ?",
            [name, monthly_listeners, genre, id]
        );
        res.json({ message: "Artist updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteArtist = async (req, res, pool) => {
    try {
        const { id } = req.params;

        pool.query = util.promisify(pool.query); 
        await pool.query("DELETE FROM artists WHERE id = ?", [id]);
        res.json({ message: "Artist deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};