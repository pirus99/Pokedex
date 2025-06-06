(async () => {
  await loadFromLoacalstorage();
  renderPokemon();
})();

async function renderPokemon(subLimit) {
  beforeRender(subLimit);
  getPokemons();
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
  afterRender();
}

function renderPokemonAgain() {
  offset -= limit;
  renderPokemon();
}

function beforeRender(subLimit) {
  // Ladeanzeige einblenden
  saveOffset();
  document.getElementById('buttonWrap').style.display = "none";
  document.getElementById('searchWordWrap').style.display = "none";
  document.getElementById("loadingScreen").style.display = "flex";
  document.getElementById('limitWrap').style.display = "flex";
  if (subLimit) {
    offset -= limit * 2;
    saveOffset();
  }
  buttonCheck();
}

function afterRender() {
  document.getElementById("loadingScreen").style.display = "none";
  renderButtons();
  displayPokemons();
  init();
}

async function showAlert(message) {
  const alertWrap = document.getElementById("alertWrap");
  alertWrap.style.display = "block";
  alertWrap.innerHTML = `${message}`;
  await new Promise(resolve => setTimeout(resolve, 3800));
  alertWrap.style.display = "none";
}

function filterPokemons() {
  const searchInput = document.getElementById('searchInput').value;
  if(searchInput.length > 2){
    apiPokemons = apiPokemonsFull.filter(pokemon => pokemon.name.includes(searchInput));
    search = searchInput;
    if(apiPokemons.length > 0){
      renderPokemonSearch();
    } else {
      beforeSearch();
      document.getElementById('cardWrap').innerHTML = noPkmsFoundTemplate();
      afterSearch();
    }
  }
}

function beforeSearch(){
  document.getElementById("cardWrap").innerHTML = "";
  document.getElementById('buttonWrap').style.display = "none";
  document.getElementById('limitWrap').style.display = "none";
  document.getElementById('searchWordWrap').style.display = "flex";
  document.getElementById("loadingScreen").style.display = "flex";
  searchRender();
  displayedPokemon = [];
}

async function renderPokemonSearch() {
  beforeSearch()
  for (let i = 0; i < apiPokemons.length; i++) {
  await getPokemonData(apiPokemons[i].url);
  displayedPokemon.push(apiPokemonData.id);
  renderCard(apiPokemons[i].name);
  renderColors(i);
  }
  afterSearch();
  displayPokemons();
}

function afterSearch() {
  document.getElementById("loadingScreen").style.display = "none";
}

function searchRender() {
  document.getElementById('searchWordWrap').innerHTML = searchTemplate();
}

function init() {
  renderButtons();
  renderLimit();
}

function buttonCheck() {
  if (offset >= 1025) {
    offset = 0;
  } else if (offset < 0) {
    offset = 1025 - limit;
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
  colorContainer.style = colorPicker();
}

function renderColorsEvo(id, i) {
  const colorContainer = document.getElementById(`pkmEvoCard${id}`);
  colorContainer.style = colorPicker(true, i);
}

function renderButtons() {
  document.getElementById('buttonWrap').style.display = "flex";
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
  saveOffset();
  renderPokemon();
}

function saveOffset() {
  localStorage.setItem('offset', offset);
  localStorage.setItem('limit', limit);
}

function colorPicker(call, i) {
  color = [];
  if (!call) {
    pickColors();
  } else {
    pickColorsEvo(i);
  } 
  if (color.length === 1) {
    return `background-color: ${color[0]}`;
  } else {
    return `background: linear-gradient(to top left, ${color[0]} 50%, ${color[1]} 50%);`;
  }
}

function pickColors() {
  for (let j = 0; j < colors.length; j++) {
    for (let t = 0; t < apiPokemonData.types.length; t++) {
      if (apiPokemonData.types[t].type.name === colors[j].split(":")[0]) {
        color.push(`${colors[j].split(":")[1]}`);
      } else {
        continue;
      }
    }
  }
}

function pickColorsEvo(i) {
  for (let j = 0; j < colors.length; j++) {
    for (let t = 0; t < types[i].length; t++) {
      if (types[i][t].type.name === colors[j].split(":")[0]) {
        color.push(`${colors[j].split(":")[1]}`);
      } else {
        continue;
      }
    }
  }
}

async function openWindow(id) {
  if (id == 0) {
    id = 1025
  } else if (id == 1026) {
    id = 1
  }
  const bigCard = document.getElementById('bigCard');
  document.body.classList.add
  bigCard.style.display = "flex";
  bigCard.innerHTML = loadingSpinner();
  document.body.classList.add('no-scroll');
  await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`)
  renderBigCard(id);
  document.getElementById('loadingScreenBigCard').style.display = "flex";
  renderInfo(0, id);
  renderColors();
}

function renderBigCard(id) {
  const bigCard = document.getElementById("bigCard")
  bigCard.innerHTML = bigCardTemplate(id);
}

async function renderInfo(site, id) {
  const infoWrap = document.getElementById('infoWrap');
  await beforeRenderInfo(id);
  if (site === 'stats') {
    infoWrap.innerHTML = statsTemplate(id);
    pbMan();
    btnMan('stats');
  } else if (site === 'evolution') {
    infoWrap.innerHTML = evolutionTemplate(id);
    await getEvolutionChainPkms();
    btnMan('evolution');
  } else {
    infoWrap.innerHTML = aboutTemplate(id);
    btnMan('about');
  }
  document.getElementById('loadingScreenInfo').style.display = "none";
}

 async function beforeRenderInfo(id){
  btnMan();
  document.getElementById('loadingScreenInfo').style.display = "flex";
  document.getElementById('loadingScreenBigCard').style.display = "none";
  await getAboutPkm(id)
  await getEvolutionPkm(apiPokemonSpeciesData.evolution_chain.url);
}

function btnMan(button) { //Manages Buttons like a Pro
  if (!button) {
    const btns = document.querySelectorAll('.bigCardNav button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('activeBtn');
      btns[i].classList.remove('active')
    }
  } else {
    const actButton = document.getElementById(button + 'Btn');
    actButton.classList.add('activeBtn');
    actButton.classList.add('active')
  }
}

function pbMan() {   //Manages Progress-Bars like a Pro
  const progressBars = document.querySelectorAll('.progress-bar');
  const thresholds = [32, 62, 88];
  const colors = ['bg-success', 'bg-warning', 'bg-danger'];
  progressBars.forEach(bar => {
    const value = parseInt(bar.getAttribute('aria-valuenow'));
    let colorIndex = 0;
    if (value >= thresholds[2]) {
      colorIndex = 2;
    } else if (value >= thresholds[1]) {
      colorIndex = 1;
    }
    bar.classList.add(colors[colorIndex]);
  });
}

function capitalize(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
}

function closeBigCard() {
  document.getElementById('bigCard').style.display = 'none';
  document.body.classList.remove('no-scroll');
}

document.addEventListener('click', function (event) {
  const bigCard = document.getElementById('bigCard');
  const bigCardModal = document.getElementById('bigCardModal');
  if (event.target == bigCard && !bigCardModal.contains(event.target)) {
    closeBigCard();
  }
});

function mapChains() {
  if (apiPokemonEvolutionData && apiPokemonEvolutionData.chain) {
    chainBaseUrl.push(apiPokemonEvolutionData.chain.species.url);
    const firstEvolutions = apiPokemonEvolutionData.chain.evolves_to;
    if (Array.isArray(firstEvolutions)) {firstEvolutions.forEach(firstEvolution => {chainUrlsL1.push(firstEvolution.species.url);
        const secondEvolutions = firstEvolution.evolves_to;
        if (Array.isArray(secondEvolutions)) {secondEvolutions.forEach(secondEvolution => {chainUrlsL2.push(secondEvolution.species.url);
          });
        }
      });
    }
  } else {
    console.error("Invalid or missing data:", apiPokemonEvolutionData);
  }
}

function beforeRenderEvoChainElements() {
  const chainL1Wrap = document.getElementById('chainL1Wrap');
  const chainL2Wrap = document.getElementById('chainL2Wrap');
  const chainBaseWrap = document.getElementById('chainBaseWrap');
  chainL1Wrap.innerHTML = '';
  chainL2Wrap.innerHTML = '';
  chainBaseWrap.innerHTML = chainBaseTemplate();
  renderColorsEvo(chainBase.id, 0)
}

function renderEvoChainElements() {
  beforeRenderEvoChainElements()
  for (let i = 0; i < chainL1.length; i++) {
    chainL1Wrap.innerHTML += chainL1Template(i);
    renderColorsEvo(chainL1[i].id, i + 1);
  }
  for (let i = 0; i < chainL2.length; i++) {
    chainL2Wrap.innerHTML = chainL2Template(i);
    renderColorsEvo(chainL2[i].id, i + 1 + chainL1.length);
  }
}

async function loadFromLoacalstorage(){
  limitSaved = parseInt(localStorage.getItem('limit'))
  offsetSaved = parseInt(localStorage.getItem('offset'))
  apiPokemonsFullSaved = JSON.parse(localStorage.getItem('apiPokemonsFull'));
  if(limitSaved && offsetSaved){
    limit = limitSaved;
    offset = offsetSaved;
  }
  if(apiPokemonsFullSaved){
    apiPokemonsFull = apiPokemonsFullSaved
  } else {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`);
    const pokemons = await response.json();
    apiPokemonsFull = await pokemons.results;
    localStorage.setItem('apiPokemonsFull', JSON.stringify(apiPokemonsFull));
  }
}



