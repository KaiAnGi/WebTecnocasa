// services/clienteService.js
export async function actualizarPassword({ email, passwordAntiguo, passwordNuevo, captchaToken }) {
  const res = await fetch('http://localhost:3000/api/Cliente/ActualizarPassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, passwordAntiguo, passwordNuevo, captchaToken }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || `Error ${res.status} al actualizar la contraseña`);
  }
  return data;
}

export async function deleteSelf({ captchaToken }) {
  const resp = await fetch('/api/usuarios/me', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // imprescindible con express-session [web:110]
    body: JSON.stringify({ recaptchaToken: captchaToken }),
  });
  if (resp.status === 204) return { ok: true };
  const data = await resp.json().catch(() => ({}));
  if (resp.status === 404 || resp.status === 401) {
    throw new Error(data?.message || 'Sesión expirada o usuario no encontrado'); // UX claro
  }
  if (!resp.ok) throw new Error(data?.message || `Error ${resp.status} al borrar la cuenta`);
  return data;
}
