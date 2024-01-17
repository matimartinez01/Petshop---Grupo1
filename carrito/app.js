const $div_botones = document.getElementById("div_botones") 

function crearBoton(producto, id){
    let aux = producto.estaEnCarrito ? "" : "bg-black"
    return`
    <button class="h-10 w-10 boton_carrito ${aux}" data-id=${id}></button>
    `
}

let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
function comprobarId(array, idProducto){
    let arrayId = array.map(a => a._id)
    return arrayId.includes(idProducto)
}


fetch('https://moviestack.onrender.com/api/petshop')
.then(response => response.json())
.then(a => {
    let productos = a
    for (let producto of productos){
        if (comprobarId(productosCarrito, producto._id)){
            producto.estaEnCarrito = true
        } else{
            producto.estaEnCarrito = false
        }
    }
    console.log(productos)
    let stringProductos = productos.map(producto => crearBoton(producto, producto._id)).join(" ")
    $div_botones.innerHTML = stringProductos
    const $botones = document.querySelectorAll(".boton_carrito")
    for(let boton of $botones){
        boton.addEventListener("click", (e) => {
            let boton_seleccionado = e.target.dataset.id
            boton_seleccionado = productos.find(a => a._id == boton_seleccionado)
            console.log(boton_seleccionado)
            boton_seleccionado.estaEnCarrito = !boton_seleccionado.estaEnCarrito
            let listaClases = boton.classList
            listaClases = listaClases.toggle("bg-black")
            if(!comprobarId(productosCarrito, boton_seleccionado._id)){
                productosCarrito.push(boton_seleccionado)
            }
             else{
                productosCarrito = productosCarrito.filter(a => a._id != boton_seleccionado._id)
            }
            localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        })
    }
})