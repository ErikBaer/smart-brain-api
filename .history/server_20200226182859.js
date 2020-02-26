const express = require('express')

const app = express();

const database = {
    users: [
        {
            id:'123',
            name:'John',
            
        }
    ]
}

app.get('/', (re, res) => {
    res.send('This is working')
})

app.post('/signin', (req, res) => {
    res.json('signin')
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