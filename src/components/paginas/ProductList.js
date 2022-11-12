import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { traerProductos, traerProducto, crearProducto, editarProducto, eliminarProducto, login } from '../../backend/funcionesBackEndAdmin'
import ProductRow from '../ProductRow';


function ProducList() {

    const [listaProductos,setListaProductos] = useState ([]);
    const [loadingProductos,setLoadingProductos] = useState (true);

    const [token, setToken] = useState(null);

    //Esto en realidad se ejecuta en la pagina de login
    useEffect( () => {
        login('admin@example.com', 'admin')
            .then(({token, user}) => {
                console.log('Se logueo el usuario', {user, token})
                setToken(token);
                //Guardar token y usuario en Context...
            });
    }, [])

    useEffect( () => {
        if(token){
            setLoadingProductos(true);

            //Leer token de context
            traerProductos(token)
                .then(productos => {
                    setLoadingProductos(false);
                    setListaProductos(productos);

                    //Traer un solo producto
                    traerProducto(token, productos[0].id)
                        .then(producto => {
                            console.log('Producto traido de a uno', {producto});
                        });

                    //Editar
                    const productoAEditar = productos[0];
                    editarProducto(
                        token,
                        productoAEditar.id, 
                        {...productoAEditar, nombre: productoAEditar.nombre + '+'}
                    )
                        .then(productoEditado => {
                            console.log('Producto editado', {productoEditado})
                        });

                    //Crear
                    crearProducto(token, {...productos[0], stockInicial: 100})
                        .then(productoNuevo => {
                            console.log('Producto creado', {productoNuevo});

                            //Eliminar producto
                            eliminarProducto(token, productoNuevo.id);
                        });
                });
        }
    }, [token]);

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
                        {listaProductos.map(p => <ProductRow producto={p} key={p.id}></ProductRow>)}
                    </tbody>
                </table>
            </div>
            </>
        )
    }

}

export default ProducList