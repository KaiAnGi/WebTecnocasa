// SuccessModal.jsx
import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="modal-backdrop-success">
      <div className="modal-success">
        <img
          src="/images/Success.png"
          alt="Éxito"
          style={{ width: 120, margin: '24px auto 18px' }}
        />
        <h2 className="modal-titulo-exito">Todo correcto</h2>
        <div className="modal-text-exito">
          Revisa tu email, te hemos enviado las instrucciones<br/>
          para completar tu registro
        </div>
        <button onClick={onClose} className="modal-btn-cerrar-exito">Cerrar</button>
      </div>
    </div>
  );
};

export default SuccessModal;
