import { apiHost } from './config/config.js';
import superagent from 'superagent';

/*

need: requestLogout(), ;
*/

class Api {

    createAccount = (firstName, lastName, email, password) => {
        return superagent
        .post(`${apiHost}/api/auth/create-account`)
        .send({ firstName, lastName, email, password })

    }

    requestLogin = (email, password) => {
       return superagent
        .post(`${apiHost}/api/auth/login`)
        .send({ email, password })
         // sends a JSON post body
        // .set('X-API-Key', 'foobar')
        // .set('accept', 'json')
        // .end((err, res) => {
        //   // Calling the end function will send the request
        // });
    }

    requestEntries = (token) => {
        return superagent
        .get(`${apiHost}/api/entries`)
        .set('authorisation', token)
       
    }

    requestSingleEntry = (id) => {
        return superagent
        .get(`${apiHost}/api/entries/:id`)
        .set('authorisation', id)
       // .then(reply => console.log('reply single ', reply.body))
    }

    createSingleEntry = (mood, contents, token) => {
        return superagent
        .post(`${apiHost}/api/entries`)
        .set('authorisation', token)
        .send({ mood, contents })
    }

    requestLogout = (token) => {
        return superagent
        .delete(`${apiHost}/api/auth/logout`)
        .set('authorisation', token)
    }

}

export default new Api();