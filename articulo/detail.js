const queryParams = new URLSearchParams(location.search)

const id = queryParams.get("id")

const detalleProducto = document.getElementById("contDetalle")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {

        const productoDetalle = data.find(product => product.id == data._id)

        const ultimasUnidades = productoDetalle.disponibles <= 5 ? 'Ultimas 5 unidades restantes' : ""
        
        detalleProducto.innerHTML = `
            <div class="flex flex-wrap h-3/6">
                <article class="w-3/6">
                    <img src="${productoDetalle.imagen}" alt="imagen del producto" class="object-contain">
                </article>
                <article class="flex flex-col gap-4 w-3/6 px-5">
                    <h1 class="font-semibold text-lg">${productoDetalle.producto}</h1>
                    <h2 class="text-neutral-500 text-lg">${productoDetalle.categoria}</h2>
                    <p class="text-justify">${productoDetalle.descripcion}</p>
                    <p class="text-xl font-semibold">${productoDetalle.precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</p>
                    <p class="text-xl font-semibold text-red-500">${ultimasUnidades}</p>
                    <a href="./index.html"><div class="text-blue-500 font-medium cursor-pointer text-lg hover:text-blue-400">Seguir comprando</div></a>
                </article>
            </div>        
        `
    })

    .catch (err => console.log(err))