import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext  from './context/UserContext'

function NavBar() {

  const {
    user,
    estadoLogueado,
    deslogin
  } =  useContext(UserContext)

  const desloguearse = () => {
    deslogin();
  }
  return (
    <div>
        {estadoLogueado===true?<Link to={'/listaproductos'}>Ir a productos</Link>:''}
        {estadoLogueado===false?<Link to={'/'}>Login</Link>:<button onClick={desloguearse}>Desloguearse</button>}
        {estadoLogueado===true?user.usuario:"Sin loguear"}
    </div>
  )
}

export default NavBar