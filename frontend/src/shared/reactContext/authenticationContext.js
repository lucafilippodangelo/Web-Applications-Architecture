import {createContext} from 'react';

//LD the below object can be shared between components.
//Any component can update.
export const authenticationContext = createContext({
    userId: null, //LD experiment
    token: null,
    isLoggedIn: false,
    login: () => {
    },
    logout: () => {
    }
});

//LD super useful to manage user -> https://react.dev/reference/react/createContext