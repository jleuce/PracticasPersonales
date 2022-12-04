const API_URL = "https://test-backend.xyz/admin"

const fetchErrorHandle = (response) => response.status === 200
    ? Promise.resolve(response)
    : response.json().then(data => Promise.reject({response, data}));


export const login = (email, password) => {
    return fetch (`${API_URL}/auth/login`, {
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
        .then(fetchErrorHandle)
        .then(response => {
            return response.json()
        })
        .then (res => {
            return res;
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
}

export const traerProductos = (token) => {
    const url = `${API_URL}/productos?` + new URLSearchParams({cantidadPorPagina: 50}))
    
    return fetch (url, {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
        .then(fetchErrorHandle)
        .then(response => {
            return response.json()
        })
        .then (res =>{
            return (res.productos)
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
}

export const traerProductosPaginado = (token, cantidadPorPagina, pagina) => {
    const url = `${API_URL}/productos?` + new URLSearchParams({cantidadPorPagina, pagina}))
    
    return fetch (url, {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
        .then(fetchErrorHandle)
        .then(response => {
            return response.json();
        })
        .then (res =>{
            return ({productos: res.productos, paginado: res.paginado})
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
}

export const traerProducto = (token, idProducto) => {
    return fetch(`${API_URL}/productos/${idProducto}`, {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
       .then(fetchErrorHandle)
       .then(response => response.json())
       .then(responseObject => responseObject.producto);
}

export const crearProducto = (token, datosProducto) =>{
    return fetch(`${API_URL}/productos`,
        {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosProducto)
        })
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.producto)
            .catch(err => {
                //console.log("Ocurrio un error al crear producto", err?.data);
                throw err;
            });
}

export const editarProducto = (token, idProducto, datosProducto) =>{
    return fetch(`${API_URL}/productos/${idProducto}`,
        {
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosProducto)
        })
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.producto)
            .catch(err => {
                console.log("Ocurrio un error al crear producto", err?.data);
                throw err;
            });
}

export const eliminarProducto = (token, idProducto) =>{
    return fetch(`${API_URL}/productos/${idProducto}`,
        {
            method: "DELETE",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(fetchErrorHandle)
            .then(response => response.json())
            .catch(err => {
                console.log("Ocurrio un error al crear producto", err?.data);
                throw err;
            });
}
