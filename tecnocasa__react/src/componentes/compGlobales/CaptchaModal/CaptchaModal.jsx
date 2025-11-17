// components/compGlobales/CaptchaModal/CaptchaModal.jsx
import ReCAPTCHA from 'react-google-recaptcha';

export default function CaptchaModal({ open, title, onClose, onConfirm, recaptchaRef, onCaptchaChange, confirmLabel = 'Confirmar', disabled }) {
  if (!open) return null;
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={disabled}></button>
            </div>
            <div className="modal-body">
              <p>Por favor completa el CAPTCHA para continuar:</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITEKEY}
                  onChange={onCaptchaChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} disabled={disabled}>Cancelar</button>
              <button className="btn btn-primary" onClick={onConfirm} disabled={disabled}> {disabled ? 'Procesando...' : confirmLabel} </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
