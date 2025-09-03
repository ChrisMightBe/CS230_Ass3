import React, { useEffect, useState } from "react";
import { getArtists, deleteArtist, addArtist, updateArtist } from "../api"; 

const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState({ name: "", monthly_listeners: "", genre: "" });
    const [editingArtistId, setEditingArtistId] = useState(null); // Track the artist being edited

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await getArtists();
            setArtists(response.data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    const handleChange = (e) => {
        setArtist({ ...artist, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArtistId) {
                
                await updateArtist(editingArtistId, artist);
                alert("Artist updated successfully!");
                setEditingArtistId(null);
            } else {
                
                await addArtist(artist);
                alert("Artist added successfully!");
            }
            setArtist({ name: "", monthly_listeners: "", genre: "" }); // Reset form
            fetchArtists(); 
        } catch (error) {
            console.error("Error saving artist:", error);
        }
    };

    const handleEdit = (artist) => {
        setEditingArtistId(artist.id);
        setArtist({ name: artist.name, monthly_listeners: artist.monthly_listeners, genre: artist.genre });
    };

    const handleDelete = async (id) => {
        try {
            await deleteArtist(id);
            alert("Artist deleted successfully!");
            fetchArtists();
        } catch (error) {
            console.error("Error deleting artist:", error);
        }
    };

    return (
        <div>
            <h2>Artists</h2>

            {/* Artist Form for Create/Update */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Artist Name" value={artist.name} onChange={handleChange} required />
                <input type="number" name="monthly_listeners" placeholder="Monthly Listeners" value={artist.monthly_listeners} onChange={handleChange} />
                <input type="text" name="genre" placeholder="Genre" value={artist.genre} onChange={handleChange} />
                <button type="submit">{editingArtistId ? "Update Artist" : "Add Artist"}</button>
            </form>

            {/* Artist List with Edit/Delete Buttons */}
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>
                        {artist.name} - {artist.genre} ({artist.monthly_listeners} listeners)
                        <button onClick={() => handleEdit(artist)}>Edit</button>
                        <button onClick={() => handleDelete(artist.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Artist;