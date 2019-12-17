const express = require("express")
const fs = require("fs-extra")
const path = require("path")


const commentPath = path.join(__dirname, "comments.json")
console.log(commentPath);

const readComments = async () => {
    const buffer = await fs.readFile(commentPath);
    return JSON.parse(buffer.toString())
}

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await readComments())

    console.log(readComments())
})
module.exports = router;