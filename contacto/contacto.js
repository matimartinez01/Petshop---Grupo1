const $textoFormContacto = document.getElementById("textoFormContacto")

const $btnEnviar = document.getElementById("btnEnviar")


$btnEnviar.addEventListener("click", e => {
    e.preventDefault()
    console.log("enviado")
    $textoFormContacto.innerHTML = `<p class="font-semibold text-center text-l p-4">¡Gracias por contactarnos!
    Hemos recibido tu mensaje y nos emociona saber que estás pensando en el bienestar de tus mascotas. Nuestro equipo se pondrá manos a la obra para revisar tu solicitud y responder a la brevedad posible.
    Con cariño, el equipo de [Nombre de tu tienda]
    `
})