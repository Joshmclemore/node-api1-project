// BUILD YOUR SERVER HERE

const express = require('express')

const User = require('./users/model')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.end('<h1> Hello, world!</h1>');
});

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved" 
            })
        });
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist" 
                })
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved" 
            })
        });
})

server.post('/api/users', (req, res) => {
    let user = req.body
    User.insert(user)
        .then(user => {
            if(!user.name || !user.bio) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            } else {
                res.status(201).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database" 
            })
        })
})



server.delete('/api/users/:id', async (req, res) => {
    try{
        const possibleUser = await User.findById(req.params.id)
        if(!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            const deletedUser = await User.remove(possibleUser.id)
            res.status(200).json(deletedUser)
        } }
    catch (err) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if(!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else if ( !req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const updatedUser = await User.update(req.params.id, req.body)
            res.status(200).json(updatedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be modified'
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
