import axios from "axios";

const API_URL = "http://localhost:5001/api/movies"

const getToken = () => localStorage.getItem("token");

export const getMovies = () => {
    return axios.get(API_URL)
}

export const addMovie = (data) =>
    axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    });

export const updateMovie = (id, data) => axios.put(`${API_URL}/${id}`, data, {
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})

export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`, {
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})