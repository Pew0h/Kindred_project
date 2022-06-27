/**
 * Effectuer les appels vers le serveur
 * On lui passe juste les endpoints de l'api et les paramètres éventuels
 *
 * Lui il gère le token
 *
 * => getFromServer : (endpoint: string, params?: {})
 * => postOnServer (endpoint: string, params: {})
 * => deleteOnServer (endpoint: string)
 */

import axios from "axios";

const baseURL = 'https://api-kindred-project.herokuapp.com/api/';

const instance = axios.create({
    baseURL
})

const instanceNoLogin = axios.create({
    baseURL
})

export function setServerToken(token) {
    instance.defaults.headers = {
        Authorization: "Bearer " + token
    };
}

export async function  getFromServer(endpoint) {
    return instance.get(endpoint).then(response => {
        return response;
    })
    .catch(error => {
        console.log(error);
        const {response: {data: {message}}} = error;
        if (message === 'Expired JWT Token' || message === 'JWT Token not found') {
            window.location = "/login"
        }
    });
}

export async function  getFromServerWithoutHeader(endpoint) {
    return instanceNoLogin.get(endpoint).then(response => {
        return response;
    }).catch(error => {
        console.log(error);
        const {response: {data: {message}}} = error;
        if (message === 'Expired JWT Token' || message === 'JWT Token not found') {
            window.location = "/login"
        }
    });;
}

export function postOnServer(endpoint, body) {
    return instance.post(endpoint, body).then(response => {
        return response;
    })
        .catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                window.location = "/login"
            }
        });
}

export function patchOnServer(endpoint, body) {
    return instance.patch(endpoint, body).then(response => {
        return response;
    })
        .catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                window.location = "/login"
            }
        });
}

export function deleteOnServer(endpoint) {
    // Pas sûr
    return instance.delete(endpoint).then(response => {
        return response;
    })
        .catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                window.location = "/login"
            }
        });
}
