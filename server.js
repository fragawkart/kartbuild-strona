const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Endpoint do zamówień
app.post('/order', async (req, res) => {
  const { name, email, product, message } = req.body;

  // UZUPEŁNIJ SWÓJ ADRES E-MAIL I HASŁO APLIKACJI!
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kartbuildtest1@gmail.com',      // ← tu swój Gmail
      pass: 'cfct ojtt mgtg ywmv',     // ← tu hasło aplikacji z Google (NIE zwykłe hasło!)
    },
  });

  let mailOptions = {
    from: `"KartBuild Zamówienia" <kartbuildtest1@gmail.com>`, // od kogo
    to: 'kartbuildtest1@gmail.com',   // do kogo (możesz ten sam)
    subject: 'Nowe zamówienie ze strony KartBuild',
    text:
      `Imię i nazwisko: ${name}\n` +
      `eMail: ${email}\n` +
      `Produkt: ${product}\n` +
      `Wiadomość: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Zamówienie wysłane!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd przy wysyłce zamówienia.' });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
