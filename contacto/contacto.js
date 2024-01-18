const $textoFormContacto = document.getElementById("textoFormContacto")


const $form = document.getElementById("form")



$form.addEventListener("submit", e => {
    e.preventDefault()
    console.log("enviado")
    $textoFormContacto.innerHTML = `<p class="font-semibold text-center text-l p-4 md:w-3/5">¡Gracias por contactarnos!
    Hemos recibido tu mensaje y nos emociona saber que estás pensando en el bienestar de tus mascotas. Nuestro equipo se pondrá manos a la obra para revisar tu solicitud y responder a la brevedad posible.
    Con cariño, el equipo de Grupone Pet.
    `
    e.target.reset()
})