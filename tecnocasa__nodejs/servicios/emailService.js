// emailService.js
const mailjet = require('node-mailjet');
require('dotenv').config();

const mj = mailjet
  .apiConnect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY)
  .post('send', { version: 'v3.1' });

const enviarEmailConfirmacion = async (email, token) => {
  const confirmationUrl = `${process.env.FRONTEND_URL}/confirmar-email?token=${token}`;
  
  const request = {
    Messages: [
      {
        From: {
          Email: process.env.EMAIL_FROM,
          Name: 'Tecnocasa'
        },
        To: [
          {
            Email: email,
            Name: 'Cliente'
          }
        ],
        Subject: 'Confirma tu email en Tecnocasa',
        HTMLPart: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #25876d; color: white; padding: 20px; text-align: center; border-radius: 8px; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .btn { display: inline-block; background-color: #25876d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Bienvenido a Tecnocasa!</h1>
              </div>
              <div class="content">
                <p>Hola ${email},</p>
                <p>Gracias por registrarte. Para activar tu cuenta, confirma tu email haciendo clic en el siguiente botón:</p>
                <a href="${confirmationUrl}" class="btn">Confirmar Email</a>
                <p style="color: #999; font-size: 14px; margin-top: 20px;">
                  O copia este enlace en tu navegador:
                  <br><small>${confirmationUrl}</small>
                </p>
                <p>Este enlace expirará en 24 horas.</p>
              </div>
              <div class="footer">
                <p>© 2025 Tecnocasa. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
          </html>
        `
      }
    ]
  };

  try {
    const result = await mj.request(request);
    console.log(`✅ Email enviado a ${email} (Mailjet)`);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email con Mailjet:', error.message);
    return false;
  }
};

module.exports = { enviarEmailConfirmacion };
