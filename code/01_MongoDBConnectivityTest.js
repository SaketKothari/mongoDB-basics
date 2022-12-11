let mongodb = require('mongodb');

// Create a mongodb client
let mongoClient = mongodb.MongoClient;

// Specify a uri of mongodb server
let url = 'mongodb://localhost:27017/';

// Error First Callback Function
mongoClient.connect(url, (error, conn) => {
  if (error) {
    console.log('Sorry! Database Connection Failed');
    console.log(error);
  } else {
    console.log('Database Connection is Successful');
    conn.close();
  }
});
