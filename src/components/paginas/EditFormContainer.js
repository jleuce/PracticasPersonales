import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormPersonalizado } from '../../hooks/useFormPersonalizado';
import FormularioProducto from '../FormularioProducto'
import { traerProducto } from '../../backend/funcionesBackEndAdmin';
import UserContext from '../context/UserContext';
import { editarProducto } from '../../backend/funcionesBackEndAdmin';

//traerProducto = (token, idProducto)

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

    const [backEndErrors,setBackEndErrors] = useState ([]);
    const navigate = useNavigate();
    const {
        user,
        estadoLogueado
      } =  useContext(UserContext)
   
    const {id} = useParams();

    const onSubmit = (formData) => {
        console.log('Editando producto ID:', {id, formData})
        const obj = {
            nombre:formData.nombre,
            descripcion:formData.description,
            imagenUrl: formData.imagenUrl,
            stock: formData.stock,
            precio:formData.precio,
        }
        editarProducto (user.token, id , obj)
        .then(r => console.log('se edito el producto',r))
        .then(()=> navigate('/listaproductos'))
        .catch(err => {
            console.log(err.data.message);
            console.log(err.data.errors);
            setBackEndErrors(err.data.errors);
        })
        console.log('producto editado',{id})
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
        //Pegarle a traerProducto
        setLoadingProductos(true);
        traerProducto(user.token,id)
            .then (r => setProducto(r))
            .then(()=>setLoadingProductos(false))
            .catch(r=>console.log('error',r))
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
                backEndErrors={backEndErrors}
                handleBackEndErrors={setBackEndErrors}
            ></FormularioProducto>
        )
    }
}

export default EditFormContainer