import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { traerProductos, traerProducto, crearProducto, editarProducto, eliminarProducto, login } from '../../backend/funcionesBackEndAdmin'
import ProductRow from '../ProductRow';
import UserContext from '../context/UserContext';


function ProducList() {

    const [listaProductos,setListaProductos] = useState ([]);
    const [loadingProductos,setLoadingProductos] = useState (true);
    const [token, setToken] = useState(null);
    const {user} =  useContext(UserContext);

    //Esto en realidad se ejecuta en la pagina de login
    useEffect( () => {
        setLoadingProductos(true);
        traerProductos(user.token)
            .then(r => setListaProductos(r))
            .then(()=>setLoadingProductos(false))
            .catch(r=>console.log('algo exploto',r))
    }, [])

    if(loadingProductos === true){
        console.log("cargando");
        return(
            <>
            <p>Cargando</p>
            </>
        )
    }else{
        console.log("cargó");
        return(
            <>
            <div>
                <Link to={'/formulario/agregarnuevoproducto'}>Agregar Producto</Link>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>descripcion</th>
                            {/*<th>imagenUrl</th>*/}
                            <th>stock</th>
                            <th>precio</th>
                            <th>botones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.map(p => <ProductRow producto={p} key={p.id} handleEliminarProducto={eliminarProducto}></ProductRow>)}
                    </tbody>
                </table>
            </div>
            </>
        )
    }

}

export default ProducList