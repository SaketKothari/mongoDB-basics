let mongodb = require('mongodb');

// Create a mongodb client
let mongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/';

let dbName = 'node_24feb';

mongoClient.connect(url, (error, conn) => {
  if (error) {
    console.log('Sorry! Database Connection Failed');
    console.log(error);
  } else {
    console.log('Database Connection is Successful');
    let myDb = conn.db(dbName); // Specify the name of the database
    myDb
      .collection('employee')
      .updateOne({ empno: 11111 }, { $set: { age: 55 } }, (e, s) => {
        if (e) {
          console.log('Sorry! Employee data could not be updated..');
          console.log(e);
        } else {
          console.log('Employee data updated successfully');
        }
        conn.close();
      });
  }
});
