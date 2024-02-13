const express = require('express');
const app = express();

const { Pool } = require('pg'); // pg modülünü ekledik
const cors = require('cors'); // cors modülünü ekledik
app.use(cors()); // CORS başlıklarını ekledik

app.use(express.json());
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'anketweb',
  password: '1234',
  port: 5432, // Varsayılan PostgreSQL portu
});

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/users', (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  pool.query('INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, phoneNumber, email, password],
    (error, results) => {
      if (error) {
        console.error('Veritabanına kayıt eklenirken hata oluştu: ', error);
        return res.status(500).send('Veritabanına kayıt eklenirken hata oluştu');
      }
      console.log('Veritabanına kayıt başarıyla eklendi');
      return res.status(201).send(`Kullanıcı eklendi: ${firstName} ${lastName}`);
    });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Veritabanında kullanıcının varlığını ve şifresini kontrol et
  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).send('Bir hata oluştu');
    }

    if (results.rows.length > 0) {
      // Kullanıcı var, giriş başarılı
      console.log('Giriş başarılı, Hoş geldiniz');

      return res.status(200).send(`Giriş başarılı, Hoş geldiniz ${results.rows[0].first_name} ${results.rows[0].last_name}!`);
    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).send('E-posta veya şifre hatalı');
    }
  });
});



