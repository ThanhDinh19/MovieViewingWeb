import axios from "axios"

const API_URL = "http://localhost:5001/api/genres"

export const getGenres = () =>{
    return axios.get(API_URL)
}