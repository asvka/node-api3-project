const express = require('express')
const server = require('./server')
const port = process.env.PORT || 7777


//listen
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})