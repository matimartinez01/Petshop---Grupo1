const queryParams = new URLSearchParams(location.search)

const id = queryParams.get("id")
console.log(id)

const detalleProducto = document.getElementById("contDetalle")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {

        const productoDetalle = data.find(product => id == product._id)
        console.log(productoDetalle)
        const ultimasUnidades = productoDetalle.disponibles == 0 ? "SIN STOCK" : (productoDetalle.disponibles <= 5 ? "ULTIMAS UNIDADES" : "")
        detalleProducto.innerHTML = `
            <div class="flex flex-col items-center mt-5 lg:flex-row lg:justify-evenly">
                <article class="w-full lg:w-2/5">
                    <img src="${productoDetalle.imagen}" alt="imagen del producto" class="object-contain">
                </article>
                <article class="flex flex-col gap-2 w-full px-5 items-center lg:w-2/5 pb-4">
                    <h1 class="font-bold text-xl text-center">${productoDetalle.producto}</h1>
                    <h2 class="text-neutral-600 text-lg mb-5 italic font-semibold">${productoDetalle.categoria}</h2>
                    <p class="text-justify text-lg font-semibold ">${productoDetalle.descripcion}</p>
                    <p class="text-2xl font-bold">${productoDetalle.precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</p>
                    <p class="text-2xl font-bold text-red-600 text-center">${ultimasUnidades}</p>
                    <a href="./index.html"><div class="w-full flex justify-center bg-orange-400 p-2 rounded-xl font-medium hover:bg-orange-500">Seguir comprando</div></a>
                </article>
            </div>        
        `
    })

    .catch (err => console.log(err))

