const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u675lb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting)
    await client.connect();
    //sporting  all collection all api section
    const sportingCollection = client.db('sporting').collection('store');
    const sportOrderCollection = client.db('sporting').collection('sport-order');
    const sportingReviewCollection = client.db('sporting').collection('review');
    
    // Sporting get data client site
    app.get('/sports', async (req, res) => {
      const query =  {};
      const cursor = sportingCollection.find(query)
      const result = await cursor.toArray() 
      res.send(result);
    });


    app.get('/sport/:id([0-9a-fA-F]{24})', async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; // Convert the id to ObjectId
      const result = await sportingCollection.findOne(query);
      res.send(result);
    });

    
    //cart product delete api
 


    app.post('/sport', async (req, res) => {
      try {
        const sport = req.body;
        sport.isFeatured = true;  // Ensure isFeatured is always true
        const result = await sportingCollection.insertOne(sport);
        res.send(result);
      } catch (err) {
        res.status(500).send(err);
      }
    });
   
    app.get('/task/:id' , async(req,res)=>{
      const id = req.params.id;
      const result = await  sportOrderCollection.findOne({_id: new ObjectId(id)})
      res.send(result)
        
      })



      app.delete('/sport/:id' , async(req,res)=>{
        const id  = req.params.id;
        const result = await sportOrderCollection.deleteOne({_id: new ObjectId(id)})
        res.send(result)
      })


      // data put and updated data api create
      app.put('/sport/:id', async(req, res)=>{
        const id= req.params.id;
        const sport = req.body;
        const filter = {_id: new ObjectId(id)};
        const updateDoc={
            $set:{
                status:sport.status,
                name: sport.name,
                description:sport.description,
                dateTime:sport.dateTime,
                priority: sport.priority,
            }
        }
        const result = await todoDatabaseCollection.updateOne(filter, updateDoc);
        res.json(result)
    })



//cart product delete api
// app.delete('/sport/:id', async (req, res) => {
//   const id = req.params.id;
//   const query = { id };
//   const result = await sportingCollection.deleteOne(query);
//   console.log(result);
//   res.send(result);
// });

 
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(
    '<h1 style="font-size:30; margin:20% auto; text-align:center;">Sport server running </h1>'
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// hello world