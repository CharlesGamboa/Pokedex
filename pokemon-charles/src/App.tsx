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
      <img src="./titulo.png" alt="" />
        <img src={"./Pokeball.png"} className="App-logo" alt="Pokeball" />
        <RouterProvider router={router}></RouterProvider>
        </div>
        <div className="button-borders">
          <button className="primary-button">ATRAS</button>
        </div>
    </div>
  );
}

export default App;
