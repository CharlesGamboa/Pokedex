import React, { useState } from 'react'
import { useEffect } from 'react';
import { getPokemon, getPokemonThenCatch} from '../../API/pokeapi'
import './PaginaPrincipal.css';

function PaginaPrincipal() {

  const [pokemon, setPokemon] = useState<any[]>([]);
    
  async function loadPokemon(){
        const datosPokemon = await getPokemon();
        console.log("Pokemon:", datosPokemon);
        setPokemon([datosPokemon]);
    }

    //datos del pokemon con la Promesa
    const datosPoke = getPokemonThenCatch()
    .then((datos)=>{
      console.log("Datos de los pokemon con then y catch", datos)
    })
    .catch((error)=>{
      return{
        error:"Hubo un error al llamar al API utilizando Then y Catch",
      };
    });

// Primero: la funcion a ejecutar & Segundo: Es el array de dependencias "lo que veo o escucho por cambios"
    useEffect(()=>{loadPokemon();
    },[]);

console.log(pokemon);

  return (
    <div>
        <img src="./titulo.png" alt="" />
    </div>
  )
}

export default PaginaPrincipal