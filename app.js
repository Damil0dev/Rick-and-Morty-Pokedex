// Llamada a la API
async function getCharacters() {
    const characters = [];
  
    let response = await fetch('https://rickandmortyapi.com/api/character');
    let data = await response.json();
  
    characters.push(...data.results);
  
    let totalPages = data.info.pages;
  
    for (let i = 2; i <= totalPages; i++) {
      response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
      data = await response.json();
      characters.push(...data.results);
    }
  
    return characters;
  }
  getCharacters()


//Creacion de cada tarjeta
.then(characters => {

const cardsContainer = document.getElementById('cards-container'); 
const firstI = Math.floor(Math.random() * characters.length - 10);

for (let i = firstI; i < firstI + 6; i++) {
    const character = characters[i];
    
    const card = document.createElement('div');
    card.classList.add('card');

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
})
.catch(error => console.error(error));