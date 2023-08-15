//========================================== IMPORTS ==================================================
import React from 'react'
import './CartasPokemon.css';
import {getTypeColor} from "../../Utils/PokemonTypeColor";


//================================ TIPOS PARA LAS CARTAS ================================================
interface CartasPokemonProps{
    name:string;
    img?: string;
    types: any[];
    id?: number;
    hp?: any;
    attack?:any;
    defense?: any;
    specialAtt?: any;
    specialDef?: any;
    speed?: any;
    funcionClick: (id:number | string) => void;
}

//================================ fUNCION PRINCIPAL DE LA CARTA ================================================
function CartasPokemon({name, img, types, id, hp, attack, defense, specialAtt, specialDef, speed, funcionClick}:CartasPokemonProps) {
    return (
        <div>
            <div className='containerCard' onClick={()=>{funcionClick(name);}}>
            <h2 className='tituloCarta'>{name}</h2>
                <div className='containerPoke'>
                    <img className="imagenPoke" src={img} alt="Pokemon"/>
                </div>
            <h4 className='identificator'>#0{id}</h4>
            <ul className='containerStats'>
                <li className='liStats'>HP: {hp}</li>
                <li className='liStats'>ATTK: {attack}</li>
                <li className='liStats'>DEF: {defense}</li>
                <li className='liStats'>SPE.ATTK: {specialAtt}</li>
                <li className='liStats'>SPE.DEF: {specialDef}</li>
                <li className='liStats'>SPEED: {speed}</li>
            </ul>
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