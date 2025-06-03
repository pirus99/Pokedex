async function renderPokemon(siteUrl, subLimit) {
  // Ladeanzeige einblenden
  document.getElementById("loadingScreen").style.display = "flex";
    if (subLimit) {
      let sub = limit + limit;
      offset -= sub;
    }
  buttonCheck();
  await getPokemons(siteUrl);

  if (Array.isArray(apiPokemons)) {
    document.getElementById("cardWrap").innerHTML = "";
    displayedPokemon = [];
    for (let i = 0; i < apiPokemons.length; i++) {
      await getPokemonData(apiPokemons[i].url);
      displayedPokemon.push(apiPokemonData.id);
      renderCard(apiPokemons[i].name);
      renderColors(i);
    }
    offset += limit;
  } else {
    console.error("apiPokemons is not an array");
  }
  // Ladeanzeige ausblenden
  document.getElementById("loadingScreen").style.display = "none";
  displayPokemons();
  init();

  console.log(apiPokemonData);
}

function init() {
  renderButtons();
  renderLimit();
}

function buttonCheck() {
    if (offset >= 1301){
        offset = 0;
    } else if (offset < 0){
        offset = 1302 - limit;
  }
}

function displayPokemons() {
  for (let id of displayedPokemon) {
    document.getElementById(`card${id}`).style.display = "block";
  }
}

async function renderCard(name) {
  const cardWrap = document.getElementById("cardWrap");
  // Nur das neue Template einfügen, ohne den DOM komplett zu ersetzen
  cardWrap.innerHTML += cardTemplate(name);
}

function renderColors() {
  const colorContainer = document.getElementById(`pkmImgCont${apiPokemonData.id}`);
  colorContainer.style = colorTemplate();
}

function renderButtons() {
  const buttonWrap = document.getElementById("buttonWrap")
  buttonWrap.innerHTML = buttonTemplate();
}

function renderLimit() {
  const limitWrap = document.getElementById("limitWrap");
  limitWrap.innerHTML = limitTemplate();
}

function setVariables() {
  offset = parseFloat(document.getElementById('offset').value) - 1;
  limit = parseFloat(document.getElementById('limit').value);
  renderPokemon();
}

async function openWindow(id) {
  const bigCard = document.getElementById('bigCard');
  bigCard.style.display = "flex";
  await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`)
  renderBigCard(id);
  renderInfo(0, id);
  renderColors();
}

function renderBigCard(id) {
  const bigCard = document.getElementById("bigCard")
  bigCard.innerHTML = bigCardTemplate(id);
}

async function renderInfo(site, id) {
  btnMan();
  const infoWrap = document.getElementById('infoWrap');
  if (site === 'stats') {
    infoWrap.innerHTML = statsTemplate(id);
    btnMan('stats');
  } else if (site === 'evolution') {
    infoWrap.innerHTML = evolutionTemplate(id);
    btnMan('evolution');
  } else if (site === 'moves') {
    infoWrap.innerHTML = movesTemplate(id);
    btnMan('moves');
  } else {
    await getAboutPkm(id)
    infoWrap.innerHTML = aboutTemplate(id);
    btnMan('about');
  }
}

function btnMan(button) { //Manages Buttons like a Pro
  if (!button) {
    const btns = document.querySelectorAll('.bigCardNav button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('activeBtn');
    }
  } else {
    const actButton = document.getElementById(button + 'Btn');
    actButton.classList.add('activeBtn');
  }
}

renderPokemon();
