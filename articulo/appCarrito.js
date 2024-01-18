const $tablaCarrito = document.getElementById("tablaCarrito")
const $carritoAside = document.getElementById('carritoAside')
const $mainCarrito = document.getElementById("mainCarrito")
const $divTabla = document.getElementById("divTabla")

let arrayPrecioFinal = []
let precioTotal = 0
let id = 0
let arrayProductos = []

//Esta funcion crea las filas de la tabla
//La primer fila es el nombre del producto
//La segunda es la cantidad, despues se le pone el valor
//La tercera fila es el precio individual
//La cuarta fila es el precio total, despues se le pone el valor
//La quinta es el boton que borra la fila
//La sexta es el input que sirve para mostrar la cantidad, guarda un id que se va aumentando y tiene como maximo el stock del producto
function crearTablaCarrito(producto) {
  id = id + 1
  arrayProductos.push({
    id: id,
    precioTotalProducto: producto.precio
  })
  return `
    <tr class="bg-white">
        <td class="border border-black producto h-10">${producto.producto}</td>
        <td class="border border-black cantidad h-10">1</td>
        <td class="border border-black precioIndividual h-10">${producto.precio}</td>
        <td class="border border-black precioTotal h-10">${producto.precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</td>
        <td class="w-2 bg-orange-100"><input class="inputCantidad text-center h-10 w-4 " id="${id}" type="number" min="0" max=${producto.disponibles} placeholder="1" value="1"></td>
        <td class="w-2 bg-orange-100"><button class="flex justify-center"><i class="fa-solid fa-trash botonCarrito opacity-0" data-id=${producto._id}></i></button></td>
    </tr>`
}



//Crea la fila del precio final sin ningun valor
function filaPrecioTotal(precio) {
  return `
    <tr>
        <th class="border border-black text-left bg-orange-300" colspan="3">Precio Final</td>
        <td class="border border-black bg-white" id="precioFinal">${precio}</td>
    </tr>
    `
}
//Guardo los productos que estan en localStorage en productosCarrito
let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
if (productosCarrito.length > 0) {

  //Creo el string con las filas de los productos y la fila del precio final
  let stringProductosCarrito = productosCarrito.map(a => crearTablaCarrito(a)).join(" ")
  //Le hago innerHTML a las strings de antes para imprimir en pantalla los datos
  $tablaCarrito.innerHTML += stringProductosCarrito
  let precioFinalPosta = 0

  for (let a of arrayProductos) {
    precioFinalPosta = precioFinalPosta + a.precioTotalProducto
  }


let stringPrecioFinal = filaPrecioTotal(precioFinalPosta.toLocaleString("es-AR", {style: "currency", currency: "ARS"}))
  $tablaCarrito.innerHTML += stringPrecioFinal
  let carrito = crearPago(precioFinalPosta.toLocaleString("es-AR", {style: "currency", currency: "ARS"}))
  $carritoAside.innerHTML = carrito
  function compraRealizada() {
    let $botonCompra = document.getElementById("compra")
    $botonCompra.addEventListener("click", e => {
      if (precioFinalPosta > 0) {
        Swal.fire({
          title: "Seguro quieres realizar la compra?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Pago realizado",
              text: "Su compra se ha realizado con éxito!",
              icon: "success"
            });
            productosCarrito = []
            localStorage.setItem('carrito', JSON.stringify(productosCarrito))
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
            $mainCarrito.innerHTML += articuloPeliculaVacio("Pago realizado", "Seguir comprando")
          }
        })
      }
      else {
        Swal.fire("Debes comprar al menos un artículo");
      }
    })

  }
  compraRealizada()

  //  ------------------------------   ACA ARRANCA EL KILOMBASO   ------------------------------

  //Vuelvo el valor del id a 1, creo un array vacio, precioFinalPosta y precioAuxiliar
  id = 1
  let precioAuxiliar = 0

  //Selecciono todos los input que tengan la clase "inputCantidad" (Todos los input que hay)
  let $inputCantidad = document.querySelectorAll(".inputCantidad")

  //Por cada input, pusheo un objeto que tenga: 
  // 1)  El id que cree arriba y se va incrementando
  // 2)  El precio total del producto
  //También por cada input le agrego un eventListener
  for (let cantidad of $inputCantidad) {
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
      //Selecciono el boton
      let $boton = cantidad.parentElement.parentElement.querySelector(".botonCarrito")
      let $botonClases = $boton.classList
      //Si cantidad es igual a 0 lo muestra, sino no
      if (cantidadPrueba == 0) {
        $botonClases.remove("opacity-0")
      } else {
        $botonClases.add("opacity-0")
      }
      //Precio total = individual * cantidad y lo guardo en la tabla en su columna
      precioTotal = $precioIndividual * cantidadPrueba
      $precioHTML.innerHTML = precioTotal.toLocaleString("es-AR", {style: "currency", currency: "ARS"})
      //Seleccion el precio final
      let $precioFinal = document.getElementById("precioFinal")
      //Uso el arrayProductos que creaba un objeto por cada input
      //El objeto que coincida su id con el del input (que lo guarde cuando cree la tabla) le cambia el valor de precioTotalProducto al de precioTotal
      for (let a of arrayProductos) {
        if (a.id == cantidad.id) {
          a.precioTotalProducto = precioTotal
        }

      }
      //Crea un array con el precioTotalProducto de todos los objetos
      precioAuxiliar = arrayProductos.map(a => Number(a.precioTotalProducto))
      precioFinalPosta = 0
      //Aca sumo los valores del array precioAuxiliar y despues lo imprimo en la pantalla
      for (let a of precioAuxiliar) {
        precioFinalPosta = precioFinalPosta + a
      }
      $precioFinal.innerHTML = precioFinalPosta.toLocaleString("es-AR", {style: "currency", currency: "ARS"})
      carrito = crearPago(precioFinalPosta.toLocaleString("es-AR", {style: "currency", currency: "ARS"}))
      $carritoAside.innerHTML = carrito
      compraRealizada()
    })

  }

  //  ------------------------------   Esto es lo mismo que cuando hicimos lo de la pagina favs de movies para borrarlos de ahi   ------------------------------


  let $botonesBorrar = document.querySelectorAll(".botonCarrito")
  for (let boton of $botonesBorrar) {
    boton.addEventListener("click", (e) => {
      let dataset = e.target.dataset
      let $cantidad = boton.parentElement.parentElement.parentElement.querySelector(".cantidad")
      $cantidad = $cantidad.textContent
      let productoBoton = productosCarrito.find(a => a._id == dataset.id)
      if ($cantidad == 0) {
        productoBoton.botonCarrito = !productoBoton.botonCarrito
        productosCarrito = productosCarrito.filter(a => a._id != productoBoton._id)
        localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        if (productosCarrito.length == 0) {
          boton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
          $mainCarrito.innerHTML += articuloPeliculaVacio("No hay articulos en el carrito", "Ir a la tienda")
        } else {
          boton.parentElement.parentElement.parentElement.remove()
        }
      }
    })


  }
} else {
  $tablaCarrito.remove()
  $divTabla.remove()
  $mainCarrito.innerHTML += articuloPeliculaVacio("No hay articulos en el carrito", "Ir a la tienda")

}


function crearPago(precio) {
  return `
<div class="container">
<div class="card cart">
  <label class="title">PAGO</label>
  <div class="steps">
    <div class="step">
      <div>
        <span>RETIRO EN SUCURSAL</span>
        <p>Paraguay 2334 5 F</p>
        <p>Buenos Aires, Argentina</p>
      </div>
      <hr>
      <div>
        <span>METODO DE PAGO</span>
        <p>Visa</p>
        <p>**** **** **** 4243</p>
      </div>
      <hr>

    </div>
  </div>
</div>
<div class="card checkout">
  <div class="footer">
    <label class="price">${precio}</label>
    <button class="checkout-btn" id="compra">COMPRAR</button>
  </div>
</div>
</div>`}

function articuloPeliculaVacio(mensaje, mensaje2) {
  return `
  <a href="./index.html" class="mt-10 w-full mb-[250px] md:mb-[400px] lg:items-center lg:min-w-[350px] lg:mb-5 flex justify-center lg:mt-0">
  <article class="min-h-[150px] bg-[#ff7100] flex flex-col text-white w-full rounded-2xl md:w-3/5 lg:hover:bg-orange-400">
    <h1 class="text-3xl font-bold p-3 text-center">${mensaje}</h1>
    <h1 class="text-3xl font-bold p-3 text-center">${mensaje2}</h1>
  </article>
  </a>
  `
}