const $tablaCarrito = document.getElementById("tablaCarrito")

let arrayPrecioFinal = []
let precioTotal = 0
let id = 0

//Esta funcion crea las filas de la tabla
//La primer fila es el nombre del producto
//La segunda es la cantidad, despues se le pone el valor
//La tercera fila es el precio individual
//La cuarta fila es el precio total, despues se le pone el valor
//La quinta es el boton que borra la fila
//La sexta es el input que sirve para mostrar la cantidad, guarda un id que se va aumentando y tiene como maximo el stock del producto
function crearTablaCarrito(producto){
    id = id + 1
    return`
    <tr>
        <td class="border border-black">${producto.producto}</td>
        <td class="border border-black cantidad"></td>
        <td class="border border-black precioIndividual">${producto.precio}</td>
        <td class="border border-black precioTotal"></td>
        <td><button class="h-10 w-10 bg-black botonCarrito" data-id=${producto._id}></button></td>
        <td><input class="inputCantidad" id="${id}" type="number" min="0" max=${producto.disponibles} placeholder="1"></td>
    </tr>`
}

//Crea la fila del precio final sin ningun valor
function filaPrecioTotal(){
    return`
    <tr>
        <th class="border border-black text-left" colspan="3">Precio Final</td>
        <td class="border border-black" id="precioFinal"></td>
    </tr>
    `
}
//Guardo los productos que estan en localStorage en productosCarrito
let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
//Creo el string con las filas de los productos y la fila del precio final
let stringProductosCarrito = productosCarrito.map(a => crearTablaCarrito(a)).join(" ")
let stringPrecioFinal = filaPrecioTotal()
//Le hago innerHTML a las strings de antes para imprimir en pantalla los datos
$tablaCarrito.innerHTML += stringProductosCarrito
$tablaCarrito.innerHTML += stringPrecioFinal


//  ------------------------------   ACA ARRANCA EL KILOMBASO   ------------------------------

//Vuelvo el valor del id a 1, creo un array vacio, precioFinalPosta y precioAuxiliar
id = 1
let arrayProductos = []
let precioFinalPosta = 0
let precioAuxiliar = 0

//Selecciono todos los input que tengan la clase "inputCantidad" (Todos los input que hay)
let $inputCantidad = document.querySelectorAll(".inputCantidad")

//Por cada input, pusheo un objeto que tenga: 
// 1)  El id que cree arriba y se va incrementando
// 2)  El precio total del producto
//También por cada input le agrego un eventListener
for (let cantidad of $inputCantidad){
    arrayProductos.push({
        id: id++,
        precioTotalProducto: ""
    })
    cantidad.addEventListener("change", e => {
        let cantidadPrueba = e.target.value
        //En $cantidadHTML basicamente selecciono la columna cantidad de la tabla en la fila donde esta ese input y le agrego esa cantidad a la tabla
        let $cantidadHTML = cantidad.parentElement.parentElement.querySelector(".cantidad")
        $cantidadHTML.innerHTML = cantidadPrueba
        //En $precioHTML lo mismo pero en la columna de precio total
        let $precioHTML = cantidad.parentElement.parentElement.querySelector(".precioTotal")
        //Aca guardo el valor de la columna precio individual y lo convierto en numero
        let $precioIndividual = cantidad.parentElement.parentElement.querySelector(".precioIndividual")
        $precioIndividual = Number($precioIndividual.textContent)
        //Precio total = individual * cantidad y lo guardo en la tabla en su columna
        precioTotal = $precioIndividual * cantidadPrueba
        $precioHTML.innerHTML = precioTotal
        //Seleccion el precio final
        let $precioFinal = document.getElementById("precioFinal")
        //Uso el arrayProductos que creaba un objeto por cada input
        //El objeto que coincida su id con el del input (que lo guarde cuando cree la tabla) le cambia el valor de precioTotalProducto al de precioTotal
        for(let a of arrayProductos){
            if(a.id == cantidad.id){
                a.precioTotalProducto = precioTotal
            }
        }
        //Crea un array con el precioTotalProducto de todos los objetos
        precioAuxiliar = arrayProductos.map(a => Number(a.precioTotalProducto))
        precioFinalPosta = 0
        //Aca sumo los valores del array precioAuxiliar y despues lo imprimo en la pantalla
        for (let a of precioAuxiliar){
            precioFinalPosta = precioFinalPosta + a
        }
        $precioFinal.innerHTML = precioFinalPosta
    })
    
}

//  ------------------------------   Esto es lo mismo que cuando hicimos lo de la pagina favs de movies para borrarlos de ahi   ------------------------------


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