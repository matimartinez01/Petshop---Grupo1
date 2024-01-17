const contenedorProducts = document.getElementById("contProducts")

fetch("https://moviestack.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        function recorrerProdructs (array) {
            let cardProduct=""
            for (const producto of array) {
                cardProduct+= crearCardProducto(producto)
            }
            return cardProduct
        }

        function crearCardProducto(producto){
            return`
            <div class="flex flex-col h-[380px] w-[280px] bg-white rounded-lg p-2 shadow-2xl">
                <img src="${producto.imagen}" alt="imagen del producto" class="h-[180px] object-contain">
                <h1 class="font-semibold px-1.5 text-lg h-[60px] grow text-center py-1">${producto.producto}</h1>
                <div class="flex flex-col justify-between gap-1.5">
                    <h2 class="px-1.5 text-neutral-500 text-lg">${producto.categoria}</h2>
                    <p class="px-1.5 text-xl font-semibold">$${producto.precio}</p>
                    <div class="flex justify-between p-1.5">
                        <a href="detail.html?id=${producto._id}" class="w-[85px] flex justify-center bg-purple-600 text-purple-100 p-2 rounded-xl font-medium hover:bg-purple-700">Detalle</a>
                        <div class="w-[85px] flex justify-center p-2 bg-green-600 rounded-xl text-green-100 font-medium hover:opacity-80 cursor-pointer hover:bg-green-700">Comprar</div>
                    </div>
                </div>
            </div>
            `
        }

        contenedorProducts.innerHTML = recorrerProdructs(data)

    })
    .catch(err => console.log(err))

