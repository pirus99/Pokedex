async function displayPokemons(offset, limit) {
    try {
        await getPokemons(offset, limit)
    } catch {
        console.log('Error fetching data');
        return;
    }
    let cardWrap = document.getElementById('cardWrap');
    cardWrap.innerHTML = '';
    for (let i = 0; i < apiPokemons.results.length; i++) {
        let pokemonCard = pokemonCardWrapTemplate(i);
        cardWrap.innerHTML += pokemonCard;
    }
}

