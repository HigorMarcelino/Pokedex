const pokemonName = document.querySelector('.pokemon_name');
const pokemonNum = document.querySelector('.pokemon_num');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.search');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const shinym = document.querySelector('.shinym');
const shinyf = document.querySelector('.shinyf');
const fem = document.querySelector('.fem');
const male = document.querySelector('.male');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status == 200){
        const data = await apiResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon, filtro) =>{

    pokemonNum.innerHTML = "";
    pokemonName.innerHTML = "Searching...";
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        if(data.sprites.versions['generation-v']['black-white'].animated['front_default']){
            switch (filtro) {
                case 11:
                    pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated['front_shiny'];
                    break;
                case 20:
                    pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated['front_female'];
                    break;
                case 21:
                    pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated['front_shiny_female'];
                    break;
                default:
                    pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
                    break;
            }
        }else{
            switch (filtro) {
                case 11:
                    pokemonImg.src = data.sprites['front_shiny'];
                    break;
                case 20:
                    pokemonImg.src = data.sprites['front_female'];
                    break;
                case 21:
                    pokemonImg.src = data.sprites['front_shiny_female'];
                    break;
                default:
                    pokemonImg.src = data.sprites['front_default'];
                    break;
            }
        }
        if (pokemonImg.src == "http://127.0.0.1:5500/null") {
            pokemonImg.src = data.sprites['front_default'];
        }
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'MissingNo.';
        pokemonNum.innerHTML = '#';
        pokemonImg.src = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages4.wikia.nocookie.net%2F__cb20111010225147%2Funanything%2Fimages%2Fthumb%2Fc%2Fc1%2FMISSINGNO.png%2F639px-MISSINGNO.png&f=1&nofb=1';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})
prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        renderPokemon(searchPokemon - 1);
        input.value = '';
    }
})
next.addEventListener('click', () => {
    renderPokemon(searchPokemon + 1);
    input.value = '';
})
shinym.addEventListener('click', () => {
    renderPokemon(searchPokemon, 11);
    input.value = '';
})
shinyf.addEventListener('click', () => {
    renderPokemon(searchPokemon, 21);
    input.value = '';
})
fem.addEventListener('click', () => {
    renderPokemon(searchPokemon, 20);
    input.value = '';
})
male.addEventListener('click', () => {
    renderPokemon(searchPokemon);
    input.value = '';
})

renderPokemon(searchPokemon, 10);