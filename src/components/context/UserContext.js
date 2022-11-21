import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext([]);

export default UserContext;

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [estadoLogueado, setEstadoLogueado] = useState(false);
    const navigate = useNavigate();

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
        setEstadoLogueado(false);
        console.log('te deslogueaste');
        navigate('/login');
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