const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ovtnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect()
       const serviceCollection = client.db('doctors_portal').collection('services');

       app.get('/service', async(req, res) =>{
           const query ={}
           const cursor = serviceCollection.find(query)
           const services = await cursor.toArray();
           res.send(services)
       })
    }
    finally{

    }

}
run().catch(console.dir)
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
  res.send('Hello Doctor uncle!')
})

app.listen(port, () => {
  console.log(`Doctor app listening on port ${port}`)
})