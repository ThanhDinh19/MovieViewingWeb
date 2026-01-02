import axios from "axios"

const API_URL = "http://localhost:5001/api/users"

export const getUsers = () => {
    return axios.get(API_URL)
}