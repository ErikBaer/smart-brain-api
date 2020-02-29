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
      host : '127.0.0.1',
      user : 'baerdata',
      password : 'Tusker1',
      database : 'smart-brain'
    }
  });

//   db.select('*').from('users').then(data => {
//       console.log(data)
//   })


const app = express();

app.use(express.json());

app.use(cors())

const database = {
    users: [
        {
            id:'123',
            name:'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {res.send(database.users)})

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

// Advanced Syntax below, exactly same result as above.
// (req,res) gets passed automatically.

app.post('/signin', signIn.handleSignIn(db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db))
  
app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageurl', (req, res) => image.handleImage(req, res, db))
   

app.listen(3001, () => {
    console.log('App is running on port 3001')
})


