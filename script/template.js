function cardTemplate(name, i) {
    return `
        <div class="pkm-card">
            <div onclick="openWindow()" class="flex space-between mt-1">
                <div class="flex">
                    <h5 class="mr-8px mt-1">#${apiPokemonData.id}</h5><h4>${name}</h4>
                </div>
                <div class="flex">
                    <h5 class="mr-8px mt-1">${apiPokemonData.stats[0].base_stat}HP</h5>
                    ${apiPokemonData.types.map(typeObj => `
                        <img class="type-round" src="./artwork/icons/${typeObj.type.name}.svg" alt="${typeObj.type.name}">
                        `).join('')}
                </div>
            </div>

            <div class="row flex space-between pkm-img-cont" id="pkmImgCont${i}">
                <img class="pkm-img" src="./artwork/${String(apiPokemonData.id).padStart(3, '0')}.png" alt="${name}">
                <h6 class="text-center mt-1">#${String(apiPokemonData.id).padStart(3, '0')}</h6>
            </div>
        </div>
    `;

}

function colorTemplate() {
  let color = [];
  const colors = [
    "normal:#808080",
    "fighting:#e49021",
    "flying:#BDF7FF",
    "poison:#9354cb",
    "ground:#D3D3D3",
    "rock:#B3B3B3",
    "bug:#A3E23D",
    "ghost:#7351ED",
    "steel:#B3B3B3",
    "fire:#FF4500",
    "water:#3099e1",
    "grass:#449838",
    "electric:#F9E76C",
    "psychic:#e96c8c",
    "ice:#ADD8E6",
    "dragon:#8350D9",
    "dark:rgb(48, 45, 45)",
    "fairy:rgb(237, 150, 240)",
  ];
  for (let j = 0; j < colors.length; j++) {
    for (let t = 0; t < apiPokemonData.types.length; t++) {
      if (apiPokemonData.types[t].type.name === colors[j].split(":")[0]) {
        color.push(`${colors[j].split(":")[1]}`);
    } else {
      continue;
    }
  }
}
  if (color.length === 1) {
    return `background-color: ${color[0]}`;
  } else {
  return `background: linear-gradient(to top left, ${color[0]} 50%, ${color[1]} 50%);`;
  }
}

