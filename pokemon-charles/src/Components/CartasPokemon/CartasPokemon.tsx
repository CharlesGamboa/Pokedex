import React from 'react'
import './CartasPokemon.css';
import {getTypeColor} from "../../Utils/PokemonTypeColor";

interface CartasPokemonProps{
    name:string;
    img: string;
    types: any[];
    id: number;
    funcionClick: (id:number | string) => void;
}

function CartasPokemon({name, img, types, id, funcionClick}:CartasPokemonProps) {
    return (
        <div>
            <div className='containerCard' onClick={()=>{funcionClick(name);}}>
            <h2 className='tituloCarta'>{name}</h2>
                <div className='containerPoke'>
                    <img className="imagenPoke" src={img} alt="Pokemon"/>
                </div>
            <h4 className='identificator'>#0{id}</h4>
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
    </div>

    )
}

export default CartasPokemon