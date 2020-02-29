const imageHandler = (req, res, db) => {
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