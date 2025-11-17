// servicios/verifyCaptchaService.js
async function verifyRecaptchaV2(token, remoteip) {
  if (!process.env.RECAPTCHA_SECRET) {
    console.warn('RECAPTCHA_SECRET no definido; verificación deshabilitada');
    return true; // en desarrollo puedes permitir; en prod debe ser obligatorio
  }
  const params = new URLSearchParams();
  params.append('secret', process.env.RECAPTCHA_SECRET);
  params.append('response', token || '');
  if (remoteip) params.append('remoteip', remoteip);

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  const data = await resp.json().catch(() => ({}));
  if (!data?.success) {
    console.warn('reCAPTCHA falló:', data?.['error-codes']);
  }
  return !!data?.success;
}

module.exports = { verifyRecaptchaV2 };