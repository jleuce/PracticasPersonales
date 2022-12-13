function pageMain ({pagina,estilo,accionHandle}){

    const actionInterna = () => {
        accionHandle(pagina)
    }
    
    return(
        <>
        <button className={estilo} onClick={actionInterna}>{pagina}</button>
        </>
    )
}
export default pageMain