const util = require("util");

exports.getAlbums = async (req, res, pool) => {
    try {
        pool.query = util.promisify(pool.query);
        const albums = await pool.query("SELECT * FROM albums");
        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addAlbum = async (req, res, pool) => {
    try {
        const { name, artist_id, release_year, num_listens } = req.body;

        // Debugging logs
        console.log("Received data:", req.body);
        console.log("SQL Query:", "INSERT INTO albums (name, artist_id, release_year, num_listens) VALUES (?, ?, ?, ?)");
        console.log("Parameters:", [name, artist_id, release_year, num_listens]);

        pool.query = util.promisify(pool.query); // Promisify the query method
        const result = await pool.query(
            "INSERT INTO albums (name, artist_id, release_year, num_listens) VALUES (?, ?, ?, ?)",
            [name, artist_id, release_year, num_listens]
        );
        res.json({ message: "Album added successfully", albumId: result.insertId });
    } catch (err) {
        console.error("Error in addAlbum:", err); // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateAlbum = async (req, res, pool) => {
    try {
        const { name, artist_id, release_year, num_listens } = req.body;
        const { id } = req.params;
        await pool.query(
            "UPDATE albums SET name = ?, artist_id = ?, release_year = ?, num_listens = ? WHERE id = ?",
            [name, artist_id, release_year, num_listens, id]
        );
        res.json({ message: "Album updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAlbum = async (req, res, pool) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM albums WHERE id = ?", [id]);
        res.json({ message: "Album deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};