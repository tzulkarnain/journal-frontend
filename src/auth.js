import api from './api.js'

// auth is for adding logic
//toDO: pass an object into signUp instead of var

export default {
    signUp(firstName, lastName, email, password) {
    // if there's a token, then you shouldnt be able to sign up;
    // check if token, throw error, else, call api.signup

    },

    login(email, password) {
        if (localStorage.token) {
            throw new Error('already logged in')
        }
        else {
            return api.requestLogin(email, password)
                .then(resp => localStorage.token = resp.body.token)
        }
    },

    getToken() {
        return localStorage.token;
    },

    getUser() {
        // if localstorage user  
        // once you log in, make request for full user 
        //to store user in local storage 
        // return local storage. user
    },

    logOut(token) {
        //removes token / user form local storage
        // call to the server to do something, probably delete
        // delete / set
    },

    isLoggedIn() {
        //returns !!localStorage.token
    }
}
