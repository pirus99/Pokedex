let apiPokemonsFull = [];
let apiPokemons = [];
let apiPokemonData = 0;
let displayedPokemon = [];
let actualPokemon = 0;
let nextSiteUrl = "";
let prvsSiteUrl = "";
let offset = 0;
let limit = 40;
let apiPokemonSpeciesData = [];
let apiPokemonEvolutionData = [];
let chainBaseUrl = [];
let chainUrlsL1 = [];
let chainUrlsL2 = [];
let chainBase = [];
let chainL1 = [];
let chainL2 = [];
let types = [];
let color = [];
let search = "";

function getPokemons(page) {
  apiPokemons = [];
    for (let index = offset; index < (offset + limit); index++) {
      apiPokemons.push(apiPokemonsFull[index]);      
    }
}

async function getPokemonData(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data = await response.json();
  actualPokemon = data.id;
  apiPokemonData = data;
}

async function getAboutPkm(name) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
  const response = await fetch(url);
  const pokemonSpecies = await response.json();
  apiPokemonSpeciesData = pokemonSpecies;
}

async function getEvolutionPkm(url) {
  const response = await fetch(url);
  const pokemonSpecies = await response.json();
  apiPokemonEvolutionData = pokemonSpecies;
}

function clearEvolution() {
  chainBase = [];
  chainBaseUrl = [];
  chainL1 = [];
  chainUrlsL1 = [];
  chainL2 = [];
  chainUrlsL2 = [];
  mapChains();
  types = [];
}

async function evolutionBase() {
  resp = await fetch(chainBaseUrl);
  chainBase = await resp.json();
  await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${chainBase.id}`);
  types.push(apiPokemonData.types);
}

async function evolutionL1() {
    for (let i = 0; i < chainUrlsL1.length; i++) {
    response = await fetch(chainUrlsL1[i]);
    data = await response.json();
    await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    types.push(apiPokemonData.types);
    chainL1.push(data);
  }
}

async function evolutionL2() {
    for (let i = 0; i < chainUrlsL2.length; i++) {
    response = await fetch(chainUrlsL2[i]);
    data = await response.json();
    await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    types.push(apiPokemonData.types);
    chainL2.push(data);
  }
}

async function getEvolutionChainPkms() {
  clearEvolution();
  await evolutionBase();
  await evolutionL1();
  await evolutionL2();
  renderEvoChainElements();
}
