const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex ({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
    }
  });

//   db.select('*').from('users').then(data => {
//       console.log(data)
//   })


const app = express();

app.use(express.json());

app.use(cors())


app.get('/', (req, res) => {res.send('It is working')})

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

// Advanced Syntax below, exactly same result as above.
// (req,res) gets passed automatically.

app.post('/signin', signIn.handleSignIn(db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db))
  
app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))
   

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})


