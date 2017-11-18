import { apiHost, unsplashHost} from './config/config.js';
import superagent from 'superagent';


class Api {

    createAccount = (firstName, lastName, email, password) => {
        return superagent
        .post(`${apiHost}/api/auth/create-account`)
        .send({ firstName, lastName, email, password })

    }

    requestUserObject = (token) => {
        return superagent
        .get(`${apiHost}/api/auth/me`)
        .set('authorisation', token)
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

    requestEntries = (token,days) => {
        console.log("requesting entries in last ",days,"days")
        //could do this url-encoded but right now it's in the header instead, just like the token
        //returns an array of entries belonging to the user, limited to the amount specified
        return superagent
        .get(`${apiHost}/api/entries`)
        .set({'authorisation': token,
            'days':days
        })
         
    }
    requestGeotaggedEntries = (token,days) =>{
        // works just like requestEntries, except
        // only includes entries which are geotagged
        return superagent
        .get(`${apiHost}/api/geotags`)
        .set({'authorisation': token,
            'days':days
        })
    }

    requestSingleEntry = (id, token) => {
        return superagent
        .get(`${apiHost}/api/entries/${id}`)
        .set('authorisation', token)
    //    .then(reply => console.log('reply single ', reply.body))
    }

    createSingleEntry = (entryDataObj, token) => {
        return superagent
        .post(`${apiHost}/api/entries`)
        .set('authorisation', token)
        .send(entryDataObj)
    }
    getUnsplashImage = (searchQuery) =>{
        console.log("searching for images with query:",searchQuery)
        return superagent
        .get(`${unsplashHost}/photos/random/?client_id=7f92d3ebf06a461e3f677efbacab2e65ea790ac68f8eac6c7d46794de6da3bcf&orientation=squarish&${searchQuery}`)
    }
    requestLogout = (token) => {
        return superagent
        .delete(`${apiHost}/api/auth/logout`)
        .set('authorisation', token)
        //cause superagent's voodoo magic needs to have a .then 
        .then(response=>console.log(response))
    }

    requestDeleteEntry = (id, token) => {
        return superagent
        .delete(`${apiHost}/api/entries/${id}` )
        .set('authorisation', token)
        .then (reply => console.log('working', reply) )
    }
}

export default new Api();