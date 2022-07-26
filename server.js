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

const hostname = process.env.HOSTNAME
const PORT = 3001
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
app.listen(port, hostname, () => {
  console.log(`Example app listening on ${hostname} on port ${PORT}`)
})

/* const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello toto');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */
