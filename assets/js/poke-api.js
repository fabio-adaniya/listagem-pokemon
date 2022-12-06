const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

/*
fetch faz a requisição
finally sempre é executado
=> é uma arrow function, é uma forma reduzida de function(){}
formas de debugar:
- ir no chrome
- apertar F12
- ir na aba sources
- encontrar o arquivo que deve ser debugado
- clicar na coluna onde tem os numeros 1, 2, 3... para colocar o ponto de parada

ao colocar a palavra debugger direto no codigo e deixar aberto a 
janela do navegador na parte que debuga, o codigo será parado na parte que 
tiver a palavra debugger
*/

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error))
}