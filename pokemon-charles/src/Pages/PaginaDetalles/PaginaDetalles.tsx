import React from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import './PaginaDetalles.css';

function PaginaDetalles() {

    const navigate = useNavigate();
    const {id} = useParams();

    function irInicio(){
        navigate("/");
    }

    return (
    <div>
        <h1>Stats {id}</h1>
        <div className="button-borders">
            <button onClick={irInicio} className="primary-button">GO BACK!</button>
        </div>
    </div>
    )
}

export default PaginaDetalles