const menu = document.querySelector('.menu')
const abrirMenu = document.querySelector('.abrir-menu')

function toggleMenu (){
    menu.classList.toggle("menuAbrir")
}

abrirMenu.addEventListener("click", toggleMenu);