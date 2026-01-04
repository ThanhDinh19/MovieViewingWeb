import axios from "axios";

export const getMovies = () => {
    return axios.get("http://localhost:5001/api/movies");
}