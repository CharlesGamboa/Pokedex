import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'

function PaginaDetalles() {

    const navigate = useNavigate();
    const {id} = useParams();

    function irInicio(){
        navigate("/");
    }

    return (
    <div>
        <h1>Pagina Detalles {id}</h1>
        <button onClick={irInicio}>Ir a Inicio</button>
    </div>
    )
}

export default PaginaDetalles