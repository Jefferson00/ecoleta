// pega os elementos da página
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//evento de clique que abre o modal
buttonSearch.addEventListener("click", ()=>{
    modal.classList.remove("hide")
})

//evento de clique que fecha o modal
close.addEventListener("click", ()=>{
    modal.classList.add("hide")
})