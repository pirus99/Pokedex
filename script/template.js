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

function cardTemplate(name) {
  return `
        <div onclick="openWindow(${apiPokemonData.id})"  id="card${apiPokemonData.id}" class="pkm-card" style="display: none;">
            <div class="flex space-between title-wrap">
                <div class="flex">
                    <h4 class="pkm-title">${capitalize(name)}</h4>
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

function buttonTemplate() {
  return `
    <button id="prvsButton" onclick="renderPokemon('${prvsSiteUrl}', true)" class="btn btn-outline-primary btn-lg">&#129128;</button>
    <button id="nextButton" onclick="renderPokemon('${nextSiteUrl}', false)" class="btn btn-outline-primary btn-lg">&#129130;</button>
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
        <div id="bigCardModal" class="bigPkm-card overflow-y-auto overflow-x-hidden">
            <div class="flex space-between mt-2">
                <div class="flex">
                    <h4 class="pkm-title">${capitalize(apiPokemonData.name)}</h4>
                </div>
                <div class="flex type-sign-normal">
                    <h5 class="mr-8px mt-1">${apiPokemonData.stats[0].base_stat}HP</h5>
                    ${apiPokemonData.types.map(typeObj => `
                        <img class="type-cubic" src="${address}pokedex/assets/icons-normal/${typeObj.type.name}.png" alt="${typeObj.type.name}" title="${typeObj.type.name}">
                        `).join('')}
                </div>
                <div class="flex type-sign-round d-none">
                    <h5 class="mr-8px mt-1">${apiPokemonData.stats[0].base_stat}HP</h5>
                    ${apiPokemonData.types.map(typeObj => `
                        <img class="type-round" src="${address}pokedex/assets/icons/${typeObj.type.name}.svg" alt="${typeObj.type.name}" title="${typeObj.type.name}">
                        `).join('')}
                </div>
            </div>
            <div id="loadingScreenBigCard" class="loading-overlay justify-content-center align-items-center">
              <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="row flex space-between pkm-img-cont" id="pkmImgCont${apiPokemonData.id}">
                <img class="pkm-img" src="${address}pokedex/assets/${String(apiPokemonData.id).padStart(3, '0')}.png" alt="${apiPokemonData.name}">
                <div class="buttonDiv flex space-between">
                    <button class="arrowBtn" onclick="openWindow(${apiPokemonData.id - 1})">&#129128;</button>
                    <button class="arrowBtn" onclick="openWindow(${apiPokemonData.id + 1})">&#129130;</button>
                </div>
                <h6 class="text-center mt-1">#${String(apiPokemonData.id).padStart(3, '0')}</h6>
            </div>
            <div class="row flex space-evenly pkm-stats-cont">
                <div class="flex justify-content-between bigCardNav">
                  <nav id="bigCardNav">
                    <button id="aboutBtn" onclick="renderInfo('about', '${id}')" class="btn btn-secondary">About</button>
                    <button id="statsBtn" onclick="renderInfo('stats', '${id}')" class="btn btn-secondary">Stats</button>
                    <button id="evolutionBtn" onclick="renderInfo('evolution', '${id}')" class="btn btn-secondary">Evolution</button>
                  </nav>
                    <button class="btn btn-primary m-8 closeBtn hide-mobile" onclick="closeBigCard()">Close</button>
                </div>
            <div id="loadingScreenInfo" class="loading-overlay justify-content-center align-items-center">
              <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div id="infoWrap" class="flex">
            </div>  
          <button class="btn btn-primary center m-8 mb-3 mt-3 closeBtn d-none show-mobile w-70" onclick="closeBigCard()">Close</button>
        </div>
    `;
}

function loadingSpinner() {
  return ` <div id="loadingSpinner" class="loading-overlay justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;
}

function aboutTemplate(id) {
  return `
      <div class="container w-90"> 
        <h3>${(apiPokemonSpeciesData.genera[7] ? apiPokemonSpeciesData.genera[7].genus : apiPokemonSpeciesData.genera[0].genus)}</h3>
        <div class="flex">
          <img class="mr-8px pkm-gif pt-1" src="${address}pokedex/sprites/pokemon/other/showdown/${id}.gif" alt="${apiPokemonData.name}">
          <p class="pt-1">${(apiPokemonSpeciesData.flavor_text_entries[7] ? apiPokemonSpeciesData.flavor_text_entries[7].flavor_text : apiPokemonSpeciesData.flavor_text_entries[0].flavor_text)}</p>
        </div>
        <div class="row">
          <div class="col">
            <h6 class="text-center">Weight:</h6>
            <h5 class="text-center">${parseFloat(apiPokemonData.weight / 15).toFixed(2)} kg - ${parseFloat(apiPokemonData.weight / 7.5).toFixed(2)} kg</h5>
            <h6 class="text-center pt-3">Growth-Rate: </h6>
            <h5 class="text-center">${capitalize(apiPokemonSpeciesData.growth_rate.name ? apiPokemonSpeciesData.growth_rate.name : "Unknown")}</h5>
            <h6 class="text-center pt-3">Genders:</h6>
            <h5 class="text-center pb-2">${(apiPokemonSpeciesData.gender_rate)}</h5>
            </div>
          <div class="col">
            <h6 class="text-center">Size:</h6>
            <h5 class="text-center">${parseFloat(apiPokemonData.height / 15).toFixed(2)} m - ${parseFloat(apiPokemonData.height / 8).toFixed(2)} m</h5>
            <h6 class="text-center pt-3">Habitat:</h6>
            <h5 class="text-center">${capitalize(apiPokemonSpeciesData.habitat ? apiPokemonSpeciesData.habitat.name : "Unknown")}</h5>
            <h6 class="text-center pt-3">Capture-Rate:</h6>
            <h5 class="text-center pb-2">${(apiPokemonSpeciesData.capture_rate)}%</h5>
          </div>
        </div>
      </div>

        `;
}

function statsTemplate(id) {
  return `
      <div class="container w-90"> 
        <div class="row">
          <div class="col mt-2 mb-3">
            <h6 class="text-center">HP:</h6>
            <div class="flex align-items-center justify-content-between w-90">
              <h6 class="mt-2">${apiPokemonData.stats[0].base_stat}</h6>
              <div class="progress w-90" role="progressbar" aria-label="HP" aria-valuenow="${apiPokemonData.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="150">
                <div class="progress-bar" style="width: ${apiPokemonData.stats[0].base_stat / 3 * 2}%" aria-valuenow="${apiPokemonData.stats[0].base_stat}"></div>
              </div>
            </div>
            <h6 class="text-center">Attack:</h6>
            <div class="flex align-items-center justify-content-between w-90">
              <h6 class="mt-2">${apiPokemonData.stats[1].base_stat}</h6>
              <div class="progress w-90" role="progressbar" aria-label="Attack" aria-valuenow="${apiPokemonData.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${apiPokemonData.stats[1].base_stat / 3 * 2}%" aria-valuenow="${apiPokemonData.stats[1].base_stat}"></div>
              </div>
            </div>
            <h6 class="text-center">Defense:</h6>
            <div class="flex align-items-center justify-content-between w-90">
              <h6 class="mt-2">${apiPokemonData.stats[2].base_stat}</h6>
              <div class="progress w-90" role="progressbar" aria-label="Defense" aria-valuenow="${apiPokemonData.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${apiPokemonData.stats[2].base_stat / 3 * 2}%" aria-valuenow="${apiPokemonData.stats[2].base_stat}"></div>
              </div>
            </div>
            <h6 class="text-center">Speed:</h6>
            <div class="flex align-items-center justify-content-between w-90">
              <h6 class="mt-2">${apiPokemonData.stats[5].base_stat}</h6>
              <div class="progress w-90" role="progressbar" aria-label="Speed" aria-valuenow="${apiPokemonData.stats[5].base_stat}" aria-valuemin="0" aria-valuemax="150">
                <div class="progress-bar" style="width: ${apiPokemonData.stats[5].base_stat / 3 * 2}%" aria-valuenow="${apiPokemonData.stats[5].base_stat}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
}

function evolutionTemplate() {
  return `
    <div class="container w-90">
      <div class="row align-items-center justify-content-between">
        <div class="col" id="evolutionContainer">
          <div class="row center" id="chainBaseWrap"></div>
          <div class="row center" id="chainL1Wrap"></div>
          <div class="row center" id="chainL2Wrap"></div>
        </div>
      </div>
    </div>
  `;
}

function chainBaseTemplate() {
  return ` 
      <div onclick="openWindow(${chainBase.id})" class="col-6 flex align-items-center justify-content-center evoPkmMiniCard mr-8px" id="pkmEvoCard${chainBase.id}">
        <img class="pkm-gif mr-8px" src="${address}pokedex/sprites/pokemon/other/showdown/${chainBase.id}.gif" alt="${chainBase.name}">
        <h4 class="mr-8px">#${chainBase.id} </h4>
        <h4>${capitalize(chainBase.name)}</h4>
      </div>
  `;
}

function chainL1Template(i) {
  return ` 
      <div onclick="openWindow(${chainL1[i].id})" class="col-6 flex align-items-center justify-content-center evoPkmMiniCard mr-8px" id="pkmEvoCard${chainL1[i].id}">
        <img class="pkm-gif pkm-gif-evo mr-8px" src="${address}pokedex/sprites/pokemon/other/showdown/${chainL1[i].id}.gif" alt="${chainL1[i].name}">
        <h4 class="mr-8px">#${chainL1[i].id} </h4>
        <h4>${capitalize(chainL1[i].name)}</h4>
      </div>
  `;
}

function chainL2Template(i) {
  return ` 
      <div onclick="openWindow(${chainL2[i].id})" class="col-6 flex align-items-center justify-content-center evoPkmMiniCard mr-8px" id="pkmEvoCard${chainL2[i].id}">
        <img class="pkm-gif pkm-gif-evo mr-8px" src="${address}pokedex/sprites/pokemon/other/showdown/${chainL2[i].id}.gif" alt="${chainL2[i].name}">
        <h4 class="mr-8px">#${chainL2[i].id} </h4>
        <h4>${capitalize(chainL2[i].name)}</h4>
      </div>
  `;
}

