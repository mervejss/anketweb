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
      const user = results.rows[0];
      return res.status(200).json({ status: 200, message: 'Giriş başarılı', user });
    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
    }
  });
});

// Kullanıcı bilgilerini çeken endpoint
app.get('/api/getUserInfo', (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    // Token içerisindeki kullanıcı bilgilerini çıkarma
    const decodedToken = jwt.verify(token, "authToken");
    const userId = decodedToken.id;

    // Veritabanından kullanıcı bilgilerini çekme
    pool.query('SELECT * FROM admins WHERE id = $1', [userId], (error, results) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }

      if (results.rows.length > 0) {
        const userInfo = results.rows[0];
        res.json(userInfo);
      } else {
        res.status(401).json({ message: 'Kullanıcı bulunamadı' });
      }
    });
  } catch (error) {
    console.error('Token doğrulama hatası: ', error);
    res.status(401).json({ message: 'Token doğrulanamadı' });
  }
});
