import React from 'react';
import './App.css';
import PaginaPrincipal from './Pages/PaginaPrincipal/PaginaPrincipal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <PaginaPrincipal></PaginaPrincipal>
    },
    {
      path:"/:id",
      element: <PaginaPrincipal></PaginaPrincipal>
    },
    {
      path:"/*",
      element: <PaginaPrincipal></PaginaPrincipal>
    }

  ]);

  return (
    <div className="App">
      
        <img src={"./Pokeball.png"} className="App-logo" alt="Pokeball" />
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
