import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config({path: '.env'});

export const sendResetEmail = async (email: string , token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // O el proveedor que uses
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: '"Tu App" <noreply@tuapp.com>',
    to: email,
    subject: 'Restablece tu contraseña',
    html: `
      <p>Haz solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
      <a href="${resetURL}">Restablecer contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  });
};


