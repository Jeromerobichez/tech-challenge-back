const http = require('http');
const {
  getCrewList,
  insertCrewMember,
  deleteCrewMember
} = require('./connect')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const password = process.env.ATLAS_PWD
const express = require('express')
const cors = require('cors')
const app = express()
const uri = `mongodb+srv://jerrob:${password}@cluster0.8wbf1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors('*')) 
app.use(express.json())


app.get('/', async(req, res) => {
  let crewList = await getCrewList()
  res.send(crewList) 
  })
app.post('/', async (req, res) => { 
    let crew = []
    await insertCrewMember(req.body)
    crew = await getCrewList()
    res.set('Access-Control-Allow-Origin', '*')
    res.send(crew) 
})
