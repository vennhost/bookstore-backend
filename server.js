const express = require("express")
const booksRouter = require("./src/books")
const commentsRouter = require("./src/comments")
const cors = require("cors")
require('dotenv').config()

const server = express();

var whitelist = ['http://localhost:3000', 'http://localhost:3001', 
                 'http://m5-d7-oct19-fe.herokuapp.com', 'https://vennbook.herokuapp.com/', 'http://vennbook.herokuapp.com/', 'https://m5-d7-oct19-fe.herokuapp.com', process.env.FE_URL]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// this allows HEROKU (or whatever else cloud system) to select the PORT that is free for him
const port = process.env.PORT || 3002

/* console.log(process.env.USER)
console.log(process.env.FE_URL) */

//server.use()
server.use(express.json())

server.use("/books", cors(corsOptions), booksRouter)
server.use("/comments", commentsRouter)
server.get("/test", (req, res) => {
    res.send("working!!!")
})

server.listen(port, () => {
    console.log("I'm listening on port " + port)
})