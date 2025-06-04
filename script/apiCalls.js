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

async function getPokemons(url) {
  console.log(url);
  if (!url || url == null || url == undefined || url == "null") {
    url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  }
  if (offset || limit || (offset && limit)) {
    const response = await fetch(url);
    const pokemons = await response.json();
    nextSiteUrl = pokemons.next;
    prvsSiteUrl = pokemons.previous;
    apiPokemons = pokemons.results;
  } else {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const pokemons = await response.json();
    apiPokemons = pokemons.results;
  }
  console.log(apiPokemons);
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
  console.log(apiPokemonSpeciesData);
}

async function getEvolutionPkm(url) {
  const response = await fetch(url);
  const pokemonSpecies = await response.json();
  apiPokemonEvolutionData = pokemonSpecies;
  console.log(apiPokemonEvolutionData);
}

async function getEvolutionChainPkms() {
  chainBase = [];
  chainBaseUrl = [];
  chainL1 = [];
  chainUrlsL1 = [];
  chainL2 = [];
  chainUrlsL2 = [];
  mapChains();
  types = [];
  resp = await fetch(chainBaseUrl);
  chainBase = await resp.json();
  await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${chainBase.id}`);
  types.push(apiPokemonData.types);
  for (let i = 0; i < chainUrlsL1.length; i++) {
    response = await fetch(chainUrlsL1[i]);
    data = await response.json();
    await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    types.push(apiPokemonData.types);
    chainL1.push(data);
  }
  for (let i = 0; i < chainUrlsL2.length; i++) {
    response = await fetch(chainUrlsL2[i]);
    data = await response.json();
    await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    types.push(apiPokemonData.types);
    chainL2.push(data);
  }
  renderEvoChainElements();
}
