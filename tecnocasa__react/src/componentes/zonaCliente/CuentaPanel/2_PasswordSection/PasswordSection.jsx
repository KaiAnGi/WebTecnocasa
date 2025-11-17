// components/zonaCliente/CuentaPanel/2_PasswordSection/PasswordSection.jsx
import { useState } from 'react';
import { usePasswordChange } from '../../../../hooks/usePasswordChange';
import { useRecaptchaV2 } from '../../../../hooks/useRecaptchaV2';
import CaptchaModal from '../../../compGlobales/CaptchaModal/CaptchaModal.jsx';
import SuccessModal from '../../LoginComponent/SuccessModal';

export default function PasswordSection({ email }) {
  const { state, errors, loading, onChange, submitWithCaptcha } = usePasswordChange({ email });
  const { recaptchaRef, completed, onChange: onCaptchaChange, reset, getToken } = useRecaptchaV2();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCaptcha, setOpenCaptcha] = useState(false);

  const onClickPrimary = () => setOpenConfirm(true);

  const confirmChange = () => {
    setOpenConfirm(false);
    setOpenCaptcha(true);
    reset();
  };

  const onConfirmCaptcha = async () => {
    const token = getToken();
    if (!token) return;
    await submitWithCaptcha(token);
    setOpenCaptcha(false);
    reset();
    alert('Contraseña actualizada correctamente');
  };

  return (
    <section className="md-card">
      <h3>Modificar Contraseña</h3>
      <div className="md-grid2">
        <div className="md-form-group">
          <label htmlFor="passwordAntiguo">Contraseña Actual</label>
          <input id="passwordAntiguo" name="passwordAntiguo" value={state.passwordAntiguo} onChange={onChange} type="password" placeholder="tu-contraseña-actual" disabled={loading} />
          {errors.passwordAntiguo && <div className="md-invalid">{errors.passwordAntiguo}</div>}
        </div>
        <div className="md-form-group">
          <label htmlFor="passwordNuevo">Nueva Contraseña</label>
          <input id="passwordNuevo" name="passwordNuevo" value={state.passwordNuevo} onChange={onChange} type="password" placeholder="tu-nueva-contraseña" disabled={loading} />
          {errors.passwordNuevo && <div className="md-invalid">{errors.passwordNuevo}</div>}
        </div>
      </div>
      <div className="md-actions">
        <button type="button" className="md-btn-primary" onClick={onClickPrimary} disabled={loading}>Modificar Contraseña</button>
      </div>

      {/* modal confirmación simple */}
        <SuccessModal/>
      {/* Podrías usar el SuccessModal reutilizable aquí */}

      <CaptchaModal
        open={openCaptcha}
        title="Verificación de Seguridad"
        onClose={() => { setOpenCaptcha(false); reset(); }}
        onConfirm={onConfirmCaptcha}
        recaptchaRef={recaptchaRef}
        onCaptchaChange={onCaptchaChange}
        disabled={loading || !completed}
        confirmLabel={loading ? 'Guardando...' : 'Confirmar'}
      />
    </section>
  );
}
