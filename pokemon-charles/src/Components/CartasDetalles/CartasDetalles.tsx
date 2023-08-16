//========================================== IMPORTS ==================================================
import React from 'react'
import './CartasDetalles.css';
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
function CartasDetalles({name, img, types, id, hp, attack, defense, specialAtt, specialDef, speed, funcionClick}:CartasPokemonProps) {
    return (
        <div>
            <div className='containerCard2' onClick={()=>{funcionClick(name);}}>
            <h2 className='tituloCarta2'>{name}</h2>
                <div className='containerPoke2'>
                    <img className="imagenPoke2" src={img} alt="Pokemon"/>
                </div>
            <h4 className='identificator2'>#0{id}</h4>
            <ul className='containerStats2'>
                <li className='liStats2'>HP: {hp}</li>
                <li className='liStats2'>ATTK: {attack}</li>
                <li className='liStats2'>DEF: {defense}</li>
                <li className='liStats2'>SPE.ATTK: {specialAtt}</li>
                <li className='liStats2'>SPE.DEF: {specialDef}</li>
                <li className='liStats2 '>SPEED: {speed}</li>
            </ul>
        <div className='containerTypes2'>
        <ul className='ul-types2'>
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

export default CartasDetalles