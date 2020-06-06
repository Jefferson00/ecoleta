//função que popula os estados no campo select do formulario
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf") 

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states =>{
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    }) 
}

populateUFs();

//função que popula as cidades no campo select do formulario
function getCities(event){
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex

    console.log(indexOfSelectedState)
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value> Selecione </option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities =>{
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

// a cada mudança no select de estados, executa a função getCities
document.querySelector("select[name=uf").addEventListener("change",getCities)

// itens de coleta
// pegar as LIs e adcionar um evento listener onde ao clicar ira adcionar uma classe selected

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


//itens selecionados

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //add ou remove classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    /*verificar se existem itens selecionados, se sim pega os itens selecionados*/

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    })

    /* se já estiver selecionado*/
    if(alreadySelected >= 0){
        //tira da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        //se não estiver selecionado adciona a seleção
        selectedItems.push(itemId)
    }

  //atualizar input hidden
    collectedItems.value = selectedItems
    
}