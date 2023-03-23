// Llamada a la API de Rick and Morty
fetch('https://rickandmortyapi.com/api/character/')
  .then(response => response.json())
  .then(data => {
    // Creación de las tarjetas
    const cardsContainer = document.getElementById('cards-container');
    for (let i = 0; i < 6; i++) {
      const character = data.results[i];
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img class="card__img" src="${character.image}" alt="">
        <h2 class="card__name">${character.name}</h2>
        <h3 class="card__status--unknown">${character.status}</h3>
        <h3 class="card__species">${character.species}</h3>
        <h3 class="card__gender">${character.gender}</h3>
        <h3 class="card__origin">${character.origin.name}</h3>
      `;
      cardsContainer.appendChild(card);
    }
  })
  .catch(error => console.error(error));