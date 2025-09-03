import axios from "axios";

const API_URL = "http://localhost:3001/api";  

//artist crud
export const getArtists = async () => {
    return await axios.get(`${API_URL}/artists`);
};

export const addArtist = async (artistData) => {
    return await axios.post(`${API_URL}/artists`, artistData);
};

export const updateArtist = async (id, artistData) => {
    return await axios.put(`${API_URL}/artists/${id}`, artistData);
};

export const deleteArtist = async (id) => {
    return await axios.delete(`${API_URL}/artists/${id}`);
};

//album crud
export const getAlbums = async () =>{
    return await axios.get(`${API_URL}/albums`);
}

export const addAlbum = async (albumData) => {
    return await axios.post(`${API_URL}/albums`, albumData);
};

export const updateAlbum = async (id, albumData) => {    
    return await axios.put(`${API_URL}/albums/${id}`, albumData);
};

export const deleteAlbum = async (id) => {
    return await axios.delete(`${API_URL}/albums/${id}`);
};

//song crud
export const getSongs = async () =>{
    return await axios.get(`${API_URL}/songs`);
};

export const addSong = async (songData) => {
    return await axios.post(`${API_URL}/songs`, songData);
};

export const updateSong = async (id, songData) => {
    return await axios.put(`${API_URL}/songs/${id}`, songData);
};

export const deleteSong = async (id) => {
    return await axios.delete(`${API_URL}/songs/${id}`);
};