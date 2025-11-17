// Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import './Home.css';

// Hook simple de debounce
const useDebounce = (value, delay = 450) => {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
};

const Home = () => {
  const [solid, setSolid] = useState(false);
  const [casas, setCasas] = useState([]);
  const [casasDestacadas, setCasasDestacadas] = useState([]); // snapshot inicial
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // estado de búsqueda
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 450);
  const abortRef = useRef(null);
  const [enBusqueda, setEnBusqueda] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carga inicial (destacadas)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setCargando(true);
        const res = await fetch('http://localhost:3000/api/Tienda/CasasDestacadas?ts=' + Date.now(), {
          credentials: 'include',
          cache: 'no-store'
        });
        const data = await res.json();
        if (!alive) return;
        if (data.ok) {
          setCasas(data.casas || []);
          setCasasDestacadas(data.casas || []); // guardamos “lo inicial”
        } else {
          setError(data.error || 'Respuesta inválida');
        }
      } catch (err) {
        if (alive) {
          console.error('Error obteniendo casas:', err);
          setError('Error al cargar las casas');
        }
      } finally {
        if (alive) setCargando(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Restaurar automáticamente cuando el input se vacíe
  useEffect(() => {
    if (q.trim() === '') {
      setCasas(casasDestacadas);
      setEnBusqueda(false);
      // cancelar cualquier búsqueda en curso
      if (abortRef.current) abortRef.current.abort();
    }
  }, [q, casasDestacadas]);

  // Búsqueda por localización
  useEffect(() => {
    const term = debouncedQ.trim();
    if (term === '') return; // sin término, mantenemos destacadas (efecto anterior ya restaura)

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        setCargando(true);
        setError(null);
        setEnBusqueda(true);
        const url = `http://localhost:3000/api/Tienda/BuscarCasas?q=${encodeURIComponent(term)}&ts=${Date.now()}`;
        const res = await fetch(url, {
          credentials: 'include',
          cache: 'no-store',
          signal: controller.signal
        });
        const data = await res.json().catch(() => ({}));
        if (controller.signal.aborted) return;
        if (data?.ok && Array.isArray(data.casas)) setCasas(data.casas);
        else setError(data?.error || 'Sin resultados');
      } catch (e) {
        if (e.name !== 'AbortError') setError('Error en la búsqueda');
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQ]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQ(q.trim());
  };

  const onChangeInput = (e) => setQ(e.target.value);
  const limpiarBusqueda = () => setQ(''); // el effect hará el resto
  const onKeyDown = (e) => { if (e.key === 'Escape') limpiarBusqueda(); };

  return (
    <>
      <Navbar solid={solid} />

      {/* Banner principal */}
      <div className="banner-principal-tecnocasa">
        <div className="banner-overlay"></div>
        <section className="banner-content">
          <h1>TE ENCONTRAMOS CASA EN CUALQUIER LUGAR</h1>
          <h2>(O CASI)</h2>
          <div className="banner-opciones">
            <span>COMPRAR</span>
            <span>ALQUILAR</span>
            <span>VENDER</span>
          </div>

          <form className="banner-busqueda" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Ciudad, provincia, distrito, barrio o referencia"
              value={q}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              aria-label="Buscar por ubicación"
            />
            <button type="submit">🔍</button>
            {q && <button type="button" onClick={limpiarBusqueda} className="btn-clear">✕</button>}
          </form>

          <div className="banner-pisos-contador">
            Más de <b>7.272</b> pisos en venta o alquiler en las inmobiliarias <b>Tecnocasa</b>
          </div>
        </section>
      </div>

      {/* Selección / Resultados */}
      <main className="seleccion-pisos-tecnocasa">
        <h2>{enBusqueda ? `Resultados para "${q}"` : 'Nuestra selección de pisos con encanto y de ocasión'}</h2>

        {cargando && <p style={{ textAlign: 'center', padding: '40px' }}>Cargando casas...</p>}
        {error && <p style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</p>}

        {!cargando && !error && (
          <div className="cards-pisos-tecnocasa">
            {casas.map((casa) => (
              <div key={casa._id} className="card-piso-tecnocasa">
                {casa.image ? (
                  <img
                    src={casa.image}
                    alt={casa.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '200px', background: '#f0f0f0' }}>Sin imagen</div>
                )}

                <div className="card-piso-contenido">
                  <h3>{casa.title}</h3>
                  <p>{casa.location}</p>
                  <p className="card-piso-precio">
                    €{Number(casa?.price ?? 0).toLocaleString('es-ES')} · {casa?.bedrooms ?? 0} hab. · {casa?.squareMeters ?? 0} m²
                  </p>
                  <p className="card-piso-desc">{casa.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
