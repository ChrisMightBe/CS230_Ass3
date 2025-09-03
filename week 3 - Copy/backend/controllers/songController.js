const util = require("util");

exports.getSongs = async (req, res, pool) => {
    try {
        pool.query = util.promisify(pool.query);
        const songs = await pool.query("SELECT * FROM songs");
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addSong = async (req, res, pool) => {
    try {
        const { name, release_year, album_id} = req.body;
        const result = await pool.query(
            "INSERT INTO songs (name, release_year, album_id) VALUES (?, ?, ?)",
            [name, release_year, album_id]
        );
        res.json({ message: "Song added successfully", songId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSong = async (req, res, pool) => {
    try {
        const { name, release_year, album_id} = req.body;
        const { id } = req.params;
        await pool.query(
            "UPDATE songs SET name = ?, release_year = ?, album_id = ? WHERE id = ?",
            [ name, release_year, album_id, id]
        );
        res.json({ message: "Song updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSong = async (req, res, pool) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM songs WHERE id = ?", [id]);
        res.json({ message: "Song deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};