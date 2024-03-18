const express = require('express');

const jwt = require('jsonwebtoken'); // JWT modülünü ekledik
const crypto = require('crypto');


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
  pool.query('INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [firstName, lastName, phoneNumber, email, password],
    (error, results) => {
      if (error) {
        console.error('Veritabanına kayıt eklenirken hata oluştu: ', error);
        return res.status(500).json({ status: 500, message: 'Veritabanına kayıt eklenirken hata oluştu' });
      }
      console.log('Veritabanına kayıt başarıyla eklendi');
      const user = results.rows[0];
      

      return res.status(201).json({ status: 201, message: 'Kullanıcı başarıyla eklenmiştir', user });
    });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Veritabanında kullanıcının varlığını ve şifresini kontrol et
  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
    }

    if (results.rows.length > 0) {
      // Kullanıcı var, giriş başarılı
      console.log('Giriş başarılı, Hoş geldiniz');
      const user = results.rows[0];

      //const secretKey = crypto.randomBytes(32).toString('hex');
      const secretKey = '12345'

console.log(secretKey);
      const token = jwt.sign({ id: user.id, role: 'user' }, secretKey, { expiresIn: '1h' });

      return res.status(200).json({ status: 200, message: 'Giriş başarılı', user });
    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/api/admins', (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  // Veritabanına admini kaydet
  pool.query('INSERT INTO admins (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, phoneNumber, email, password],
    (error, results) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }

      console.log('Admin başarıyla kaydedildi');
      return res.status(200).json({ status: 200, message: 'Admin başarıyla kaydedildi' });
    });
});



app.post('/api/adminlogin', (req, res) => {
  const { email, password } = req.body;

  // Veritabanında kullanıcının varlığını ve şifresini kontrol et
  pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
    }

    if (results.rows.length > 0) {
      // Kullanıcı var, giriş başarılı
      console.log('Giriş başarılı, Hoş geldiniz');
      const admin = results.rows[0];

      //const secretKey = crypto.randomBytes(32).toString('hex');
      const secretKey = '123456'

      console.log(secretKey);
      const token = jwt.sign({ id: admin.id, role: 'admin' }, secretKey, { expiresIn: '1h' });

      console.log('Sunucudan Gelen Kullanıcı Bilgileri:', admin.id); // Bu satır eklenmiş olmalı

      return res.status(200).json({ status: 200, message: 'Giriş başarılı', admin, token });

      //return res.status(200).json({ status: 200, message: 'Giriş başarılı', admin });
    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
    }
  });
});


// index.js

app.post('/api/getUserInfo', (req, res) => {


  const adminID = req.body.id; // Varsayalım ki kullanıcının ID'si request nesnesinde bulunuyor.
  console.log('BODY: ',req.body);
  console.log('ADMIN ID : ',req.id);
  if (!adminID) {
    return res.status(401).json({ status: 401, message: 'Yetkisiz erişim. Kullanıcı ID bulunamadı.' });
  }
  
  
  pool.query('SELECT * FROM admins WHERE id = $1', [adminID], (error, results) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).json({ status: 500, message: 'Kullanıcı bilgileri alınamadı' });
    }

    if (results.rows.length > 0) {
      const user = results.rows[0];

      return res.status(200).json({ status: 200, user });
    } else {
      return res.status(404).json({ status: 404, message: 'Kullanıcı bulunamadı' });
    }
  });
});

