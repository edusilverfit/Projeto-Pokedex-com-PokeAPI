

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">

                </div>
                <div class="specifications">
                    <div class="specification"><span>Força</span><strong>${pokemon.stats.hp}</strong></div>
                    <div class="specification"><span>Ataque</span><strong>${pokemon.stats.attack}</strong></div>
                    <div class="specification"><span>Defesa</span><strong>${pokemon.stats.defense}</strong></div>
                    <div class="specification"><span>Velocidade</span><strong>${pokemon.stats.speed}</strong></div>
                    <div class="specification"><span>Altura</span><strong>${(pokemon.height / 10).toFixed(1)} m</strong></div>
                    <div class="specification"><span>Peso</span><strong>${(pokemon.weight / 10).toFixed(1)} kg</strong></div>
                </div>
                </li>`).join('')

        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset         
            loadPokemonItens(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})









