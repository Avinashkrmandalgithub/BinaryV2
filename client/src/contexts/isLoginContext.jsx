import React, { createContext, useContext, useState } from 'react'

export const IsLoginContext = createContext()

const IsLoginContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState({
        isLogin: false,
        user : null
    });
    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    )
}
export default IsLoginContextProvider

export function useIsLogin() {
    return useContext(IsLoginContext)
} 