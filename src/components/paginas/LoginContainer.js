import React, { useContext } from 'react'
import { useFormPersonalizado } from '../../hooks/useFormPersonalizado';
import { login } from '../../backend/funcionesBackEndAdmin';
import UserContext  from '../context/UserContext';
import { Link } from 'react-router-dom';

const initialForm = {
    email:"",
    password:"",
};

const validationsForm = (form) => {
    let errors = {};
    if(!form.password.trim()){
        errors.password = "El campo NOMBRE esta vacio";
    }
    return errors;
};

function LoginContainer() {

    const {
        saveUser,
        user,
        estadoLogueado
      } =  useContext(UserContext)

    const onSubmit = (formData) => {
        console.log('Datos del formulario:', {formData})
        login(formData.email, formData.password)
            .then(res=> saveUser(res.user.name,res.token))
            .then(() =>console.log('loagueado'))
    }

    const {
        form,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormPersonalizado(initialForm, validationsForm, onSubmit);

    if(estadoLogueado===false) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-center" >email</label>
                        <input
                            type="email" 
                            name="email" 
                            placeholder='Escribe tu email' 
                            onBlur={handleBlur} 
                            onKeyUp={handleBlur} 
                            onChange={handleChange} 
                            value={form.email} 
                            required
                        />
                    </div>
                    <div>
                        <label className="text-center">Contraseña</label>
                        <input 
                            type="password" 
                            name="password"  
                            placeholder='Escribe tu contraseña'  
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={form.password} 
                            required/>
                    </div>
                    <div>
                        <input className="btn btn-outline" type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>
        )
    }else{
        return(
            <div>
                <div>Ya estas logueado con el usuario:</div> 
                <div>{user.usuario}</div>
            </div>
       ) 
    }
}

export default LoginContainer