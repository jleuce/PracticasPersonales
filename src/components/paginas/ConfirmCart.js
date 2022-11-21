import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {eliminarProducto} from '../../backend/funcionesBackEndAdmin';
import UserContext from '../context/UserContext';

function ConfirmCart() {

    const {user} =  useContext(UserContext)
    const {id} = useParams();
    const navigate = useNavigate();
    const eliminar = () => {
        console.log(`eliminando ${id}`);
        eliminarProducto(user.token,id)
          .then(r=>console.log('se elimino producto', r))
          .then(()=> navigate('/listaproductos'))
          .catch(r=>console.log('tenes errores',r))
    };

  return (
    <div>
        <div>Esta seguro de eliminar el producto id:</div>
        <p>{id}</p>
        <button onClick={eliminar}>Sí, eliminar</button>
        <Link to={'/listaproductos'}>No, volver</Link>
    </div>
  )
}

export default ConfirmCart