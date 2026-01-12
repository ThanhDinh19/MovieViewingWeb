import axios from "axios"

const API_URL = "http://localhost:5001/api/users"

export const getUsers = () => {
    return axios.get(API_URL)
}

export const login = (email, password) =>{
    return axios.post(`${API_URL}/login`, { email, password, })
}

export const googleLogin = (googleIdToken) => {
    return axios.post(`${API_URL}/google`, { googleIdToken })
}   