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



app.post('/api/createSurvey', async (req, res) => {
  try {
    const { survey_name, admin_id } = req.body;
    const queryText = 'INSERT INTO surveys (survey_name, admin_id) VALUES ($1, $2) RETURNING *';
    const values = [survey_name, admin_id];
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error creating survey');
  }
});

app.post('/api/createQuestion', async (req, res) => {
  try {
    const { survey_id, question_text, question_type } = req.body;
    const queryText = 'INSERT INTO questions (survey_id, question_text, question_type) VALUES ($1, $2, $3) RETURNING *';
    const values = [survey_id, question_text, question_type];
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error creating question');
  }
});

// Soruyu güncellemek için PUT isteği
app.put('/api/updateQuestion/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { survey_id, question_text, question_type } = req.body;
    const queryText = 'UPDATE questions SET survey_id = $1, question_text = $2, question_type = $3, last_updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';
    const values = [survey_id, question_text, question_type, questionId];
    const result = await pool.query(queryText, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error updating question');
  }
});


// Yeni bir soru seçeneği oluşturmak için POST isteği
app.post('/api/createQuestionOption', async (req, res) => {
  try {
    const { question_id, option_text, option_letter, is_correct } = req.body;
    const queryText = 'INSERT INTO question_options (question_id, option_text, option_letter, is_correct) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [question_id, option_text, option_letter, is_correct];
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error creating question option');
  }
});

// Soru seçeneğini güncellemek için PUT isteği
app.put('/api/updateQuestionOption/:id', async (req, res) => {
  try {
    const optionId = req.params.id;
    const { question_id, option_text, option_letter, is_correct } = req.body;
    const queryText = 'UPDATE question_options SET question_id = $1, option_text = $2, option_letter = $3, is_correct = $4, last_updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
    const values = [question_id, option_text, option_letter, is_correct, optionId];
    const result = await pool.query(queryText, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error updating question option');
  }
});





