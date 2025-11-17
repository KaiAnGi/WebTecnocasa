// components/MisDatos/MisDatos.jsx
import Navbar from '../../../zonaTienda/Navbar/Navbar.jsx';
import SidebarTecnocasa from '../../CuentaPanel/Sidebar/SidebarTecnocasa.jsx';
import { useNavigate } from 'react-router-dom';
import useGlobalState from '../../../../globalState/stateGlobal';
import { useStickyHeader } from '../../../../hooks/useStickyHeader.js';
import PasswordSection from '../2_PasswordSection/PasswordSection.jsx';
import DeleteAccountSection from '../3_DeleteAccount/DeleteAccountSection';
import ProfileForm from './1.1_ProfileForm/ProfileForm.jsx';
import PrivacySettings from './1.3_PrivacySettings/PrivacySettings.jsx';
import ProfilePanel from '../ProfilePanel/ProfilePanel.jsx';
import './MisDatos.css';

export default function MisDatos() {
  const { cliente, logout } = useGlobalState();
  const navigate = useNavigate();
  const solid = useStickyHeader();

  return (
    <>
      <Navbar solid={solid} />
      <div className="md-shell">
        <aside className="md-aside"><SidebarTecnocasa /></aside>
        <section className="md-content">
          {/* Encabezado y secciones */}
          <div className="md-header">
            <h2>Perfil del usuario</h2>
            <p className="md-sub">Revisa y actualiza los datos de tu perfil</p>
            <p className="md-tip">Comprueba que tus <b>datos</b> estén actualizados.</p>
          </div>

          <div className="perfil-wrapper">
            <div className="perfil-grid">
              <div className="perfil-form-card">
                <h3 className="section-title">Tus datos</h3>
                <ProfileForm email={cliente?.cuenta?.email} />
                <h3 className="section-title">Contacto</h3>
                <PrivacySettings />
              </div>
              <aside className="profile-panel"><ProfilePanel /></aside>
            </div>
          </div>

          <PasswordSection email={cliente?.cuenta?.email} />
          <DeleteAccountSection logout={logout} navigate={navigate} />
        </section>
      </div>
    </>
  );
}
