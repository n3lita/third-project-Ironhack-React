import React, { useEffect, useState} from "react";
import service from "../../services/member-service"

export const AuthContext = React.createContext()

export function AuthContextProvider( {children} ) {
    const [member, setMember] = useState()

    useEffect(() => {
        const memberId = localStorage.getItem("member");
        if (memberId) {
            service.details("me")
            .then((member) =>  setMember(member))
        }
    },[])

    function login(member) {
        localStorage.setItem("member", member.id);
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

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}