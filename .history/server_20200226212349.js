const express = require('express')

const app = express();

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

app.get('/', (re, res) => {
    res.send('This is working')
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
          res.json('success')  
        } else {
            res.status(400).json('error logging in')
        }
})


app.listen(3000, () => {
    console.log('App is running on port 3000')
})



/* 
/--> res = this is working
/signin --> post = success/fail
/register --> post = user 
/profile/:userid --> get = user
/image --> put = user.rank
*/