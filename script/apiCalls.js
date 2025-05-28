let apiPokemons = 0;

async function getPokemons(offset, limit) {
    if (offset && limit){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const pokemons = await response.json();
    apiPokemons = pokemons;
    } else {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const pokemons = await response.json();
    apiPokemons = pokemons;
    }
    console.log(apiPokemons);   
}