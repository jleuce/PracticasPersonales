const API_URL = "https://test-backend.xyz"

const fetchErrorHandle = (response) => response.status === 200
    ? Promise.resolve(response)
    : response.json().then(data => Promise.reject({response, data}));

export const traerProductos = (setLoading) => {
    setLoading(true)
    const URL = `${API_URL}/productos`
    return fetch (URL)
        .then(fetchErrorHandle)
        .then(response => {
            return response.json()
        })
        .then (res =>{
            setLoading(false)
            return (res.productos)
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
}

export const traerProducto = (idProducto) =>{
    return fetch(`${API_URL}/productos/${idProducto}`)
       .then(fetchErrorHandle)
       .then(response => response.json())
       .then(responseObject => responseObject.producto);
}

export const traerPedidos = () => {
    return fetch(`${API_URL}/pedidos`)
        .then(fetchErrorHandle)
        .then(response => response.json())
        .then(responseObject => responseObject.pedidos);
}
    
export const traerPedido = (idPedido) =>{
     return fetch(`${API_URL}/pedidos/${idPedido}`)
        .then(fetchErrorHandle)
        .then(response => response.json())
        .then(responseObject => responseObject.pedido);
}
    
export const crearPedido = (datosPedido) =>{
    return fetch(`${API_URL}/pedidos`,
        {
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
                'Content-Type': 'application/json'
                },
        body: JSON.stringify(datosPedido)
        }
            )
            .then(fetchErrorHandle)
            .then(response => response.json())
            .then(responseObject => responseObject.pedido)
            .catch(err => {
                console.log("Ocurrio un error al crear pedido", err?.data);
                throw err;
            });
}