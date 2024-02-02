import { createEmailTemplate } from "./generic.js";

export const createMailMessage = (name, token) => {
  let message = `
  Welcome to AAiT Book Store. We are excited to have you on board.In order to complete your registration, please verify your email address by clicking the link below.
    <p>Here is your verification link for your account <b>http://localhost:5000/api/users/verify/${token}</b> </p>
    `;
  return createEmailTemplate(name, message, false);
};

export const createVerifyMessage = (name) => {
  const message = `
    <p>Congratulations!</p>
    <p>Your Property Hub 360 account has been successfully activated.</p>
    <p>We are delighted to welcome you!</p>
    <br>
    <p>Warm regards,</p>
    <p>The Property Hub 360 Team</p>
    `;

  return createEmailTemplate(name, message, false);
};

export const createBookOrderMessage = (name, bookTitle, bookAuthor) => {
  const message = `
    <p>Thank you for ordering the book ${bookTitle} by ${bookAuthor}. You can pick the book on any working day of our book store.</p>
    <br>
    <p>Warm regards,</p>
    <p>The AAiT Book Store Team</p>
    `;

  return createEmailTemplate(name, message, false);
};