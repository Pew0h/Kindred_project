import '../styles/main.scss';
import './login/index.module.scss'
import {store} from '../src/store/store';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import {createContext, useEffect, useState} from "react";
import {getFromServer, setServerToken} from "../src/utils/server";

export const userContext = createContext();

function MyApp({Component, pageProps}) {

    const [user, setUser] = useState({
        token: '',
        firstname: "Tchi",
        lastname: "Tchi",
        role: ''
    });

    useEffect(onLoad, [])

    // Utilisateur qu'on va trimballer dans l'application
    // Contextes React
    // Contexte il est vide
    // => P'tit check dans le LS
    // Pour chaque page on vérifie si le contexte existe et que l'utilisateur est bien dedans

    // Dans le formulaire de login


    const getLayout = Component.getLayout || ((page) => page);

    return (
        <userContext.Provider value={{
            user,
            setToken: onLogin
        }}>
            <Provider store={store}>
                <ChakraProvider>{getLayout(
                    <Component {...pageProps} />
                )}</ChakraProvider>
            </Provider>
        </userContext.Provider>
    );

    function getCurrentUser() {
        getFromServer('current_user').then(response => {

            const {data: {firstname, lastname, roles}} = response;
            setUser({
                ...user,
                firstname,
                lastname,
                role: roles[0],
            })
        })
    }

    function onLoad() {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Azy je charge");
            setUser({
                ...user,
                token
            })
            setServerToken(token);
        }
    }

    function onLogin(token) {
        setServerToken(token);
        localStorage.setItem('token', token);
        getCurrentUser();
        setUser({
            ...user,
            token,
        })
    }
}

export default MyApp
