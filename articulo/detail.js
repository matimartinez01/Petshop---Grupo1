const queryParams = new URLSearchParams(location.search)

const id = queryParams.get("id")

const detalleProducto = document.getElementById("contDetalle")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {

        const productoDetalle = data.find(product => product._id == id)
        console.log(productoDetalle)

        const ultimasUnidades = productoDetalle.disponibles <= 5 ? `Unidades restantes ${productoDetalle.disponibles}` : "";

        detalleProducto.innerHTML = `
            <div class="flex flex-wrap h-3/6">
                <article class="w-3/6">
                    <img src="${productoDetalle.imagen}" alt="imagen del producto" class="object-contain">
                </article>
                <article class="flex flex-col gap-4 w-3/6 px-5">
                    <h1 class="font-semibold text-lg">${productoDetalle.producto}</h1>
                    <h2 class="text-neutral-500 text-lg">${productoDetalle.categoria}</h2>
                    <p class="text-justify">${productoDetalle.descripcion}</p>
                    <p class="text-xl font-semibold">$${productoDetalle.precio}</p>
                    <p class="text-xl font-semibold text-red-500">${ultimasUnidades}</p>
                    <div class="w-[85px] flex justify-center p-2 bg-green-600 rounded-xl text-green-100 font-medium hover:opacity-80 cursor-pointer hover:bg-green-700">Comprar</div>
                </article>
            </div>        
        `
    })

    .catch (err => console.log(err))