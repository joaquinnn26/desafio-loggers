import nodemailer from "nodemailer"
import { logger } from "./utils.js";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "joaquinfefe@gmail.com",
      pass: "nhhp yxpp bshf srgo",
    },
  });

export const enviarCorreo = (destinatarios, asunto, contenido) => {
    const mailOptions = {
      from: 'joaquinfefe@gmail.com',
      to: destinatarios.join(', '),
      subject: asunto,
      text: contenido,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        logger.information('Correo electrónico enviado: ' + info.response);
      }
    });
  };

transporter.verify().then(() => {
    logger.information("Ready for send email")
}).catch((err) => {
    logger.error("error email")
});