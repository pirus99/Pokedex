let apiPokemons = [];
let apiPokemonData = 0;
let displayedPokemon = [];
let actualPokemon = 0;
let nextSiteUrl = "";
let prvsSiteUrl = "";
let offset = 120;
let limit = 40;

async function getPokemons(url) {
    console.log(url)
    if (!url || url == null || url == undefined || url == "null"){
        url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    }
    if (offset || limit || offset && limit){
    const response = await fetch(url);
    const pokemons = await response.json();
    nextSiteUrl = pokemons.next
    prvsSiteUrl = pokemons.previous
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
    actualPokemon = data.id
    apiPokemonData = (data)
}