//FILTRO POR NOMBRE

fetch("https://moviestack.onrender.com/api/petshop")
.then(response => response.json())
.then(data => {
    const articulosPetShop = data
    console.log(articulosPetShop)

    const $buscadorPorNombre = document.getElementById("buscadorPorNombre")
    // console.log($buscadorPorNombre.value)

    const $mensajeBusquedaVacia = document.getElementById("mensajeBusquedaVacia")
    // console.log($mensajeBusquedaVacia)

    const $cardsProductos = document.getElementById("cardsProductos")
    // console.log($cardsProductos)

    imprimirCards(articulosPetShop, $cardsProductos)

    $buscadorPorNombre.addEventListener("input", e => {
        const filtroNombre = filtrarProductosPorNombre(articulosPetShop, $buscadorPorNombre)
        console.log(filtroNombre);
        if (filtroNombre.length == 0) { 
            imprimirBusquedaVacia($mensajeBusquedaVacia, $buscadorPorNombre)
        } else {
            ocultarBusquedaVacia($mensajeBusquedaVacia)
            imprimirCards(filtroNombre, $cardsProductos)
            
        }
    })
})
.catch(error => console.log(error))


//------------------------------------------- FUNCIONES ----------------------------------------------------------------------------------------------------------------------

// FILTRAR POR NOMBRE INGRESADO. ---------------------------------------------------------------------------------------------------------------------------------------------
function filtrarProductosPorNombre (listaArticulos, nombreProducto){
    return listaArticulos.filter (articulo => articulo.producto.toLowerCase().includes(nombreProducto.value.toLowerCase()))
}


// EN CASO DE NO COINCIDIR CON EL NOMBRE INGRESADO, DEVOLVEMOS UN MENSAJE. ---------------------------------------------------------------------------------------------------
function mostrarBusquedaVacia(nombreProducto){
    return `<p class="">Disculpe. No hemos podido encontrar productos con el nombre ingresado: ${nombreProducto.value}.</p>`
}


// IMPRIMIR EL MENSAJE. ------------------------------------------------------------------------------------------------------------------------------------------------------
function imprimirBusquedaVacia(idHTML, nombreProducto) {
    idHTML.innerHTML = mostrarBusquedaVacia(nombreProducto)
}


// PARA QUE SE QUITE EL MENSAJE PARA NUEVAS BUSQUEDAS. -----------------------------------------------------------------------------------------------------------------------
function ocultarBusquedaVacia(idHTML){
    idHTML.innerHTML = ""
}


///////////////////////////////////////////////////
function crearCards(imagen, producto, categoria, descripcion, id){
    return `<article class="articleCards flex flex-col gap-1 items-center w-[330px] min-h-[460px] rounded-2xl pt-3 px-4 pb-3 shadow-2xl bg-white border-2 border-[#d2ccff]">
                <img class= "h-[200px] object-cover rounded-t-2xl pb-2" src="${imagen}" alt="Imagen de: ${producto}">
                <h3 class="text-center font-bold text-xl w-full px-1">${producto}</h3>
                <h4 class="text-center font-medium italic pb-1">${categoria}</h4>
                <p class="text-center text-sm line-clamp-4">${descripcion}</p>
                <div class="w-full flex justify-between items-center py-3 mt-auto">
                <a href="{id}" class="font-bold text-[#6d38e0] bg-[#d2ccff] rounded-[10px] px-4 py-1 mt-auto hover:bg-[#6d38e0] hover:text-white">+ Info</a>
                </div>
            </article>`
}


// IMPRIMIR CARDS. -----------------------------------------------------------------------------------------------------------------------------------------------------------
function imprimirCards (listaArticulos, idHTML) {
    let articuloCard = ""
    for (let articulo of listaArticulos){
        articuloCard += crearCards(articulo.imagen, articulo.producto, articulo.categoria, articulo.descripcion, articulo.id)
    }
    idHTML.innerHTML = articuloCard
}





