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
    db.select('*').from('users').where({id})
    .then (user => {
        (user.length)
        ?res.json(user[0])
        :res.status(400).json('Sorry, could not connect to Database')
    })
    .catch(err => res.status(400).json('Sorry, there was an error'))
})
  
app.put('/image', (req, res) => {
    const {id} = req.body;
    db('')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then (entries  => {
        (entries.length)
        ?res.json(entries[0])
        :res.status(400).json('Unable to get count')
    })
    .catch(err => res.status(400).json('Unable to get count'))
})

   

app.listen(3001, () => {
    console.log('App is running on port 3001')
})


