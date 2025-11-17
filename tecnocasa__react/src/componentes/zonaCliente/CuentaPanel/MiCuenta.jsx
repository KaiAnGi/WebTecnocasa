import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../componentes/zonaTienda/Navbar/Navbar.jsx';
import { useAuth } from '../../../hooks/useAuth';
import SidebarTecnocasa from './Sidebar/SidebarTecnocasa.jsx';
import './MiCuenta.css';

const MiCuenta = () => {
    const { usuario } = useAuth();
    const [solid, setSolid] = useState(false);
    const [activeTab, setActiveTab] = useState('panel');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setSolid(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar solid={solid} />
            <div className="mc-wrapper">
                {/* Sidebar */}
                <aside className="page-sidebar">
                    <SidebarTecnocasa />
                </aside>

                {/* Contenido */}
                <main className="mc-content">
                    <section className="mc-hero">
                        <div className="mc-hero-text">
                            <h1>Hola</h1>
                            <p>¡Bienvenido a tu Área Reservada!</p>
                            <p>
                                Aquí puedes revisar las cosas más importantes que has encontrado en nuestro Portal.
                                Desde visualizar tus anuncios favoritos hasta aquellos que has decidido ocultar, así como repasar
                                los últimos inmuebles que has visualizado y las búsquedas que has guardado para acceder a ellas con un solo clic.
                            </p>
                            <p>Además, tienes la posibilidad de actualizar tu información personal y tu contraseña en cualquier momento.</p>
                        </div>
                        <div className="mc-hero-avatar">
                            <div className="mc-avatar-figure">
                                <div className="mc-fig-top"></div>
                                <div className="mc-fig-body"></div>
                            </div>
                            <button
                                className={`mc-side-btn ${activeTab === 'perfil' ? 'active' : ''}`}
                                onClick={() => navigate('/perfil')}
                            >
                                <span className="mc-ico"><i className="fas fa-user"></i></span>
                                <span>PERFIL</span>
                            </button>
                        </div>
                    </section>

                    <section className="mc-cards">
                        <div className="mc-card mc-card-left">
                            <div className="mc-card-ico"><i className="fas fa-heart"></i></div>
                            <div className="mc-card-num">0</div>
                            <div className="mc-card-label">Anuncios guardados</div>
                        </div>

                        <div className="mc-card mc-card-right">
                            <div className="mc-card-ico"><i className="fas fa-eye"></i></div>
                            <div className="mc-card-num">0</div>
                            <div className="mc-card-label">Búsquedas guardadas</div>
                        </div>
                    </section>

                    <section className="mc-search-box">
                        <div className="mc-search-header">
                            <h3>¿Quieres realizar una búsqueda?</h3>
                            <p>Realiza una nueva búsqueda en las áreas de tu interés.</p>
                        </div>
                        <div className="mc-search-form">
                            <input type="text" placeholder="Ciudad, provincia, distrito, barrio o referencia" />
                            <select placeholder="Motivación">
                                <option hidden>Motivacion</option>
                                <option>Comprar</option>
                                <option>Alquilar</option>
                            </select>
                            <button className="mc-btn-search">Buscar</button>
                        </div>
                        <div className="mc-hidden-link">
                            <a href="#">Anuncios escondidos</a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default MiCuenta;