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
    <div className='navBar'>
        {estadoLogueado===true?<Link className='navBarComponent' to={'/listaproductos'}>Ir a productos</Link>:''}
        {estadoLogueado===false?<Link className='navBarComponent' to={'/'}>Login</Link>:<button onClick={desloguearse}>Desloguearse</button>}
        {estadoLogueado===true?<p className='navBarComponent'>Usuario: {user.usuario}</p>:<p className='navBarComponent'>"Sin loguear"</p>}
    </div>
  )
}

export default NavBar