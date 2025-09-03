import React, { useEffect, useState } from "react";
import { getSongs, deleteSong, addSong, updateSong, getAlbums   } from "../api";

const Song = () => {
    const [songs, setSongs] = useState([]);
    const [song, setSong] = useState({ name: "", release_year: "", album_id: "" });
    const [editingSongId, setEditingSongId] = useState(null);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await getSongs();
            setSongs(response.data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const handleChange = (e) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSongId) {
                await updateSong(editingSongId, song);
                alert("Song updated successfully!");
                setEditingSongId(null);
            } else {
                await addSong(song);
                alert("Song added successfully!");
            }
            setSong({ name: "", release_year: "", album_id: "" }); // Reset form
            fetchSongs();
        } catch (error) {
            console.error("Error saving song:", error);
        }
    };

    const handleEdit = (song) => {
        setEditingSongId(song.id);
        setSong({ name: song.name, release_year: song.release_year, album_id: song.album_id });
    };

    const handleDelete = async (id) => {
        try {
            await deleteSong(id);
            alert("Song deleted successfully!");
            fetchSongs();
        } catch (error) {
            console.error("Error deleting song:", error);
        }
    };

    const [album, setAlbums] = useState([]);
    
        useEffect(() => {
            fetchAlbums();
        }, []);
        
        const fetchAlbums = async () => {
            try {
                const response = await getAlbums();
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

    return (
        <div>
            <h2>Songs</h2>

            {/* Song Form for Create/Update */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Song Name" value={song.name} onChange={handleChange} required />
                <input type="text" name="release_year" placeholder="Release Year" value={song.release_year} onChange={handleChange} />
                <select
                    name="album_id"
                    value={song.album_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Album</option>
                    {album.map((album) => (
                        <option key={album.id} value={album.id}>
                            {album.name}
                        </option>
                    ))}
                </select>
                <button type="submit">{editingSongId ? "Update Song" : "Add Song"}</button>
            </form>

            {/* Song List with Edit/Delete Buttons */}
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.name} - Release Year: {song.release_year}, Album ID: {song.album_id}
                        <button onClick={() => handleEdit(song)}>Edit</button>
                        <button onClick={() => handleDelete(song.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Song;