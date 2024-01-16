const $checkbox = document.getElementById( 'checkbox' )

fetch( "https://moviestack.onrender.com/api/petshop" )
.then( response => response.json( ) )
.then( data => {
    const productsArray = data

    $checkbox.addEventListener( "input", () => {
        const filtrados = filtroPorCategoria(productsArray)
    
        console.log( filtrados )
    })
    
} )
.catch( err => console.log( err ) )


const filtroPorCategoria = ( productos ) => {
    const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(input => input.value)
    
    if (seleccionados.length == 0) {
        return productos
    }
    const productosFiltrados = productos.filter( producto => seleccionados.includes( producto.categoria ) )

    return productosFiltrados
}