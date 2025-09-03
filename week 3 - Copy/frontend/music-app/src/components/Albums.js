import React, { useEffect, useState } from "react";
import { getAlbums, deleteAlbum, addAlbum, updateAlbum, getArtists } from "../api";

const Album = () => {
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState({ name: "", artist_id: "", release_year: "", num_listens: "" });
    const [editingAlbumId, setEditingAlbumId] = useState(null);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await getAlbums();
            setAlbums(response.data);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    const handleChange = (e) => {
        setAlbum({ ...album, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAlbumId) {
                await updateAlbum(editingAlbumId, album);
                alert("Album updated successfully!");
                setEditingAlbumId(null);
            } else {
                await addAlbum(album);
                alert("Album added successfully!");
            }
            setAlbum({ name: "", artist_id: "", release_year: "", num_listens: "" }); // Reset form
            fetchAlbums();
        } catch (error) {
            console.error("Error saving album:", error);
        }
    };

    const handleEdit = (album) => {
        setEditingAlbumId(album.id);
        setAlbum({ name: album.name, artist_id: album.artist_id, release_year: album.release_year, num_listens: album.num_listens });
    };

    const handleDelete = async (id) => {
        try {
            await deleteAlbum(id);
            alert("Album deleted successfully!");
            fetchAlbums();
        } catch (error) {
            console.error("Error deleting album:", error);
        }
    };
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists();
    }, []);
    
    const fetchArtists = async () => {
        try {
            const response = await getArtists(); // Assuming getArtists is defined in your API
            setArtists(response.data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };
    
    return (
        <div>
            <h2>Albums</h2>
    
            {/* Album Form for Create/Update */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Album Name"
                    value={album.name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="artist_id"
                    value={album.artist_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Artist</option>
                    {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                            {artist.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    value={album.release_year}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="num_listens"
                    placeholder="Number of Listens"
                    value={album.num_listens}
                    onChange={handleChange}
                />
                <button type="submit">{editingAlbumId ? "Update Album" : "Add Album"}</button>
            </form>
    
            {/* Album List with Edit/Delete Buttons */}
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.name} - Artist ID: {album.artist_id}, Release Year: {album.release_year}
                        <button onClick={() => handleEdit(album)}>Edit</button>
                        <button onClick={() => handleDelete(album.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Album;