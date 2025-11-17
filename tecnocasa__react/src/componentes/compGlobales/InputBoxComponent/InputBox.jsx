export function validarRegistro(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/; 
  return emailRegex.test(email) && passwordRegex.test(password);
}
