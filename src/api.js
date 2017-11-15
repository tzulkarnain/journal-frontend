import { apiHost } from './config/config.js';
import superagent from 'superagent';

/*

need: requestLogout(), requestSignUp(), requestSingleEntry(id);
*/

class Api {

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
        .then(reply => console.log('replyEntrlies ', reply.body ))

    }

}

export default new Api();