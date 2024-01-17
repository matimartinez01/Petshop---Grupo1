const queryParams = new URLSearchParams(location.search)

const id = queryParams.get("id")

const detalleProducto = document.getElementById("contDetalle")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {
        const productoDetalle = data.find(product => product.id == data._id)
        console.log(productoDetalle)

        detalleProducto.innerHTML = `
            <div class="flex flex-wrap">
                <article class="w-3/6">
                    <img src="${productoDetalle.imagen}" alt="imagen del producto" class="object-contain">
                </article>
                <article class="flex flex-col gap-4 w-3/6 px-4">
                    <h1 class="font-semibold text-lg">${productoDetalle.producto}</h1>
                    <h2 class="text-neutral-500 text-lg">${productoDetalle.categoria}</h2>
                    <p class="text-justify">${productoDetalle.descripcion}</p>
                    <p class="text-xl font-semibold">$${productoDetalle.precio}</p>
                    <div class="w-[85px] flex justify-center p-2 bg-green-600 rounded-xl text-green-100 font-medium hover:opacity-80 cursor-pointer hover:bg-green-700">Comprar</div>
                </article>
            </div>        
        `
    })

    .catch (err => console.log(err))