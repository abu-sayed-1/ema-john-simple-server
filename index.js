
//   Module No : 50 / video No:1/2/3/

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config()
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj2jz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




// const app = express()
// app.use(bodyParser.json());
// app.use(cors());

// const port = 5000



// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const productsCollection = client.db("emaJohnStore").collection("products");
//     //   console.log('database connected')

//    app.post('/addProduct', (req, res) => {
//        const products = req.body;
//        productsCollection.insertMany(products)
//        .then(result => {
//            console.log(result.insertedCount)
//         res.send(result.insertedCount)
//        })
//    })

// });

// app.get('/', (req, res) => {
//     res.send('hello wold')
// })



// app.listen(port)



//   Module No : 50 / video No:1/2/3/4-----------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj2jz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productsCollection = client.db("emaJohnStore").collection("products");
    const ordersCollection = client.db("emaJohnStore").collection("orders");
    //   console.log('database connected')

    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productsCollection.insertOne(products)
            .then(result => {
                console.log(result.insertedCount)
                res.send(result.insertedCount)
            })
    })

    //  get products here -------------------
    app.get('/products', (req, res) => {
        productsCollection.find({})
            // .limit(60)
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // get dynamic product here ---------------------
    app.get('/product/:key', (req, res) => {
        productsCollection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents[0]);
                //ei code diye  ^^^^^^^^^^^^^^^ tumi database theke ekta Array antecho mane tumi client or UI theke ze dynamic key asteche oi key diye server site e request pathiye sudu UI theke ze key astech oi key shathe match kore server theke ekta Array nitecho 
            })
    })

    // get many products   --------------
    app.post('/productsByKeys', (req, res) => {
        const productsKeys = req.body;
        productsCollection.find({ key: { $in: productsKeys } })
            //maltepal key shathe match kore|^ server theke Array anar jonno ei code use kore -------------------
            ////ei code diye  ^^^^^^^^^^^^^^^ tumi database theke maltpal Array antecho mane tumi client or UI theke ze maultpal key asteche oi key diye server site e request pathiye sudu UI theke ze maltpal  key astech  maltpal key mane ek va kadi key htepare  oi key shathe match kore server theke ek va kadik  Array nitecho 
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    // shipment user placed data -------------------------
    app.post('/addOrder', (req, res) => {
        const order = req.body;
         ordersCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })


});

app.get('/', (req, res) => {
    res.send('hello wold')
})

app.listen(process.env.PORT || port,() => console.log('hello wold'))
