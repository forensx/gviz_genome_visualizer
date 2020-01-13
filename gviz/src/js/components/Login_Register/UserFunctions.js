import axios from 'axios'

export const register = newUser => {
    return axios
        .post("http://localhost:5000/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
            //admin: newUser.admin,
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post("http://localhost:5000/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}