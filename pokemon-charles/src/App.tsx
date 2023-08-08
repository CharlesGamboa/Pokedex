import React from 'react';
import './App.css';
import PaginaPrincipal from './Pages/PaginaPrincipal/PaginaPrincipal';
import Pagina404 from './Pages/Pagina404/Pagina404';
import PaginaDetalles from './Pages/PaginaDetalles/PaginaDetalles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <PaginaPrincipal></PaginaPrincipal>
    },
    {
      path:"/Pokemon/:id",
      element: <PaginaDetalles></PaginaDetalles>
    },
    {
      path:"/*",
      element: <Pagina404></Pagina404>
    }

  ]);

  return (
    <div className="App">
      <div className='head'>
        <img src={"./Pokeball.png"} className="App-logo" alt="Pokeball" />
        <RouterProvider router={router}></RouterProvider>
        </div>
        <div className="button-borders">
          <button className="primary-button">ATRAS</button>
        </div>
          <audio id="start" src="http://216.227.134.162/ost/pokemon-original-game-soundtrack/tmlaxizceu/101-opening.mp3" controls loop ></audio>
          <img id="pikachu" src="http://orig00.deviantart.net/73e7/f/2013/036/1/9/pikachu_running_gif_by_cookietime88-d5tz4py.gif" alt="" />
          <img id= "gengar" src="https://static.tumblr.com/b99fc5a3e3d8880d6098d4cb71420b62/ldtjw5m/Ed5nux5rb/tumblr_static_dujrthw3jq8kg884wswsk4sos.gif" alt="" />
          <img id="lapras" src="http://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif" alt="" />  

    </div>
  );
}

export default App;
