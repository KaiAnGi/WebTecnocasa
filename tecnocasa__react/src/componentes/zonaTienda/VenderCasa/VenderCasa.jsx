// VenderCasa.jsx
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './VenderCasa.css';

const defaultCenter = [40.4167, -3.7033]; // Madrid

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function ClickToMark({ onPick }) {
  useMapEvents({
    click(e) { onPick(e.latlng); }
  });
  return null;
}

export default function VenderCasa() {
  const [pos, setPos] = useState({ lat: 39.856, lng: -3.335 });
  const [form, setForm] = useState({ direccion: '', apellido: '', telefono: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Ref del mapa para invalidar tamaño al montar/redimensionar
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Primer ajuste tras pintar
    setTimeout(() => map.invalidateSize(), 0);

    // Reajuste si cambia el tamaño del contenedor (glass/grid)
    const container = document.getElementById('vc-map-container');
    const ro = new ResizeObserver(() => map.invalidateSize());
    if (container) ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="vc-hero">
      <div className="vc-title">
        <h1>Vender tu casa es ahora más rápido con Tecnocasa</h1>
        <p>Tenemos al comprador de tu casa. Pídenos una valoración gratuita y te diremos cuánto vale tu casa para que puedas venderla lo antes posible.</p>
      </div>

      <div className="vc-card glass">
        <div className="vc-grid">
          <div className="vc-map" id="vc-map-container">
            <MapContainer
              center={[pos.lat, pos.lng]}
              zoom={6}
              scrollWheelZoom
              ref={mapRef}
              whenReady={(e) => e.target.invalidateSize()}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[pos.lat, pos.lng]} icon={markerIcon} />
              <ClickToMark onPick={(ll) => setPos(ll)} />
            </MapContainer>
          </div>

          <form className="vc-form" onSubmit={(e) => { e.preventDefault(); /* submit */ }}>
            <h3>Pide ya una valoración gratuita</h3>
            <label className="sr-only" htmlFor="direccion">Dirección</label>
            <input id="direccion" name="direccion" value={form.direccion} onChange={onChange} placeholder="Dirección del piso a vender" />

            <label className="sr-only" htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" value={form.apellido} onChange={onChange} placeholder="Apellido" />

            <label className="sr-only" htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" value={form.telefono} onChange={onChange} placeholder="Teléfono" />

            <div className="vc-consent">
              <input id="priv" type="checkbox" required />
              <label htmlFor="priv">Acepto la política de privacidad</label>
            </div>

            <button type="submit" className="vc-submit">Envía</button>
          </form>
        </div>
      </div>
    </div>
  );
}
