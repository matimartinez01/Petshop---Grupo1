const $tablaCarrito = document.getElementById("tablaCarrito")

let arrayPrecioFinal = []

function crearTablaCarrito(producto, cantidad){
    let precioTotal = producto.precio * cantidad
    arrayPrecioFinal.push(precioTotal)
    return`
    <tr>
        <td class="border border-black">${producto.producto}</td>
        <td class="border border-black">${cantidad}</td>
        <td class="border border-black">${producto.precio}</td>
        <td class="border border-black">${precioTotal}</td>
        <td><button class="h-10 w-10 bg-black botonCarrito" data-id=${producto._id}></button></td>
    </tr>`
}

function filaPrecioTotal(precioFinal){
    return`
    <tr>
        <th class="border border-black text-left" colspan="3">Precio Final</td>
        <td class="border border-black">${precioFinal}</td>
    </tr>
    `
}

let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
let productosCarrito2 = productosCarrito
let stringProductosCarrito = productosCarrito.map(a => crearTablaCarrito(a, 1)).join(" ")

let precioFinal = 0
for (let numero of arrayPrecioFinal){
    precioFinal = precioFinal + numero
}
let stringPrecioFinal = filaPrecioTotal(precioFinal)

$tablaCarrito.innerHTML += stringProductosCarrito
$tablaCarrito.innerHTML += stringPrecioFinal

let $botonesBorrar = document.querySelectorAll(".botonCarrito")
for (let boton of $botonesBorrar){
    boton.addEventListener("click", (e) =>{
        let dataset = e.target.dataset
        let productoBoton = productosCarrito.find(a => a._id == dataset.id)
        productoBoton.botonCarrito = !productoBoton.botonCarrito
        productosCarrito = productosCarrito.filter(a => a._id != productoBoton._id)
        localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        boton.parentElement.parentElement.remove()
    })
}