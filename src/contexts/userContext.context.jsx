import { createContext, useState } from "react";

// Create context to use anywhere within components
export const userContext = createContext(
    {
        userCredentialsContext: null,
        setUserCredentialsContext: () => null
    }
);

// Creating provider necessary for context.
export const UserProvider = ({children}) => {
    const [userCredentialsContext, setUserCredentialsContext] = useState(null);
    const value = {userCredentialsContext, setUserCredentialsContext};
    
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}