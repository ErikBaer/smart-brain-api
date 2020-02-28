const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const postgres = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'baerdata',
      password : 'Tusker1',
      database : 'smart-brain'
    }
  });

  console.log(postgres.select('*').from('users'))


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

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     //res === true
    // })

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
          res.json(database.users[0])  
        } else {
            res.status(400).json('error logging in')
        }
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body
    database.users.push( {
            id:'125',
            name:name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user)
            } 
        })
    res.status(404).send('no such user')
})
  
app.put('/image', (req, res) => {
    const {id} = req.body;
    database.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries)
            } 
        })
    res.status(404).send('Who are you, anyway?')
})

   

app.listen(3001, () => {
    console.log('App is running on port 3001')
})


