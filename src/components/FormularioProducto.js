import React from 'react';
import { Link } from 'react-router-dom';

function FormularioProducto(props) {

    const {
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        form,
        backEndErrors,
        handleBackEndErrors,
    } = props;

    if (backEndErrors.length > 0 ){
        backEndErrors.forEach(e => {
            alert(`error del tipo "${e.msg}" en el campo "${e.param}"`)  
        });
        handleBackEndErrors([])
    }
    return(
        <>
            <div className="shadow-xl content-center">
                <div className="card-body items-center text-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-center" >Nombre</label>
                            <input
                                type="text" 
                                name="nombre" 
                                placeholder='Escribe tu nombre' 
                                onBlur={handleBlur} 
                                onKeyUp={handleBlur} 
                                onChange={handleChange} 
                                value={form.nombre} 
                                required
                            />
                        </div>
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
                        <div>
                            <input className="btn btn-outline" type="submit" value="Enviar"/>
                        </div>
                        <div>
                            <p>Tus errores:</p>
                            {backEndErrors.map(r=> <p>{r.msg}</p>)}
                        </div>
                    </form>
                    </div>
                    <Link to={'/'}>Volver</Link>
            </div>
         </>    
    ) 
}

export default FormularioProducto