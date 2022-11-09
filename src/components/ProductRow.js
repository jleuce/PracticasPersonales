import React, { useEffect, useState } from 'react'
import { traerProductos } from '../backend/funcionesBackEnd'


function ProductRow({producto}) {
console.table(producto);
        return(
            <tr>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            {/*<td>{producto.imagenUrl}</td>*/}
            <td>{producto.stock}</td>
            <td>{producto.precio}</td>
            <button>Editar</button>
            <button>Eliminar</button>
            </tr>
        )

}

export default ProductRow