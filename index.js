const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserRoutes = require('./Routes/UserRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', UserRoutes)

app.get('/', (req, res) =>{
    res.send("Hello ShopZen!")
})

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Mongoose connected successfully");
}).catch(()=>{
    console.log("No connection with mongoose")
});


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = async() => {
  try {
    await client.connect(); 
    const db = await client.db("ShopZen")
    const Products = await db.collection('Products');
    
    app.get('/products', async(req, res) =>{
        const productResult = await Products.find().toArray();
        res.send(productResult);
    })

    app.get('/products/:id', async (req, res) =>{
        const ids = req.params.id
        
        const result = await Products.findOne({id : ids});
        res.send(result);
    })


    app.listen(process.env.PORT | 4040, (()=>{
        console.log("ShopZen server is running")
    }))
  } finally {
   
  }
}
database();

