import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { traerProductos, traerProducto, crearProducto, editarProducto, eliminarProducto, login } from '../../backend/funcionesBackEndAdmin'
import ProductRow from '../ProductRow';
import UserContext from '../context/UserContext';

const itemsPorLista = 3;

function ProducList() {

    const [listaProductos,setListaProductos] = useState ([]);
    const [listaParcialProductos,setListaParcialProductos] = useState ([]);
    const [numeroLista,setNumeroLista] = useState (1);
    const [loadingProductos,setLoadingProductos] = useState (true);
    const {user} =  useContext(UserContext);

    const armarLista = (pagina) => {
        if (pagina === 1){
            const arrayTransitorio = [...listaProductos];
            arrayTransitorio.splice(itemsPorLista*pagina,arrayTransitorio.length-itemsPorLista);
            setListaParcialProductos(arrayTransitorio);
            console.log(listaParcialProductos);
        }else{
            const arrayTransitorio = [...listaProductos];
            arrayTransitorio.splice(itemsPorLista*pagina,arrayTransitorio.length-itemsPorLista);
            arrayTransitorio.splice(0,itemsPorLista*(pagina-1));
            setListaParcialProductos(arrayTransitorio);
            console.log(listaParcialProductos);
        }
    }
    const incrementarLista = () => {
        if (listaProductos.length > numeroLista*itemsPorLista){
            setNumeroLista(numeroLista + 1);
        }
    }
    const bajarLista = () => {
        if(numeroLista > 1){
        setNumeroLista(numeroLista - 1);
        }
    }
    const mostrarTodo = () => {
        const arrayTransitorio = [...listaProductos];
        setListaParcialProductos(arrayTransitorio);
    }

    //Esto en realidad se ejecuta en la pagina de login
    useEffect( () => {
        setLoadingProductos(true);
        traerProductos(user.token)
            .then(r => setListaProductos(r))
            .then(()=>armarLista(numeroLista))
            .then(()=>setLoadingProductos(false))
            .catch(r=>console.log('algo exploto',r))
    }, [])

    useEffect( () => {
        armarLista(numeroLista);
    }, [numeroLista])

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
                        {listaParcialProductos.map(p => <ProductRow producto={p} key={p.id} handleEliminarProducto={eliminarProducto}></ProductRow>)}
                    </tbody>
                </table>
                <button onClick={bajarLista}>Volver</button>
                <button>Pagina:{numeroLista}</button>
                <button onClick={incrementarLista}>Avanzar</button>
                <button onClick={mostrarTodo}>Lista completa</button>
            </div>
            </>
        )
    }

}

export default ProducList