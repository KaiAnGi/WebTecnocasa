import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VenderCasa from './componentes/zonaTienda/VenderCasa/VenderCasa.jsx';
import Home from './componentes/zonaTienda/Inicio/Home.jsx';
import MiCuenta from './componentes/zonaCliente/CuentaPanel/MiCuenta.jsx';
import Perfil from './componentes/zonaCliente/CuentaPanel/1_MisDatosPersonales/MisDatos.jsx';

const rutasAplicacion = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/MiCuenta',
    element: <MiCuenta />,
  },
  { path: '/perfil', 
    element: <Perfil /> },

  { path: '/vender-casa', 
    element: <VenderCasa /> }
]);

function App() {
  return (
    <RouterProvider router={rutasAplicacion} />
  );
}

export default App;
