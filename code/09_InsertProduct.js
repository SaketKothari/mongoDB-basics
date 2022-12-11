let express = require('express');
let mongodb = require('mongodb');
let app = express();
let mongoclient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017';
let dbName = 'products';

app.get('/register', (req, res) => {
  console.log('Product Data = ', req.query);
  console.log('Product Number     = ', parseInt(req.query.productno));
  console.log('Product Name       = ', req.query.productname);
  console.log('Manufacturer       = ', req.query.manufacturer);
  console.log('Product Price    = ', parseFloat(req.query.price));

  let productData = {
    productno: parseInt(req.query.productno),
    productname: req.query.productname,
    manufacturer: req.query.manufacturer,
    price: parseFloat(req.query.price),
  };

  mongoclient.connect(url, (error, conn) => {
    if (error) {
      console.log('Sorry, Database Connectivity Failed....');
      res.send('Sorry, Database Connectivity Failed....');
    } else {
      console.log('Database Connectivity Successfully Established.....');
      let db = conn.db(dbName);
      db.collection('products').insertOne(productData, (e, s) => {
        if (e) {
          console.log('Insertion Failed...');
        } else {
          console.log('Insertion Successful...');
        }
        conn.close();
        res.send('Employee Registration Successful');
        res.end();
      });
    }
  });
});

app.listen(7000, () => {
  console.log('Server Running on Port No 7000...');
});
