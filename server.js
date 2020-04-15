const express = require('express');
const cors = require('cors')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json())
server.use(cors())
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

// server.use((req, res) => {
//     res.status(404).json({
//         message: "Route was not found"
//     })
// })

// //error handling
// server.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).json({
//         message: "There seems to be a glitch in the Matrix."
//     })
// })

//custom middleware

function logger(req, res, next) {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next()
}

module.exports = server;