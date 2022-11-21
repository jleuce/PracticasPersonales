import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext  from './context/UserContext'

function NavBar() {

  const {
    user,
    estadoLogueado
  } =  useContext(UserContext)

  return (
    <div>
        <Link to={'/'}>Ir a productos</Link>
        <Link to={'/login'}>Login</Link>
        {estadoLogueado===true?user.usuario:"Sin loguear"}
    </div>
  )
}

export default NavBar