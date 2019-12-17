const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const uuidv1 = require("uuid/v1")


const commentPath = path.join(__dirname, "comments.json")
console.log(commentPath);

const readComments = async () => {
    const buffer = await fs.readFile(commentPath);
    return JSON.parse(buffer.toString())
}

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await readComments())

    console.log(await readComments())
})

router.post("/:id/:userName", async (req, res) => {
    const comments = await readComments()
    const newComment = {...req.body, 
        _id: uuidv1(), userName: req.params.userName, date: new Date(), bookId: req.params.id}

    comments.push(newComment)
    await fs.writeFile(commentPath, JSON.stringify(comments))

    res.send("Successful")

    console.log(await readComments())
})

router.put("/:id", async (req, res) => {
    const comments = await readComments()

    const comment = comments.find(c => c._id === req.params.id)

    const commentEdit = Object.assign(comment, req.body)
    const position = comments.indexOf(comment)
    comments[position] = commentEdit
    await fs.writeFile(commentPath, JSON.stringify(comments))
    res.send("Edited Successfully")
    console.log(await readComments())
})

module.exports = router;