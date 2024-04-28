const express = require('express');
const User = require('./models/user');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const app = express();
const { Pool } = require('pg'); // pg modülünü ekledik
const cors = require('cors'); // cors modülünü ekledik
app.use(cors()); // CORS başlıklarını ekledik
app.use(bodyParser.json());


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
  let userData = req.body;
  let user = new User(userData);
  console.log(req.body)
  const { first_name, last_name, phone_number, email, password } = user;
  pool.query('INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
    [first_name, last_name, phone_number, email, password],
    (error, results) => {
      if (error) {
        console.error('Veritabanına kayıt eklenirken hata oluştu: ', error);
        return res.status(500).json({ status: 500, message: 'Veritabanına kayıt eklenirken hata oluştu' });
      }
      let payload = {subject: results.id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
      console.log('Normal Kullanici başarıyla kaydedildi');
      console.log(token);
      

      //return res.status(201).json({ status: 201, message: 'Kullanıcı başarıyla eklenmiştir', user });
    });
});


app.post('/api/login', (req, res) => {
  let userData = req.body

  // Veritabanında kullanıcının varlığını ve şifresini kontrol et
  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [userData.email, userData.password], (error, user) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
    }

    if (user.rows.length > 0) {
      // Kullanıcı var, giriş başarılı
      console.log('Normal Kullanici Giriş başarılı, Hoş geldiniz' + user.rows[0].id, user.rows[0].phone_number);
      let payload = {subject: user.id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})

    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
    }
  });
});

  app.post('/api/adminlogin',(req, res) => {
    let userData = req.body
  
    // Veritabanında kullanıcının varlığını ve şifresini kontrol et
    pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [userData.email, userData.password], (error, user) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }
  
      if (user.rows.length > 0) {
        // Kullanıcı var, giriş başarılı
        console.log('Giriş başarılı, Hoş geldiniz' + user.rows[0].id, user.rows[0].phone_number);
        let payload = {subject: user.id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})

      } else {
        console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
        // Kullanıcı yok veya şifre yanlış
        return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
      }
    });
  });
app.post('/api/normalKullaniciInfo',(req, res) => {
  let userData = req.body

     // Veritabanında kullanıcının varlığını ve şifresini kontrol et
  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [userData.email, userData.password], (error, user) => {
    if (error) {
      console.error('Veritabanı hatası: ', error);
      return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
    }

    if (user.rows.length > 0) {
      // Kullanıcı var, giriş başarılı
      console.log('Bilgiler bulundu ve getirildi : ' + user.rows[0].id,user.rows[0].first_name,user.rows[0].last_name,user.rows[0].phone_number,user.rows[0].email,user.rows[0].password);
      const userInfo = user.rows[0];

          // Değişkeni response olarak gönder
          res.status(200).send(userInfo);

    } else {
      console.error(error);
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: error });
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.id = payload.subject
  next()
}

app.post('/api/admins', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  console.log(req.body)
  // Kullanıcının özelliklerine erişerek ilgili alanları al
  const { first_name, last_name, phone_number, email, password } = user;
  // Veritabanına admini kaydet
  pool.query('INSERT INTO admins (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
    [first_name, last_name, phone_number, email, password],
    (error, results) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }
      let payload = {subject: results.id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
      console.log('Admin başarıyla kaydedildi');
      console.log(token);
      //return res.status(200).json({ status: 200, message: 'Admin başarıyla kaydedildi' });
    });
  })


  app.post('/api/adminlogin',(req, res) => {
    let userData = req.body
  
    // Veritabanında kullanıcının varlığını ve şifresini kontrol et
    pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [userData.email, userData.password], (error, user) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }
  
      if (user.rows.length > 0) {
        // Kullanıcı var, giriş başarılı
        console.log('Giriş başarılı, Hoş geldiniz' + user.rows[0].id, user.rows[0].phone_number);
        let payload = {subject: user.id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})

      } else {
        console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
        // Kullanıcı yok veya şifre yanlış
        return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
      }
    });
  });

  app.post('/api/admininfo',(req, res) => {
    let userData = req.body
  
       // Veritabanında kullanıcının varlığını ve şifresini kontrol et
    pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [userData.email, userData.password], (error, user) => {
      if (error) {
        console.error('Veritabanı hatası: ', error);
        return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }
  
      if (user.rows.length > 0) {
        // Kullanıcı var, giriş başarılı
        console.log('Bilgiler bulundu ve getirildi : ' + user.rows[0].id,user.rows[0].first_name,user.rows[0].last_name,user.rows[0].phone_number,user.rows[0].email,user.rows[0].password);
        const userInfo = user.rows[0];

            // Değişkeni response olarak gönder
            res.status(200).send(userInfo);

      } else {
        console.error(error);
        // Kullanıcı yok veya şifre yanlış
        return res.status(401).json({ status: 401, message: error });
      }
    });
  });


  app.post('/api/questions', (req, res) => {
    const tiklananAnketId = req.body.tiklananAnketId;

    pool.query('SELECT * FROM questions WHERE survey_id = $1', [tiklananAnketId], (error, queryResult) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
        }

        if (queryResult.rows.length > 0) {
            // Sorular bulundu, başarılı olarak döndür
            const questions = queryResult.rows;
            console.log('Bilgiler bulundu ve getirildi : ' + questions);
            res.status(200).json(questions);
        } else {
            console.error(error);
            // Hiçbir soru bulunamadı
            return res.status(404).json({ status: 404, message: 'Soru bulunamadı' });
        }
    });
});



app.post('/api/questionOptions', (req, res) => {
  const questionId = req.body.question_id;

  // Eğer question_id gönderilmediyse, hata döndür
  if (!questionId) {
      return res.status(400).json({ status: 400, message: 'Soru ID gereklidir' });
  }

  pool.query('SELECT * FROM question_options WHERE question_id = $1', [questionId], (error, queryResult) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
      }

      if (queryResult.rows.length > 0) {
          // Seçenekler bulundu, başarılı olarak döndür
          const options = queryResult.rows;
          console.log('OPTIONS : ' ,options);

          res.status(200).json(options);
      } else {
          // Belirtilen soru için seçenek bulunamadı
          return res.status(404).json({ status: 404, message: 'Belirtilen soru için seçenek bulunamadı' });
      }
  });
});



app.get('/usersAll', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    res.json(users);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error fetching users from database');
  }
});




// Anketleri getiren endpoint
app.get('/api/surveys', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM surveys');
    const surveys = result.rows;
    res.json(surveys);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});








   /*pool.query('SELECT * FROM questions', (error, res) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: 'Bir hata oluştu' });
    }

    if (res.rows.length > 0) {
      // Soru var, soru getirme başarılı
      console.log('Bilgiler bulundu ve getirildi : ' + res);
                // Değişkeni response olarak gönder
          res.status(200).send(res.rows[0]);

    } else {
      console.error(error);
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: error });
    }
  });*/





  /*
  app.post('/api/adminLogin', (req, res) => {
    let userData = req.body
    pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [userData.email, userData.password], (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user.id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    });
  })
*/

  // Veritabanında kullanıcının varlığını ve şifresini kontrol et




/*app.post('/api/admins', (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  // Veritabanına admini kaydet
  pool.query('INSERT INTO admins (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
    [first_name, last_name, phone_number, email, password],
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

      return res.status(200).json({ status: 200, message: 'Giriş başarılı', admin });
    } else {
      console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
      // Kullanıcı yok veya şifre yanlış
      return res.status(401).json({ status: 401, message: 'E-posta veya şifre hatalı' });
    }
  });
});
*/
// Define the endpoint for retrieving admin information by ID
/*app.get('/api/admins/:adminId', (req, res) => {
  const { adminId } = req.params;

  // Query the database to retrieve admin information
  pool.query('SELECT * FROM admins WHERE id = $1', [adminId], (error, results) => {
    if (error) {
      console.error('Error retrieving admin information:', error);
      return res.status(500).json({ status: 500, message: 'Error retrieving admin information' });
    }

    // Check if admin with the given ID exists
    if (results.rows.length === 0) {
      return res.status(404).json({ status: 404, message: 'Admin not found' });
    }

    // Admin found, return the admin information
    const admin = results.rows[0];
    return res.status(200).json({ status: 200, message: 'Admin information retrieved successfully', admin });
  });
});*/
