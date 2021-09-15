import React, { useEffect, useState } from "react";
import service from "../../services/member-service"

export const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
    const [member, setMember] = useState(localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member")) : undefined)

    useEffect(() => {
        const storedMember = localStorage.getItem("member");
        if (storedMember) {
            service.getUser("me")
                .then((member) => {
                    //only update the context if there is a change in the member
                    if (JSON.stringify(member) !== JSON.stringify(storedMember)) {
                        setMember(member);
                    }
                })
        }
    }, [])

    function login(member) {
        localStorage.setItem("member", JSON.stringify(member));
        setMember(member)
    }

    function logout() {
        localStorage.removeItem("member");
        setMember(null)
    }

    const value = {
        member,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}