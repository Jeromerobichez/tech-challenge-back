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


const port = 3001
app.use(cors('*')) 
app.use(express.json())

let crew = ['Eleftheria', 'Gennadios', 'Lysimachos', 'jean-mi']
let newCrewMember = ''
/* app.get('/', (req, res) => {
    res.send(crew)
  }) */
  app.get('/', async(req, res) => {
    let crewList = await getCrewList()
    res.send(crewList) 

  })
app.post('/', async (req, res) => { 
    newCrewMember = "salut"
    console.log("req.body", req.body)
    await insertCrewMember(req.body)
    crew = await getCrewList()
    console.log("crew", crew)
    res.set('Access-Control-Allow-Origin', '*')
    res.send(crew) 
    


})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
