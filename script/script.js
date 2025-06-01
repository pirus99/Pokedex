async function renderPokemon() {
 await getPokemons();
  if (Array.isArray(apiPokemons)) {
    for (let i = 0; i < apiPokemons.length; i++) {
      await getPokemonData(apiPokemons[i].url);
      renderCard(apiPokemons[i].name, i);
      renderColors(i);
    }
    offset += limit;
  } else {
    console.error("apiPokemons is not an array");
  }
  console.log(apiPokemonData);
}

async function renderCard(name, i) {
  let cardWrap = document.getElementById("cardWrap");
  cardWrap.innerHTML += cardTemplate(name, i);
}

function renderColors(i) {    
  const colorContainer = document.getElementById(`pkmImgCont${i}`);
  colorContainer.style = colorTemplate();
}

renderPokemon();
