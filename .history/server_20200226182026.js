const express = require('express')

const app = express();

app.get('/', (re, res) => {
    res.send('This is working')
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
})



/* 
/--> res = this is working
/signin --> post
/register --> post