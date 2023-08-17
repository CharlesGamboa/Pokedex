//========================================== IMPORTS ====================================================
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./PaginaDetalles.css";
import { getEvolutionChain, getPokemon } from "../../API/pokeapi";
import CartasDetalles from "../../Components/CartasDetalles/CartasDetalles";
import Botones from "../../Components/Botones/Botones";

function PaginaDetalles() {

//======================================== HOOKS useState ================================================
    const [listaEvoluciones, setListaEvoluciones] = useState<any[]>([]);
    const [poke, setPoke] = useState<any>();
    const navigate = useNavigate();
    const { id }: any = useParams();

//================================== FUNCION PARA LA CADENA DE EVOLUCIONES ==================================
    async function evoluciones() {
        const listadoEvoluciones = await getEvolutionChain(id);
        setListaEvoluciones(listadoEvoluciones);
        // console.log("ListadoEvoluciones: ", listadoEvoluciones);
    }

    useEffect(() => {
        evoluciones();
    }, [id]);

    function irInicio() {
        navigate("/");
    }

    function irDetalles(id: number | string) {
        navigate("/pokemon/" + id);
    }

    async function getPoke() {
        const pokeData = await getPokemon(id);
        setPoke(pokeData);
        return pokeData;
    }

    useEffect(() => {
        getPoke();
    }, [id]);

    return (
        <div className="containerDetalles">
            <h2 className="tituloDetalles">Pokemon</h2>
            <div className="containerSelectedCard">{poke && (<CartasDetalles
                funcionClick={irDetalles}
                name={poke.name}
                img={poke.sprites.other["official-artwork"].front_default}
                types={poke.types}
                id={poke.id}
                hp={poke.stats[0].base_stat}
                attack={poke.stats[1].base_stat}
                defense={poke.stats[2].base_stat}
                specialAtt={poke.stats[3].base_stat}
                specialDef={poke.stats[4].base_stat}
                speed={poke.stats[5].base_stat}
            ></CartasDetalles>)}
            </div>

            {poke && <Botones
                changeNext={()=>{irDetalles(parseInt(poke.id)+1)}}
                changeBack={()=>{irDetalles(parseInt(poke.id)-1)}}
                urlState={[poke.id<1010?id:undefined, poke.id===1?undefined:id]}></Botones>}

            <h2 className="tituloDetalles">Evolution Chain</h2>
            <div className="containerEvoChain">{listaEvoluciones.map((pokemon, indice) => (
                <CartasDetalles
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
                    types={pokemon.types}
                ></CartasDetalles>
            ))}
            </div>
            <div className="button-borders">
                <button onClick={irInicio} className="primary-button">
                    GO BACK!
                </button>
            </div>
        </div>
    );
}

export default PaginaDetalles;
