import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalState from '../../../../globalState/stateGlobal';
import './SidebarTecnocasa.css';

const SidebarTecnocasa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useGlobalState();

  const isActive = (pathOrKey) => {
    // Claves internas para rutas existentes en tu app
    const pathname = location.pathname;
    switch (pathOrKey) {
      case 'panel':      return pathname === '/MiCuenta';
      case 'perfil':     return pathname === '/perfil';
      case 'busquedas':  return pathname === '/busquedas';
      case 'favoritos':  return pathname === '/favoritos';
      case 'escondidos': return pathname === '/escondidos';
      default:           return pathname === pathOrKey;
    }
  };

  return (
    <aside className="mc-sidebar">
      <div className="mc-logo" onClick={() => navigate('/')}>
        <img src="/images/icon-tecnocasa.svg" alt="Logo Tecnocasa" />
      </div>

      <button
        className={`mc-side-btn ${isActive('panel') ? 'active' : ''}`}
        onClick={() => navigate('/MiCuenta')}
      >
        <span className="mc-ico"><i className="fas fa-th-large"></i></span>
        <span>PANEL DE CONTROL</span>
      </button>

      <button
        className={`mc-side-btn ${isActive('perfil') ? 'active' : ''}`}
        onClick={() => navigate('/perfil')}
      >
        <span className="mc-ico"><i className="fas fa-user"></i></span>
        <span>PERFIL</span>
      </button>

      <button
        className={`mc-side-btn ${isActive('busquedas') ? 'active' : ''}`}
        onClick={() => navigate('/busquedas')}
      >
        <span className="mc-ico"><i className="fas fa-search"></i></span>
        <span>BÚSQUEDAS GUARDADAS</span>
      </button>

      <button
        className={`mc-side-btn ${isActive('favoritos') ? 'active' : ''}`}
        onClick={() => navigate('/favoritos')}
      >
        <span className="mc-ico"><i className="fas fa-heart"></i></span>
        <span>ANUNCIOS GUARDADOS</span>
      </button>

      <button
        className={`mc-side-btn ${isActive('escondidos') ? 'active' : ''}`}
        onClick={() => navigate('/escondidos')}
      >
        <span className="mc-ico"><i className="fas fa-eye-slash"></i></span>
        <span>ANUNCIOS ESCONDIDOS</span>
      </button>

      <button
        className="mc-side-btn mc-logout"
        onClick={() => { logout(); navigate('/'); }}
      >
        <span className="mc-ico"><i className="fas fa-power-off"></i></span>
        <span>LOGOUT</span>
      </button>
    </aside>
  );
};

export default SidebarTecnocasa;
