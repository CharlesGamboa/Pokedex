

const URLPokeApi = "https://pokeapi.co/api/v2/"; //Esta es la url de la API, donde vamos a obtener todos los datos.

//Funcion para obtener un pokemon basado en su ID o Nombre
export async function getPokemon(id) {
    try { // el TRY nos ayuda a crear lo que tiene adentro
        const requestPokemon = await fetch(URLPokeApi + "pokemon/" + id);//Variable donde agrega lo faltante de la URL
        const pokemonData = await requestPokemon.json(); //Convierte la cadena de texto en un objeto que se pueda leer

        return pokemonData;

    } catch (error) { //El CATCH atrapa el error y lo muestra en consola
        return { error: "Hubo un error al llamar al API" }
    }
}

export async function getListaPokemon() {

    try {
        const requestPokemon = await fetch(URLPokeApi + "pokemon/");
        const pokemonData = await requestPokemon.json();

        return pokemonData;

    } catch (error) { //El CATCH atrapa el error y lo muestra en consola
        return { error: "Hubo un error al llamar al API" }
    }
}

export async function getPokemonThenCatch() {

    //THEN hace la funcion de callback // Funcion a llamar cuando termine o llegue
    return fetch(URLPokeApi + "pokemon/pikachu/").then(
        (response) => { return response.json() }
    )
}

// Funcion para mostrar los demás pokemon
export async function getUrlNextAndPrevius(url) {
    const requestPokemon = await fetch(url);
    const pokemonData = await requestPokemon.json();
    return pokemonData;
}

//funcion para acceder a la CADENA DE EVOLUCIONES   
function getEvolution(list, chain) {
    if (chain.evolves_to.length > 0) {
        for (let index = 0; index < chain.evolves_to.length; index++) {
            const evolution = chain.evolves_to[index];
            list.push(evolution.species.name);
            getEvolution(list, evolution)
        }
    }
    return list;
}

export async function getEvolutionChain(pokemonId) {

    try {

        //Get the species
        const pokemonSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonId);
        const pokemonSpeciesData = await pokemonSpecies.json();
        if (!pokemonSpeciesData?.evolution_chain) {
            return [];
        }
        console.log("Especie", pokemonSpeciesData)

        //Get the evolution
        const requestPokemon = await fetch(pokemonSpeciesData.evolution_chain.url);
        const pokemonData = await requestPokemon.json();

        var evolutionList = [pokemonData.chain.species.name];

        getEvolution(evolutionList, pokemonData.chain)

        console.log("Nombres Evoluciones", evolutionList)


        //Get the images
        var evolutionListData = [];

        for (let index = 0; index < evolutionList.length; index++) {
            const evolution = evolutionList[index];
            const requestPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + evolution);
            const evolutionData = await requestPokemon.json();
            evolutionListData.push(evolutionData);
        }
        console.log("Data Evoluciones", evolutionListData)

        return evolutionListData;

    } catch (error) { //Se ejecuta si hubo algun error
        console.error("Hubo un error al llamar al api")
        return []
    }

}
