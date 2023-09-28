import { createContext, useState } from "react";

export const SideBarContext = createContext({
    showSideBar: false,
    setShowSideBar: () => {}
});

export const SideBarProvider = ({children}) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const value = {showSideBar, setShowSideBar};

    return (
        <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
    )
}