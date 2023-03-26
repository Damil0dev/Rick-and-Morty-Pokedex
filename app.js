/* ARRAY DONDE ESTAN TODOS LOS PERSONAJES */
let allCharacters = []

/* LLAMADA A LA API Y LLENADO DEL ARRAY ANTES MENCIONADO */
async function getCharacters() {
  let response = await fetch('https://rickandmortyapi.com/api/character')
  let data = await response.json()
  allCharacters.push(...data.results)

  let totalPages = data.info.pages
  for (let i = 2; i <= totalPages; i++) {
    response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
    data = await response.json()
    allCharacters.push(...data.results)
  }
}

/* FUNCION QUE CREA LAS TARJETAS, TOMA COMO PARAMETRO: LA FUENTE DE DONDE EXTRAERÁ LOS PERSONAJES 
QUE USARA EN LAS TARJETAS, LA CANTIDAD DE TARJETAS QUE CREARA Y SI DEBE SER ALEATORIO*/
function createCards(sourceFromCharacters, cuantity, actualIndex) {
  const cardsContainer = document.getElementById("cards-container")
  cardsContainer.removeAllChilds

  for (let i = 0; i < cuantity; i++) {
    const character = sourceFromCharacters[actualIndex];
    actualIndex++
    const card = document.createElement("div")

    card.classList.add('card')

    if (character.status == "Alive") {class_status = "card__status--alive"} 
    else if (character.status == "Dead") {class_status = "card__status--dead"}
    else {class_status = "card__status--unknown"}

    card.innerHTML = `
        <img class="card__img" src="${character.image}" alt="">
        <div>
            <h2 class="card__name">${character.name}</h2>
            <h3 class="${class_status}">${character.status}</h3>
        </div>
        <hr>
        <h3 class="card__species">${character.species}</h3>
        <h3 class="card__gender">${character.gender}</h3>
        <h3 class="card__origin">${character.origin.name}</h3>
    `;
    cardsContainer.appendChild(card);
  }
}

  /* FUNCION PARA BORRAR LAS TARJETAS ANTERIORES */
  function removeAllChilds()
  {
    const cardsContainer = document.getElementById("cards-container")
    while(cardsContainer.hasChildNodes())
    cardsContainer.removeChild(cardsContainer.firstChild);	
  }

/* CREACION DE TARJETAS INICIALES COMO EJEMPLO, EN ESTE CASO ESTAN ALEATORIZADAS */
async function example() {
  await getCharacters()

  let i = 0
  do {
    let randomNum = Math.floor(Math.random() * allCharacters.length)
    createCards(allCharacters, 1, randomNum)
    i++
  } while (i < 20);

}
example()

/* FUNCION DE BUSQUEDA */
let filteredCharacters = []
let searchForm = document.getElementById("search-form")
let searchInput = document.getElementById("search-bar")
let searchButton = document.getElementById("search-button")

function search(filter) {
  filteredCharacters = []
  allCharacters.forEach(element => {
    const term = filter.toLowerCase()
    const name = element.name.toLowerCase()
    const termLowerCase = term.toLowerCase()
    if (name.includes(termLowerCase)) {
      filteredCharacters.push(element)
    }
  })
  return filteredCharacters
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  search(searchInput.value)
  removeAllChilds()
  createCards(filteredCharacters, filteredCharacters.length, 0)
})