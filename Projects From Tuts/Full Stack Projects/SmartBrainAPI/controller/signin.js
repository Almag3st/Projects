const signinHandler = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json('unable to register')

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash, function (err, result) {
                if (result) {
                    return db.select('*').from('users').where('email', '=', email)
                        .then(user => res.json(user[0]))
                        .catch(err => res.status(400).json('unable to get user'))
                } else {
                    res.status(400).json('wrong combination')
                }
            })
        })
        .catch(err => res.status(400).json('error loggin in'))
}
module.exports = {
    signinHandler
}