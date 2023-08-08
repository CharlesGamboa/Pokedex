import React from 'react'

interface CartasPokemonProps{
    name:string
}

function CartasPokemon({name}:CartasPokemonProps) {
    return (
    <div>
        <h2>{name}</h2>
        
    </div>
    )
}

export default CartasPokemon