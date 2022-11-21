import { useState } from "react";

export const useFormPersonalizado = (initialForm, validateForm, onSubmit,hooks) =>{
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [response,setResponse] = useState(null);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value,
        })
    };

    const handleBlur = (e)=>{
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        const errors = validateForm(form);
        console.log({errors});
        if(Object.keys(errors).length === 0){
            onSubmit(form);
        }else{
            setErrors(errors);
        }
    };

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
        setForm,
        setErrors,
    }
}