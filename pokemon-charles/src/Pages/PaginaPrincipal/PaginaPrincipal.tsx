import React, { useState } from 'react'
import { useEffect } from 'react';
import { getPokemon, getListaPokemon, getUrlNextAndPrevius} from '../../API/pokeapi'
import { useNavigate} from 'react-router-dom'
import CartasPokemon from '../../Components/CartasPokemon/CartasPokemon';
import './PaginaPrincipal.css';

function PaginaPrincipal() {

  //================================ HOOKS useState ================================================
  const [listaPokemon,setListaPokemon] = useState<any[]>([]);
  const [listaPokemonData,setListaPokemonData] = useState<any[]>([]);
  const [urlCambiar,setUrlCambiar] = useState<any[]>([]);
  const [buscarPokemon, setBuscarPokemon] = useState("");

  // =========================== FUNCION PARA LA ESPERA DEL POKEMON ================================
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

    function irDetalles (id:number | string){
      navigate("/pokemon/"+id)
    }

    //==============================================================================

    async function pasarPaginas() {
      const guardarPaginas = await getListaPokemon()
      setUrlCambiar([guardarPaginas.next, guardarPaginas.previous]);
      return guardarPaginas
  };

  useEffect(() => {
      pasarPaginas()
  }, [])

  async function paginaSiguiente() {
      const paginaNext = await getUrlNextAndPrevius(urlCambiar[0])
      setListaPokemon(paginaNext.results);
      setUrlCambiar([paginaNext.next, paginaNext.previous]);
      return paginaNext
  }

  async function paginaAtras() {
      const paginaPrevius = await getUrlNextAndPrevius(urlCambiar[1])
      setListaPokemon(paginaPrevius.results);
      setUrlCambiar([paginaPrevius.next, paginaPrevius.previous]);
      return paginaPrevius
  }

   //============================== FUNCION FILTRAR POKEMON ================================================ 
   async function filtrarPokemon(event: any) {

    event.preventDefault();

    if (buscarPokemon === "") {
        alert("Texto en Blanco")
        cargarPokemon();
    } else {
        const listaPokemons = await getPokemon(buscarPokemon);
        let listaAux = [];

        if (listaPokemons.name || listaPokemons.id === buscarPokemon) {
            listaAux.push(listaPokemons);
        }
        setListaPokemonData(listaAux);
        setBuscarPokemon("");
    }
}

const handleBuscarPokemon = (event: any) => {
    setBuscarPokemon(event.target.value);

};

  return (
    <div>
      <div className='containerBuscar'>
      <form action="">
            <input className="inputBuscar" placeholder='Write your pokemon...' value={buscarPokemon} onChange={handleBuscarPokemon}></input>
            <button className="primary-button" onClick={filtrarPokemon}>SEARCH!</button>
          </form>
      </div>
        <ul className='principal'>
          {listaPokemonData.map((pokemon,indice)=>(<CartasPokemon 
          funcionClick={irDetalles}
          key={indice} 
          name={pokemon.name} 
          img={pokemon.sprites.other["official-artwork"].front_default}
          id={pokemon.id}
          types={pokemon.types}></CartasPokemon>))}


          <div className="button-borders">
            {urlCambiar[1] && <button onClick={paginaAtras} className="primary-button">BACK!</button>}
            {urlCambiar[0] && <button onClick={paginaSiguiente} className="primary-button">NEXT!</button>}
          </div>
        </ul>
    </div>
  )
}

export default PaginaPrincipal