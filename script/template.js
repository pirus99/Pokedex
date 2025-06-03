function cardTemplate(name) {
    return `
        <div onclick="openWindow(${apiPokemonData.id})"  id="card${apiPokemonData.id}" class="pkm-card" style="display: none;">
            <div class="flex space-between mt-1">
                <div class="flex">
                    <h4 class="pkm-title">${name}</h4>
                </div>
                <div class="flex">
                    <h5 class="mr-8px mt-1">${apiPokemonData.stats[0].base_stat}HP</h5>
                    ${apiPokemonData.types.map(typeObj => `
                        <img class="type-round" src="${address}pokedex/assets/icons/${typeObj.type.name}.svg" alt="${typeObj.type.name}" title="${typeObj.type.name}">
                        `).join('')}
                </div>
            </div>

            <div class="row flex space-between pkm-img-cont" id="pkmImgCont${apiPokemonData.id}">
                <img class="pkm-img" src="${address}pokedex/assets/${String(apiPokemonData.id).padStart(3, '0')}.png" alt="${name}">
                <h6 class="text-center mt-1">#${String(apiPokemonData.id).padStart(3, '0')}</h6>
            </div>
        </div>
    `;

}

function colorTemplate() {
  let color = [];
  const colors = [
    "normal:#828282",
    "fighting:#e49021",
    "flying:#7eb0d1",
    "poison:#9354cb",
    "ground:#a4733c",
    "rock:#a9a481",
    "bug:#9f9f28",
    "ghost:#6f4570",
    "steel:#74b0cb",
    "fire:#e4613e",
    "water:#3099e1",
    "grass:#449838",
    "electric:#dfbc28",
    "psychic:#e96c8c",
    "ice:#47c8c8",
    "dragon:#576fbc",
    "dark:rgb(48, 45, 45)",
    "fairy:#e18ce1",
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

function buttonTemplate() {
  return `
    <button id="prvsButton" onclick="renderPokemon('${prvsSiteUrl}', true)" class="btn btn-primary">Previous</button>
    <button id="nextButton" onclick="renderPokemon('${nextSiteUrl}', false)" class="btn btn-primary">Next</button>
  `;
}

function limitTemplate() {
  return `

    <div class="mb-3 flex align-items-center">
        <label for="limit" class="form-label">Pokemon per Page:</label>
        <input type="number" class="form-control-sm" id="limit" value="${limit}" >
    </div>
    <div class="mb-3 flex align-items-center">
        <label for="offset" class="form-label">First Pokemon:</label>
        <input type="number" class="form-control-sm" id="offset" value="${offset - limit + 1}">
    </div>
    <button onclick="setVariables()" class="btn btn-primary btn-sm">Set Filters</button>
  `;
}

function bigCardTemplate(id) {
  return `
        <div id="bigCardModal" class="bigPkm-card">
            <div class="flex space-between mt-1">
                <div class="flex">
                    <h4 class="pkm-title">${apiPokemonData.name}</h4>
                </div>
                <div class="flex">
                    <h5 class="mr-8px mt-1">${apiPokemonData.stats[0].base_stat}HP</h5>
                    ${apiPokemonData.types.map(typeObj => `
                        <img class="type-cubic" src="${address}pokedex/assets/icons-normal/${typeObj.type.name}.png" alt="${typeObj.type.name}" title="${typeObj.type.name}">
                        `).join('')}
                </div>
            </div>

            <div class="row flex space-between pkm-img-cont" id="pkmImgCont${apiPokemonData.id}">
                <img class="pkm-img" src="${address}pokedex/assets/${String(apiPokemonData.id).padStart(3, '0')}.png" alt="${name}">
                <h6 class="text-center mt-1">#${String(apiPokemonData.id).padStart(3, '0')}</h6>
            </div>
            <div class="row flex space-evenly pkm-stats-cont">
                <nav class="bigCardNav" id="bigCardNav">
                    <button id="aboutBtn" onclick="renderInfo('about', '${id}')">About</button>
                    <button id="statsBtn" onclick="renderInfo('stats', '${id}')">Stats</button>
                    <button id="evolutionBtn" onclick="renderInfo('evolution', '${id}')">Evolution</button>
                    <button id="movesBtn" onclick="renderInfo('moves', '${id}')">Moves</button>
                </nav>
            <div id="infoWrap" class="flex">
            </div>  
            </div>          
        </div>
    `;
}

function aboutTemplate(id) {
   return `
        <h2>About ${apiPokemonData.name}</h2>

        `;
      }

