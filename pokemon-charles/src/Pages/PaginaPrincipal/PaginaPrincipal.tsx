import React, { useState } from 'react'
import { useEffect } from 'react';
import { getPokemon, getPokemonThenCatch, getListaPokemon} from '../../API/pokeapi'
import { useNavigate} from 'react-router-dom'
import CartasPokemon from '../../Components/CartasPokemon/CartasPokemon';
import './PaginaPrincipal.css';

function PaginaPrincipal() {

  const [listaPokemon,setListaPokemon] = useState<any[]>([]);
  const [listaPokemonData,setListaPokemonData] = useState<any[]>([]);

  //
  async function loadPokemon(){

    const datosListaPokemon = await getListaPokemon();
    console.log("pokemon LISTA:",datosListaPokemon); 
    setListaPokemon(datosListaPokemon.results);

    }

// Primero: la funcion a ejecutar & Segundo: Es el array de dependencias "lo que veo o escucho por cambios"
    useEffect(()=>{loadPokemon();
    },[]);

async function cargarPokemon(){
  var listaTemporal: any[]=[];
      for (let index = 0; index < listaPokemon.length; index++) {
        const poke = listaPokemon[index];
        const pokeData = await getPokemon(poke.name)
       
          console.log(pokeData);
          listaTemporal.push(pokeData);
      }
      setListaPokemonData(listaTemporal);
}

    useEffect(()=>{
      cargarPokemon();
    }, [listaPokemon]);

    // Simulación
    const navigate = useNavigate();

    function irDetalles (id:number){
      navigate("/pokemon/"+id)
    }

  return (
    <div>
        
        <ul className='principal'>
          {listaPokemonData.map((pokemon,indice)=>(<CartasPokemon 
          key={indice} 
          name={pokemon.name} 
          img={pokemon.sprites.versions["generation-v"]["black-white"].front_default}
          types={pokemon.types}></CartasPokemon>))}

          {/* <li onClick={()=>{irDetalles(1)} }>Pokemon 1</li>
          <li onClick={()=>{irDetalles(2)} }>Pokemon 2</li> */}
        </ul>
    </div>
  )
}

export default PaginaPrincipal