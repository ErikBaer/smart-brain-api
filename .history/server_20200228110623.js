const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

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
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then (user => res.json(user[0]))
    .catch(err => res.status(400).json('Sorry, unable to register'))
    
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then (user => {
        console.log(user);
    })
    .then (res.status(200).send(res.json()))
    
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         return res.json(user)
    //         } 
    //     })
    // res.status(200).send('no such user')
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


