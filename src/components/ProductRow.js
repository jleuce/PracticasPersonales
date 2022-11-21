import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProductRow({producto,handleEliminarProducto}) {

    return(
        <tr>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            {/*<td>{producto.imagenUrl}</td>*/}
            <td>{producto.stock}</td>
            <td>{producto.precio}</td>
            <td>
                <Link to={`/formulario/${producto.id}`}>Editar</Link>
                <Link to={`/confirmar/${producto.id}`}>Eliminar</Link>
            </td>
        </tr>
    )

}

export default ProductRow