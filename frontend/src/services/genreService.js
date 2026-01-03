import axios from "axios"

const API_URL = "http://localhost:5001/api/genres"

const getToken = () => localStorage.getItem("token");

export const getGenres = (page = 1, limit = 5) =>{
    return axios.get(
    `http://localhost:5001/api/genres?page=${page}&limit=${limit}`
  );
}

export const getGenresForMovies = () =>{
    return axios.get(`${API_URL}/for-movies`);
}

export const deleteGenres = (id) => axios.delete(`${API_URL}/${id}`, {
    headers:{
        Authorization: `Bearer ${getToken()}`
    }
})

export const updateGenre = (id, data) => axios.put(`${API_URL}/${id}`, data, {
    headers:{
        Authorization: `Bearer ${getToken()}`
    }
})

export const addGenres = (data) => 
    axios.post(API_URL, data, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    });