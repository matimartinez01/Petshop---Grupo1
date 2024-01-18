const contenedorProducts = document.getElementById("contProducts")
const $checkbox = document.getElementById('checkbox')
const $buscadorPorNombre = document.getElementById("buscadorPorNombre")
const $mensajeBusquedaVacia = document.getElementById("mensajeBusquedaVacia")
const $cardsProductos = document.getElementById("cardsProductos")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {

        $buscadorPorNombre.addEventListener("input", e => {
            const filtrados = filtroPorCategoria(data)
            const filtroNombre = filtrarProductosPorNombre(filtrados, $buscadorPorNombre)

            console.log(filtroNombre);
            if (filtroNombre.length == 0) {
                imprimirBusquedaVacia(contenedorProducts, $buscadorPorNombre)
            } else {
                ocultarBusquedaVacia($mensajeBusquedaVacia)
                contenedorProducts.innerHTML = recorrerProdructs(filtroNombre)
                funcionamientoBoton()
            }
        })
        $checkbox.addEventListener("input", () => {
            const filtroNombre = filtrarProductosPorNombre(data, $buscadorPorNombre)
            const filtrados = filtroPorCategoria(filtroNombre)

            contenedorProducts.innerHTML = recorrerProdructs(filtrados)
            funcionamientoBoton()
            console.log(filtrados)

            if(filtrados.length == 0){
                imprimirBusquedaVacia(contenedorProducts, $buscadorPorNombre)
            }
        })

        




        let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || []

        let productos = data
        for (let producto of productos) {
            if (comprobarId(productosCarrito, producto._id)) {
                producto.estaEnCarrito = true
            } else {
                producto.estaEnCarrito = false
            }
        }


        contenedorProducts.innerHTML = recorrerProdructs(data)

        function funcionamientoBoton(){
        const $botones = document.querySelectorAll(".boton_carrito")
        for (let boton of $botones) {
            boton.addEventListener("click", (e) => {

                let boton_seleccionado = e.target.dataset.id
                boton_seleccionado = productos.find(data => data._id == boton_seleccionado)
                

                let listaClases = boton.classList
                let divComprar = e.target

                if(boton_seleccionado.disponibles < 1){
                    listaClases.remove("bg-green-600", "hover:bg-green-700" ,"hover:opacity-80")
                    listaClases.add("text-red-600")
                    divComprar.textContent = "Sin Stock"
                }else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Agregado al carrito"
                      });
                    boton_seleccionado.estaEnCarrito = !boton_seleccionado.estaEnCarrito
    
                    if (listaClases.contains("bg-green-600")){
                        listaClases.remove("bg-green-600")
                        listaClases.add("bg-red-800")
                        listaClases.remove("hover:bg-green-700")
                        listaClases.add("hover:bg-red-600")
                        divComprar.textContent = "Quitar"
                    }else{
                        listaClases.remove("bg-red-800")
                        listaClases.add("bg-green-600")
                        listaClases.remove("hover:bg-red-600")
                        listaClases.add("hover:bg-green-700")
                        divComprar.textContent = "Carrito"
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "error",
                            title: "Eliminado del carrito"
                          });
                    }
    
                    if (!comprobarId(productosCarrito, boton_seleccionado._id)) {
                        productosCarrito.push(boton_seleccionado)
                    }
                    else {
                        productosCarrito = productosCarrito.filter(data => data._id != boton_seleccionado._id)
                    }
                    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
                }

            })
        }}
        funcionamientoBoton()
    })
    
    .catch (err => console.log(err))


//------------------------------------------- FUNCIONES ----------------------------------------------------------------------------------------------------------------------

// FILTRAR POR NOMBRE INGRESADO. ---------------------------------------------------------------------------------------------------------------------------------------------
function filtrarProductosPorNombre(listaArticulos, nombreProducto) {
    return listaArticulos.filter(articulo => articulo.producto.toLowerCase().includes(nombreProducto.value.toLowerCase()))
}


// EN CASO DE NO COINCIDIR CON EL NOMBRE INGRESADO, DEVOLVEMOS UN MENSAJE. ---------------------------------------------------------------------------------------------------
function mostrarBusquedaVacia(nombreProducto) {
    return `<p class="flex justify-center bg-orange-400 p-2 rounded-xl font-semibold">Disculpe. No hemos podido encontrar productos con el nombre ingresado: ${nombreProducto.value}.</p>`
}


// IMPRIMIR EL MENSAJE. ------------------------------------------------------------------------------------------------------------------------------------------------------
function imprimirBusquedaVacia(idHTML, nombreProducto) {
    idHTML.innerHTML = mostrarBusquedaVacia(nombreProducto)
}


// PARA QUE SE QUITE EL MENSAJE PARA NUEVAS BUSQUEDAS. -----------------------------------------------------------------------------------------------------------------------
function ocultarBusquedaVacia(idHTML) {
    idHTML.innerHTML = ""
}

const filtroPorCategoria = (productos) => {
    const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.value)

    if (seleccionados.length == 0) {
        return productos
    }
    const productosFiltrados = productos.filter(producto => seleccionados.includes(producto.categoria))

    return productosFiltrados
}

function comprobarId(array, idProducto) {
    let arrayId = array.map(data => data._id)
    return arrayId.includes(idProducto)
}

function recorrerProdructs(array) {
    let cardProduct = ""
    for (const producto of array) {
        cardProduct += crearCardProducto(producto)
    }
    return cardProduct
}

function crearCardProducto(producto) {
    let aux = producto.estaEnCarrito ? "bg-red-800" : "bg-green-600"
    let aux2 = producto.estaEnCarrito ? "hover:bg-red-600" : "hover:bg-green-700"
    let mensajeAux = producto.estaEnCarrito ? "Quitar" : "Carrito"
    return `
            <div class="flex flex-col h-[380px] w-[280px] bg-white rounded-lg p-2 shadow-2xl">
                <img src="${producto.imagen}" alt="imagen del producto" class="h-[180px] object-contain">
                <h1 class="font-semibold px-1.5 text-lg h-[60px] grow text-center py-1">${producto.producto}</h1>
                <div class="flex flex-col justify-between gap-1.5">
                    <h2 class="px-1.5 text-neutral-500 text-lg">${producto.categoria}</h2>
                    <p class="px-1.5 text-xl font-semibold">${producto.precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</p>
                    <div class="flex justify-between p-1.5">
                        <a href="detail.html?id=${producto._id}" class="w-[85px] flex justify-center bg-orange-400 p-2 rounded-xl font-medium hover:bg-orange-500">Detalle</a>
                        <div data-id="${producto._id}" class="boton_carrito w-[85px] flex justify-center p-2 ${aux} rounded-xl text-green-100 font-medium hover:opacity-80 cursor-pointer ${aux2}">${mensajeAux}</div>
                    </div>
                </div>
            </div>
        `
}