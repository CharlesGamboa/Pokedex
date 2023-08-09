import React from 'react'
import './CartasPokemon.css';
import {getTypeColor} from "../../Utils/PokemonTypeColor";

interface CartasPokemonProps{
    name:string;
    img: string;
    types: any[];
}

function CartasPokemon({name, img, types}:CartasPokemonProps) {
    return (
    <div className='containerCard'>
        <h2 className='tituloCarta'>{name}</h2>
        <div className='containerPoke'>
                <img className="imagenPoke" src={img} alt="Pokemon"/>
        </div>
        <div className='containerTypes'>
        <ul className='ul-types'>
            {
                types.map( (typeItem,index)=>(
                <li style={{backgroundColor: getTypeColor(typeItem.type.name)}} key={index}>
                    {typeItem.type.name}
                </li>) )
            }
        </ul>
        </div>
    </div>

    )
}

export default CartasPokemon