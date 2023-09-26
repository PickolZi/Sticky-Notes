import { createContext, useState, useEffect } from "react";

// Create context to use anywhere within components
export const userContext = createContext(
    {
        userCredentialsContext: null,
        setUserCredentialsContext: () => null
    }
);


const setUserSession = (userCredentialsContext) => {
    // Saves user's session into local storage.
    if (userCredentialsContext) {
        console.log("Setting local user auth: ")
        console.log(JSON.stringify(userCredentialsContext))
        localStorage.setItem('user-auth', JSON.stringify(userCredentialsContext))
    } else {
        console.log("Removing user auth: ")
        localStorage.removeItem('user-auth')
    }
}

const getUserSession = (setUserCredentialsContext) => {
    // If old user session is still valid. Keep user logged in.
    let userLocalSession = localStorage.getItem('user-auth')
    console.log("Got user session: ", userLocalSession)
    if (userLocalSession) {
        setUserCredentialsContext(JSON.parse(userLocalSession));
    }
}

// Creating provider necessary for context.
export const UserProvider = ({children}) => {
    const [userCredentialsContext, setUserCredentialsContext] = useState(null);
    const value = {userCredentialsContext, setUserCredentialsContext};

    useEffect(() => {
        getUserSession(setUserCredentialsContext);
    }, [])

    useEffect(() => {
        // console.log("Something happened to the user.")
        setUserSession(userCredentialsContext);
    }, [userCredentialsContext]);
    
    
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}