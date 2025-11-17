// components/zonaCliente/CuentaPanel/3_DeleteAccount/DeleteAccountSection.jsx
import { useState } from 'react';
import { useDeleteAccount } from '../../../../hooks/useDeleteAccount';
import { useRecaptchaV2 } from '../../../../hooks/useRecaptchaV2';
import CaptchaModal from '../../../compGlobales/CaptchaModal/CaptchaModal.jsx';

export default function DeleteAccountSection({ logout, navigate }) {
  const { loading, error, setError, confirmAndDelete } = useDeleteAccount({ logout, navigate });
  const { recaptchaRef, completed, onChange: onCaptchaChange, reset, getToken } = useRecaptchaV2();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCaptcha, setOpenCaptcha] = useState(false);

  const startDelete = () => {
    if (!window.confirm('Esta acción eliminará definitivamente tu cuenta y no se puede deshacer. ¿Deseas continuar?')) return;
    setOpenCaptcha(true);
    reset();
    setError('');
  };

  const onConfirmCaptcha = async () => {
    const token = getToken();
    if (!token) {
      setError('Completa el CAPTCHA para continuar.');
      return;
    }
    try {
      await confirmAndDelete(token);
    } finally {
      setOpenCaptcha(false);
      reset();
    }
  };

  return (
    <section className="md-section">
      <h3>Borrar usuario</h3>
      <p className="md-danger-note">Puedes eliminar tu Perfil Tecnocasa en cualquier momento. Sin embargo, si cambias de opinión no podrás recuperarlo.</p>
      <a className="md-link-danger" href="#" onClick={(e) => { e.preventDefault(); startDelete(); }}>
        Borrar usuario
      </a>

      <CaptchaModal
        open={openCaptcha}
        title="Confirmar eliminación de cuenta"
        onClose={() => { setOpenCaptcha(false); reset(); setError(''); }}
        onConfirm={onConfirmCaptcha}
        recaptchaRef={recaptchaRef}
        onCaptchaChange={onCaptchaChange}
        disabled={loading || !completed}
        confirmLabel={loading ? 'Eliminando...' : 'Eliminar definitivamente'}
      />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </section>
  );
}
