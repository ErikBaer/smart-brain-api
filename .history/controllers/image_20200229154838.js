const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f7738781c1e0443593a11eec5113e608'
   });

   const handleApiCall = (req, res) => {}
   app.models
   .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then (entries  => {
        (entries.length)
        ?res.json(entries[0])
        :res.status(400).json('Unable to get count')
    })
    .catch(err => res.status(400).json('Unable to connect'))
}

module.exports = {
    imageHandler : imageHandler
}