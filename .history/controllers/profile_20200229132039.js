const handleGetProfile = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then (user => {
        (user.length)
        ?res.json(user[0])
        :res.status(400).json('Sorry, could not connect to Database')
    })
    .catch(err => res.status(400).json('Sorry, there was an error'))
}

module.exports = {
    handleGetProfile
}