import React, { useEffect, useState } from 'react'
import { traerProductos } from '../backend/funcionesBackEnd'
import ProductRow from './ProductRow';


function ProducList() {

    const [listaProductos,setListaProductos] = useState ([]);
    const [loadingProductos,setLoadingProductos] = useState (true);


    useEffect( () => {
        traerProductos(setLoadingProductos)
        .then (r => setListaProductos(r))
    },[])

    if(loadingProductos === true){
        console.log("cargando");
        return(
            <>
            <p>Cargando</p>
            </>
        )
    }else{
        console.log("cargo");
        console.log(listaProductos);
        return(
            <>
            <div>
                <button>Agregar Producto</button>
            </div>
            <div>
                <table>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>descripcion</th>
                        {/*<th>imagenUrl</th>*/}
                        <th>stock</th>
                        <th>precio</th>
                        <th>botones</th>
                    </tr>
                    {listaProductos.map(p => <ProductRow producto={p} key={p.id}></ProductRow>)}
                </table>
            </div>
            </>
        )
    }

}

export default ProducList