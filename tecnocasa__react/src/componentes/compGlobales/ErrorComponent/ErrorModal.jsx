// ErrorModal.jsx
import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="error-modal-backdrop">  {/* Cambiado */}
      <div className="error-modal-content">  {/* Cambiado */}
        <img
          src="/images/Error.png"
          alt="Error"
          style={{ width: 120, margin: '24px auto 18px' }}
        />
        <h2 className="modal-atencion">Atención!</h2>
        <div className="modal-text">
          Introduce una dirección de correo electrónico válida<br/>
          y contraseña debe tener al menos 8 caracteres y
          contener al menos una letra y un número.
        </div>
        <button onClick={onClose} className="modal-btn-cerrar">Cerrar</button>
      </div>
    </div>
  );
};

export default ErrorModal;
