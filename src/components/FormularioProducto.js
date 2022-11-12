import React from 'react';
import { Link } from 'react-router-dom';

function FormularioProducto(props) {

    const {
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        form,
    } = props;

    return(
                <>
                <div className="shadow-xl content-center">
                    <div className="card-body items-center text-center">
                        <form onSubmit={handleSubmit()}>
                            <div>
                                <label className="text-center" >Nombre</label>
                                <input className= {errors.name?"textBoxAlert text-center":"text-center"}
                                type="text" 
                                name="nombre" 
                                placeholder='Escribe tu nombre' 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={form.nombre} 
                                required/>
                            </div>
                            {errors.name?<p className='textBoxAlert'>{errors.name}</p>:form.nombre.length > (1)?<p className='textBoxValid'>Ok</p>:""}
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
                        <Link to={'/'}>Volver</Link>
                </div>
            </>    
    ) 
}

export default FormularioProducto