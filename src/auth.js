import api from './api.js'

// auth is for adding logic
//toDO: pass an object into signUp instead of var


export default {
    createAccount(firstName, lastName, email, password) {
        if (localStorage.token) {
            throw new Error('already logged in')
        }
        else {
            return api.createAccount(firstName, lastName, email, password)
                .then(resp => 
                    localStorage.userObject = JSON.stringify(resp.body))
        }
    // if there's a token, then you shouldnt be able to sign up;
    // check if token, throw error, else, call api.signup
    // need to put user object from database that includes user id into local storage,
    

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
        //localStorage.userObject ?
        return JSON.parse(localStorage.userObject) 
        // : null

        // return local storage. user

        //to do: instead of pulling from loo
    },

    logOut(token) {
        return localStorage.token = null;
        //removes token / user form local storage
        // call to the server to do something, probably delete
        // delete / set
    },

    isLoggedIn() {
        //returns !!localStorage.token
    }
}
