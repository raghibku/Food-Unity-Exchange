const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://foodunityexchange.web.app',
        'https://foodunityexchange.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())


//codeblock


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pwytamz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
//middlewares
// middlewares 
const logger = (req, res, next) =>{
    console.log('log: info', req.method, req.url);
    next();
}

const varifyToken = async(req,res,next)=>{
    const token = req?.cookies?.token;
    console.log('value of token in the middleware' + token)
    if(!token){
      return res.status(401).send({message: 'not authorized'})
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
      if(err){
        return res.status(401).send({message:'unauthorized access'})
      } 
      req.user = decoded;
      next();
      // console.log('value in the token',decoded)
    })
    
    //next()
  }

async function run() {
    try {

        const foodCollection = client.db('foodDB').collection('allFood');
        const foodRequestCollection = client.db('foodDB').collection('requestedFood');

        app.post('/jwt', async (req, res) => {
            const user = req.body
            console.log(user)
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true, //false on local true on live
                    sameSite: 'none'
                })
                .send({ success: true })
        })
        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log('logging out', user)
            res.clearCookie('token', { maxAge: 0 }).send({ success: true })
        })

        app.get('/availableFood', async (req, res) => {
            const filter = { foodStatus: 'available' };
            const cursor = foodCollection.find(filter);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/featuredFoods', async (req, res) => {
            const filter = { foodStatus: 'available' };
            const cursor = foodCollection.find(filter).sort({ foodQuantity: -1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        })


        app.post('/availableFood', async (req, res) => {
            const newFood = req.body;
            const result = await foodCollection.insertOne(newFood);
            res.send(result);
        });


        app.get('/availableFood/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await foodCollection.findOne(query)
            res.send(result)
        })

        app.patch('/availableFood/:id', async (req, res) => {
            const id = req.params.id;

            const filter = { _id: new ObjectId(id) };
            const updatedFood = req.body;
            console.log(updatedFood);
            const updateDoc = {
                $set: {

                    foodName: updatedFood.foodName,
                    foodImage: updatedFood.foodImage,
                    foodQuantity: updatedFood.foodQuantity,

                    pickupLocation: updatedFood.pickupLocation,
                    expireDate: updatedFood.expireDate,
                    additionalNote: updatedFood.additionalNote,

                },
            };
            const result = await foodCollection.updateOne(filter, updateDoc);
            res.send(result);

        })

        app.patch('/availableFoodStatus/:id', async (req, res) => {
            const id = req.params.id;

            const filter = { _id: new ObjectId(id) };
            const updatedFood = req.body;
            console.log('all food status', updatedFood);
            console.log('all food status', id)
            const updateDoc = {
                $set: {
                    foodStatus: updatedFood.status,
                },
            };
            const result = await foodCollection.updateOne(filter, updateDoc);
            res.send(result);


        })

        app.get('/yourDonatedFood',logger,varifyToken, async (req, res) => {
            console.log(req.query.email);
            const email = req.query.email
            if(email !==req.user.email){
                return res.status(403).send({message: 'forbidden access'})
            }

            console.log(req.user)
            let query = {}
            if (email) {
                query = { donorEmail: email }
            }
            const result = await foodCollection.find(query).toArray();
            res.send(result);
            //res.send([])

        })
        app.delete('/availableFood/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await foodCollection.deleteOne(query);
            res.send(result)
        })

        //requested food apis
        app.get('/requestedFood',logger,varifyToken, async (req, res) => {
            console.log(req.query.email);
            const email = req.query.email
            let query = {}
            if (email) {
                query = { requesterEmail: email }
            }
            const result = await foodRequestCollection.find(query).toArray();
            res.send(result);
            //res.send([])

        })

        app.get('/requestedFood/:id', async (req, res) => {
            const id = req.params.id;
            const query = { foodId: id }
            const result = await foodRequestCollection.findOne(query)
            res.send(result)
        })

        app.post('/requestedFood', async (req, res) => {
            const requestedFood = req.body;
            const result = await foodRequestCollection.insertOne(requestedFood);
            res.send(result);
        });

        app.patch('/requestedFood/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { foodId: id };
            const updatedFood = req.body;
            console.log(updatedFood);
            const updateDoc = {
                $set: {
                    status: updatedFood.status
                },
            };
            const result = await foodRequestCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/requestedFood/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await foodRequestCollection.deleteOne(query);
            res.send(result)

        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);


//codeblock


app.get('/', (req, res) => {
    res.send('Food Unity Exchange Running');
})

app.listen(port, () => {
    console.log(`Food Unity Exchange running on port, ${port}`)
})

