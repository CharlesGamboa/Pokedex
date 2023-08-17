//========================================== IMPORTS ==================================================
import React, { useState } from 'react'
import { useEffect } from 'react';
import { getPokemon, getListaPokemon, getUrlNextAndPrevius } from '../../API/pokeapi'
import { useNavigate } from 'react-router-dom'
import CartasPokemon from '../../Components/CartasPokemon/CartasPokemon';
import './PaginaPrincipal.css';

function PaginaPrincipal() {

  //==================================== HOOKS useState ==============================================
  const [listaPokemon, setListaPokemon] = useState<any[]>([]);
  const [listaPokemonData, setListaPokemonData] = useState<any[]>([]);
  const [urlCambiar, setUrlCambiar] = useState<any[]>([]);
  const [buscarPokemon, setBuscarPokemon] = useState("");

  // ============================== FUNCION PARA TRAER LOS POKEMON ===============================
  async function loadPokemon() {

    const datosListaPokemon = await getListaPokemon();
    // console.log("pokemon LISTA:", datosListaPokemon);
    setListaPokemon(datosListaPokemon.results);
  }

  // Primero: la funcion a ejecutar & Segundo: Es el array de dependencias "lo que veo o escucho por cambios"
  useEffect(() => {
    loadPokemon();
  }, []);

// ========================= FUNCION PARA TRAER EL NOMBRE DEL POKEMON ===============================

  async function cargarPokemon() {
    var listaTemporal: any[] = [];
    for (let index = 0; index < listaPokemon.length; index++) {
      const poke = listaPokemon[index];
      const pokeData = await getPokemon(poke.name)
      console.log(pokeData);
      listaTemporal.push(pokeData);
    }
    setListaPokemonData(listaTemporal);
  }

   //====================================== HOOKS useEffect ==============================================
   //Para traer los camios que existan en la funcion cargarPokemon
  useEffect(() => {
    cargarPokemon();
  }, [listaPokemon]);

   //========================================== SIMULACION ==============================================
  const navigate = useNavigate();

  function irDetalles(id: number | string) {
    navigate("/pokemon/" + id)
  }

   //============================= FUNCION PARA TRAER LOS DEMÁS POKEMON ==================================
  async function pasarPaginas() {
    const guardarPaginas = await getListaPokemon()
    setUrlCambiar([guardarPaginas.next, guardarPaginas.previous]);
    return guardarPaginas
  };

  useEffect(() => {
    pasarPaginas()
  }, [])

  //=========================== FUNCION PARA PASAR A LA PRÓXIMA LISTA DE POKEMON ============================
  async function paginaSiguiente() {
    const paginaNext = await getUrlNextAndPrevius(urlCambiar[0])
    setListaPokemon(paginaNext.results);
    setUrlCambiar([paginaNext.next, paginaNext.previous]);
    return paginaNext
  }

  //=========================== FUNCION PARA PASAR A LA ANTERIOR LISTA DE POKEMON ===========================
  async function paginaAtras() {
    const paginaPrevius = await getUrlNextAndPrevius(urlCambiar[1])
    setListaPokemon(paginaPrevius.results);
    setUrlCambiar([paginaPrevius.next, paginaPrevius.previous]);
    return paginaPrevius
  }

  //====================================== FUNCION FILTRAR POKEMON ========================================== 
  // ES EL BOTON DE BUSCAR POKEMON
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
      else {
        window.location.reload();
        alert ("No se encuentra ese Pokemon");
        
      }
      setListaPokemonData(listaAux);
      setBuscarPokemon("");
    }
  }
  const handleBuscarPokemon = (event: any) => {
    setBuscarPokemon(event.target.value);

  };

  return (
  //========================================= HTML =============================================
    <div>
      <div className='containerBuscar'>
        <form action="">
          <input className="inputBuscar" placeholder='Write your pokemon...' value={buscarPokemon} onChange={handleBuscarPokemon}></input>
          <button className="primary-button" onClick={filtrarPokemon}>SEARCH!</button>
        </form>
      </div>
      <ul className='principal'>
        {listaPokemonData.map((pokemon, indice) => (<CartasPokemon
          funcionClick={irDetalles}
          key={indice}
          name={pokemon.name}
          img={pokemon.sprites.other["official-artwork"].front_default}
          id={pokemon.id}
          hp={pokemon.stats[0].base_stat}
          attack={pokemon.stats[1].base_stat}
          defense={pokemon.stats[2].base_stat}
          specialAtt={pokemon.stats[3].base_stat}
          specialDef={pokemon.stats[4].base_stat}
          speed={pokemon.stats[5].base_stat}
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