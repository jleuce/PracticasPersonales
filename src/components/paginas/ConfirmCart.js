import React from 'react'
import { Link, useParams } from 'react-router-dom'

function ConfirmCart() {

    const {id} = useParams();
    const eliminar = () => {
        console.log(`eliminando ${id}`);
    };

  return (
    <div>
        <div>Esta seguro de eliminar el producto id:</div>
        <p>{id}</p>
        <button onClick={eliminar}>Sí, eliminar</button>
        <Link to={'/'}>No, volver</Link>
    </div>
  )
}

export default ConfirmCart