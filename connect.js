const { MongoClient } = require("mongodb");
require('dotenv').config()
const password = process.env.ATLAS_PWD
// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://jerrob:${password}@cluster0.8wbf1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const crew = "crew";
// next step : https://www.mongodb.com/docs/atlas/tutorial/insert-data-into-your-cluster/

let data = {name: "francis"}
const getCrewList = async () => {
    let crewList = []
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(crew);
        // Use the collection "people"
        const col = db.collection("members");
        const dbResults = await col.find();
        await dbResults.forEach((e, i) => crewList.push(e))
        // Print to the console
       /*  console.log("MY DOC ========>", myDoc); */
       console.log("crewList in connect.js GET ========>", crewList);
       return crewList

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
const insertCrewMember = async (data) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(crew);
        // Use the collection "people"
        const col = db.collection("members");
         await col.insertOne(data);
        /* const dbResults = await col.find();
        await dbResults.forEach((e, i) => crewList.push(e.name))
       
        console.log("MY DOC ========>", myDoc); 
       console.log("crewList in connect.js INSERT ========>", crewList); */
       return `New crew members has successfully been added`

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
const deleteCrewMember = async () => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(crew);
        // Use the collection "people"
        const col = db.collection("members");
         await col.insertOne(data);
        const dbResults = await col.find();
        await dbResults.forEach((e, i) => crewList.push(e.name))
        // Print to the console
       /*  console.log("MY DOC ========>", myDoc); */
       console.log("crewList in connect.js ========>", crewList);
       return `deletion successfull`

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    getCrewList,
    insertCrewMember,
    deleteCrewMember
 }



