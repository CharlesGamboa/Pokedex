

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

export function getPokemonThenCatch() {

    //THEN hace la funcion de callback // Funcion a llamar cuando termine o llegue
    return fetch(URLPokeApi + "pokemon/pikachu/").then(
        (response) => { return response.json() }
    )

}