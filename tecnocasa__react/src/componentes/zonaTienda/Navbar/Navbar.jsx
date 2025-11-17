import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../../zonaCliente/LoginComponent/Login.jsx';
import './Navbar.css';

const Navbar = ({ solid }) => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleMiTecnocasa = () => navigate('/MiCuenta');
  const goHome = () => navigate('/');
  const goVender = () => navigate('/vender-casa');
  const goComprar = () => navigate('/');
  const goHipotecas = () => navigate('/hipotecas');
  const goAgencias = () => navigate('/agencias');
  const goBlog = () => navigate('/blog');

  return (
    <>
      <header className={solid ? 'header-solid' : 'header-transparent'}>
        <img
          src={solid ? "/images/tecnocasalogo2.svg" : "/images/logotecnocasa.svg"}
          onClick={goHome}
          alt="Tecnocasa Logo"
          className="logo-tecnocasa"
          style={{ cursor: 'pointer' }}
        />
        <nav className="nav-tecnocasa">
          <button type="button" onClick={goBlog} className="nav-link-button">
            <i className="fas fa-blog"></i> Blog
          </button>
          <button type="button" onClick={goVender} className="nav-link-button">
            <i className="fas fa-home"></i> Vender casa
          </button>
          <button type="button" onClick={goComprar} className="nav-link-button">
            <i className="fas fa-search-dollar"></i> Comprar casa
          </button>
          <button type="button" onClick={goHipotecas} className="nav-link-button">
            <i className="fas fa-file-invoice-dollar"></i> Hipotecas
          </button>
          <button type="button" onClick={goAgencias} className="nav-link-button">
            <i className="fas fa-users"></i> Buscar agencia inmobiliaria
          </button>

          {!usuario ? (
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="nav-link-button"
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          ) : (
            <button onClick={handleMiTecnocasa} className="nav-link-button">
              <i className="fas fa-user-circle"></i> Mi Tecnocasa
            </button>
          )}
        </nav>
      </header>

      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
