import { createContext, useState } from "react";

const UserContext = createContext([]);

export default UserContext;

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [estadoLogueado, setEstadoLogueado] = useState(false);

    const saveUser = (usuario,token) => {
        setUser({
            usuario:usuario,
            token:token,
        });
        setEstadoLogueado(true);
    }

    //funcion deslogin
    const deslogin = () => {
        setUser({});
    }

    const fUser={
        saveUser,
        deslogin,
        user,
        estadoLogueado,
    }

    return (
        <UserContext.Provider value={fUser}>
            {children}
        </UserContext.Provider>
      );
    
}