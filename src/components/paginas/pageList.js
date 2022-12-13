
function pageList ({logitudArray}){

    const divisor = 3;
    const division = logitudArray / divisor;
    

    return(
        <>
        <div><pageMain pagina={pagina} accionHandle={accion} estilo={estilo}/></div>
        </>
    )
}
export default pageList