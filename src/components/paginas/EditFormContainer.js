import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFormPersonalizado } from '../../hooks/useFormPersonalizado';
import FormularioProducto from '../FormularioProducto'
import { traerProductos } from '../../backend/funcionesBackEnd';

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

function EditFormContainer() {

    const {id} = useParams();

    const onSubmit = (formData) => {
        console.log('Editando producto ID:', {id, formData})
    }

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setForm,
    } = useFormPersonalizado(initialForm, validationsForm, onSubmit);

    const [producto,setProducto] = useState ({});
    const [loadingProductos,setLoadingProductos] = useState (true);
    

    useEffect( () => {
        traerProductos(setLoadingProductos)
            .then (r => {
                setProducto(r.find(obj => obj.id === id))
            })
    },[])

    useEffect( () => {
        setForm({...producto,description: producto.descripcion,})
    },[producto])

    if(loadingProductos === true){
            return(
            <div>Esta cargando</div>
            )
    }else{
            
        console.log("soy el prod", {producto, form});
        return(
            <FormularioProducto
                handleSubmit={handleSubmit}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                form={form}
            ></FormularioProducto>
        )
    }
}

export default EditFormContainer