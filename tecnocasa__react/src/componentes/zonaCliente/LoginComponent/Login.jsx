// Login.jsx
import React, { useState } from 'react';
import { validarRegistro } from '../../compGlobales/InputBoxComponent/InputBox.jsx';
import ErrorModal from '../../compGlobales/ErrorComponent/ErrorModal.jsx';
import SuccessModal from './SuccessModal.jsx';
import { Modal, Button, Form } from 'react-bootstrap';

export default function Login({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorModal(false);

  if (!validarRegistro(email, password)) {
    setErrorModal(true);
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('http://localhost:3000/api/Cliente/RegistroOLogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // sin credentials: 'include'
      body: JSON.stringify({ email, password })
    });

    let data = {};
    // intenta parsear JSON cuando no sea 204
    if (res.status !== 204) {
      data = await res.json().catch(() => ({}));
    }

    if (!res.ok || data?.ok === false) {
      // muestra el error del backend si lo hay
      console.error('Login/Registro error:', res.status, data?.error);
      setErrorModal(true);
      return;
    }

    // Éxito: guardar token y usuario
    const token = data.token;
    if (!token) {
      console.warn('Falta token en respuesta');
    } else {
      localStorage.setItem('authToken', token);
    }
    localStorage.setItem('userData', JSON.stringify(data.user));

    handleClose();
    setSuccessModal(true);
    setEmail('');
    setPassword('');

    // refrescar UI (idealmente dispara un setAuth global en lugar de reload)
    setTimeout(() => window.location.reload(), 800);
  } catch (e) {
    console.error('Excepción en Login:', e);
    setErrorModal(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <ErrorModal show={errorModal} onClose={() => setErrorModal(false)} />
      <SuccessModal show={successModal} onClose={() => setSuccessModal(false)} />

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdropClassName="custom-backdrop"
        backdrop="static"
      >
        <Modal.Body style={{ padding: '32px 28px', borderRadius: '24px' }}>
          <button onClick={handleClose} style={{ border: 'none', background: 'none', position: 'absolute', top: 18, right: 24, fontSize: 24, color: '#768', cursor: 'pointer' }}>&times;</button>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <div style={{ fontWeight: '600', fontSize: '1.09rem', marginBottom: 16 }}>
              Accede o regístrate para ver tus<br />búsquedas guardadas, modificar tu perfil<br />y mucho más
            </div>
            <Button variant="dark" style={{ width: '100%', borderRadius: 25, marginBottom: 14, padding: '10px 0', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.24em', marginRight: 8 }}></span> Apple
            </Button>
            <div style={{ width: '100%', height: 1, background: '#eee', margin: '18px 0' }}></div>
            <Form onSubmit={handleSubmit}>
              <Form.Group style={{ marginBottom: 17 }}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  style={{ borderRadius: 12, border: '1px solid #ccc', padding: '11px 14px', fontSize: '1rem' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  style={{ borderRadius: 12, border: '1px solid #ccc', padding: '11px 14px', fontSize: '1rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <div style={{ textAlign: 'left', marginBottom: 14 }}>
                <a href="#" style={{ color: '#25876d', fontSize: '0.98rem' }}>¿has olvidado tu contraseña?</a>
              </div>
              <Button variant="outline-dark" type="submit" style={{ width: '100%', borderRadius: 25, padding: '10px 0', fontWeight: 500 }} disabled={loading}>
                Acceder
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
