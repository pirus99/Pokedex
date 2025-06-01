let apiPokemons = [];
let apiPokemonData = 0;
let actualPokemon = 0;
let nextSiteUrl = 0;
let prvsSiteUrl = 0;
let offset = 60;
let limit = 10;

async function getPokemons() {
    if (offset || limit || offset && limit){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
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