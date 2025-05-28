function pokemonCardWrapTemplate(i) {
    return `
    <div id="pokemon${apiPokemons.results[i].name}" class="col-md-6">${apiPokemons.results[i].name}</div>
    
    `;

}