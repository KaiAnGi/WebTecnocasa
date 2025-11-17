// hooks/usePasswordChange.js
import { useReducer, useState, useCallback } from 'react';
import { actualizarPassword } from '../componentes/servicios/clienteServices';

const initial = { passwordAntiguo: '', passwordNuevo: '', errors: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, [action.name]: action.value, errors: { ...state.errors, [action.name]: null } };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'RESET':
      return initial;
    default:
      return state;
  }
}

export function usePasswordChange({ email }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [loading, setLoading] = useState(false);

  const validate = useCallback(() => {
    const err = {};
    if (!state.passwordAntiguo.trim()) err.passwordAntiguo = 'Introduce tu contraseña actual';
    if (!state.passwordNuevo.trim()) err.passwordNuevo = 'Introduce la nueva contraseña';
    if (state.passwordAntiguo && state.passwordNuevo && state.passwordAntiguo === state.passwordNuevo) {
      err.passwordNuevo = 'La nueva contraseña debe ser diferente';
    }
    return err;
  }, [state.passwordAntiguo, state.passwordNuevo]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  }, []);

  const submitWithCaptcha = useCallback(async (captchaToken) => {
    const errors = validate();
    if (Object.keys(errors).length) {
      dispatch({ type: 'SET_ERRORS', errors });
      throw new Error('Validación incompleta');
    }
    setLoading(true);
    try {
      await actualizarPassword({
        email,
        passwordAntiguo: state.passwordAntiguo,
        passwordNuevo: state.passwordNuevo,
        captchaToken,
      });
      dispatch({ type: 'RESET' });
    } finally {
      setLoading(false);
    }
  }, [email, state.passwordAntiguo, state.passwordNuevo, validate]);

  return { state, errors: state.errors, loading, onChange, submitWithCaptcha };
}
