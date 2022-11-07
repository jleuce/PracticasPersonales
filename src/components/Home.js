import React, { useEffect, useState } from 'react'
//import { traerProductos } from '../backend/funcionesBackEnd'
import { useFormPersonalizado } from '../hooks/useFormPersonalizado'

const initialForm = {
    nombre:"",
    description:"",
    imagenUrl:"",
    precio:"",
    stock:"",
};

function validarUrl(urlValidar){
    let url;
    try{
        url = new URL(urlValidar);
    }catch(_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

const validationsForm = (form) => {
    let errors = {};
    if(!form.nombre.trim()){
        errors.name = "El campo NOMBRE esta vacio";
    }

    if(form.nombre.length > 5){
        errors.name = "El campo NOMBRE tiene más de 5 caracteres";
    }

    if(isNaN(form.precio) || form.precio <= 0){
        errors.precio = "No es un precio valido";
    }

    if(!Number.isInteger(parseFloat(form.stock))){
        errors.stock = "No es un numero de stock valido";
    }
    
    if(!validarUrl(form.imagenUrl)){
        errors.imagenUrl = "No es una URL valida";
    }
    return errors;
};

function Home() {

    /*
    const [productos, setProductos] = useState([]);
    const [loadingProductos, setLoadingProductos] = useState(true);
    useEffect(() => {
        setLoadingProductos(true);
        traerProductos()
        .then(productos => setProductos(productos))
        .then(setLoadingProductos(false))
        .then(() => console.log(productos[0].keys))
    }, [])
    */

    const {form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormPersonalizado(initialForm,validationsForm);

    return (
        <>
            <div className="shadow-xl content-center">
                <div className="card-body items-center text-center">
                    <form onSubmit={handleSubmit()}>
                        <div>
                            <label className="text-center" >Nombre</label>
                            <input 
                            type="text" 
                            name="nombre" 
                            placeholder='Escribe tu nombre' 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.nombre} 
                            required/>
                        </div>
                        {errors.name?<p className='textBoxAlert'>{errors.name}</p>:form.nombre != null?<p className='textBoxValid'>"Ok"</p>:""}
                        <div>
                            <label className="text-center">Descripción</label>
                            <input 
                            type="text" 
                            name="description" 
                            placeholder='Escribe tu description' 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.description} 
                            required/>
                        </div>
                        <div>
                            <label className="text-center">Link Imagen</label>
                            <input 
                            type="text" 
                            name="imagenUrl" 
                            placeholder='Pega la URL de la imagen' 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.imagenUrl} 
                            required/>
                        </div>
                        {errors.imagenUrl?<p>{errors.imagenUrl}</p>:""}
                        <div>
                            <label className="text-center">Precio</label>
                            <input 
                            type="number" 
                            name="precio" 
                            placeholder='Define Precio' 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.precio} 
                            required/>
                        </div>
                        {errors.precio?<p>{errors.precio}</p>:""}
                        <div>
                            <label className="text-center">Stock</label>
                            <input 
                            type="number" 
                            name="stock" 
                            placeholder='Define stock' 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.stock} 
                            required/>
                        </div>
                        {errors.stock?<p>{errors.stock}</p>:""}
                        <div>
                            <input className="btn btn-outline" type="submit" value="Enviar"/>
                        </div>
                    </form>
                    </div>
            </div>
        </>
    )
    
}

export default Home