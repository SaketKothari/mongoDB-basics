let express = require('express');
let mongodb = require('mongodb');
let app = express();
let mongoclient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017';
let dbName = 'products';

mongoclient.connect(url, (error, conn) => {
  if (error) {
    console.log('Sorry, Database Connectivity Failed....');
  } else {
    console.log('Database Connectivity Successfully Established.....');
    let db = conn.db(dbName);
    db.collection('products').updateOne(
      { productno: 1 },
      { $set: { productno: 222 } },
      (e, s) => {
        if (e) {
          console.log('Update Failed...');
        } else {
          console.log('Update Successful...');
        }
        conn.close();
      }
    );
  }
});

app.listen(7000, () => {
  console.log('Server Running on Port No 7000...');
});
