import React from 'react'
import './Pagina404.css';

function Pagina404() {
    return (
    <div >
        <h1 className='title'>Error 404</h1>
        <img className="imagenError" src="/Sad.jpg" alt="Pikachu Triste" />
        <h1 className='texto'>No se encuentra la página :c </h1>
    </div>
    )
}

export default Pagina404