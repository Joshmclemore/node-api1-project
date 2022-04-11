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
            req.status(500).json({
                message: "The users information could not be retrieved" 
            })
        });
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            req.status(500).json({
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
            req.status(500).json({
                message: "There was an error while saving the user to the database" 
            })
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
