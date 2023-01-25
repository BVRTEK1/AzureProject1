const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://azure-project1:FZT4nr6Qw3CwYScH3AFIAPBLB0K4E9feRr41bJ8gXuyPsRSdKRItZdesiKqitldvWkpGhwWkCIscACDbdoQawA==@azure-project1.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azure-project1@';
const client = new MongoClient(url);
const app = express();
const port = 80
const dbName = 'BartoszRozdolski'

app.use(express.json())

//getting posts
app.get('/posts', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('posts')
    const posts = await collection.find({}).toArray()
    res.send(posts)
})

//create posts
app.post('/post', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('posts')
    const post = req.body
    const result = await collection.insertOne(post)
    res.send(result)
})

//putting posts
app.put('/post/:id', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('posts')
    const _id = newObjectId(req.parmas.id)
    const result = await collection.updateOne({_id}, req.body)
    res.send(result)
})

//delete post
app.delete('/post/:id', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('posts')
    const _id = new ObjectId(req.params.id)
    const result = await collection.deleteOne({_id})
    res.send(result)
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})

const connect = async () => {
    await client.connect();
}

connect()