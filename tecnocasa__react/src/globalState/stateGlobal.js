// globalState/stateGlobal.js
import { create } from 'zustand';

const LOCALSTORAGE_KEYS = {
  cliente: 'cliente',
  authToken: 'authToken'
};

const leerLS = (k) => {
  try { return JSON.parse(localStorage.getItem(k)); } catch { return null; }
};
const escribirLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const borrarLS = (k) => localStorage.removeItem(k);

const useGlobalState = create((set, get) => {
  return {
    // Estado base
    cliente: leerLS(LOCALSTORAGE_KEYS.cliente) || null, 
    authToken: leerLS(LOCALSTORAGE_KEYS.authToken) || null,

    // Acciones de sesión
    setCliente: (nuevoDatoCliente) => {
      // Merge superficial para mantener sub-estructura { cuenta, datosPersonales, ... }
      const actual = get().cliente || {};
      const actualizado = { ...actual, ...nuevoDatoCliente };
      set({ cliente: actualizado });
      escribirLS(LOCALSTORAGE_KEYS.cliente, actualizado);
    },

    setAuthToken: (token) => {
      set({ authToken: token });
      if (token) escribirLS(LOCALSTORAGE_KEYS.authToken, token);
      else borrarLS(LOCALSTORAGE_KEYS.authToken);
    },

    login: ({ cliente, token }) => {
      set({ cliente, authToken: token });
      escribirLS(LOCALSTORAGE_KEYS.cliente, cliente);
      escribirLS(LOCALSTORAGE_KEYS.authToken, token);
    },

    logout: () => {
      set({ cliente: null, authToken: null });
      borrarLS(LOCALSTORAGE_KEYS.cliente);
      borrarLS(LOCALSTORAGE_KEYS.authToken);
    },

    // Acciones de perfil (usadas por MisDatos/Perfil)
    actualizarDatosPersonalesLocal: (parcial) => {
      const actual = get().cliente || {};
      const cuenta = actual.cuenta || {};
      const datosPersonales = {
        ...(actual.datosPersonales || {}),
        ...parcial
      };
      const actualizado = { ...actual, datosPersonales, cuenta };
      set({ cliente: actualizado });
      escribirLS(LOCALSTORAGE_KEYS.cliente, actualizado);
    },

    actualizarCuentaLocal: (parcialCuenta) => {
      const actual = get().cliente || {};
      const cuenta = { ...(actual.cuenta || {}), ...parcialCuenta };
      const actualizado = { ...actual, cuenta };
      set({ cliente: actualizado });
      escribirLS(LOCALSTORAGE_KEYS.cliente, actualizado);
    },

    // Helpers típicos
    isLoggedIn: () => !!get().authToken && !!get().cliente,
    getEmail: () => get().cliente?.cuenta?.email || '',
    getNombreCompleto: () => {
      const dp = get().cliente?.datosPersonales || {};
      return [dp.nombre, dp.apellidos].filter(Boolean).join(' ');
    }
  };
});

export default useGlobalState;
