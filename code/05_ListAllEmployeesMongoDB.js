let mongodb = require('mongodb');

let mongoclient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/';

let dbName = 'node_24feb';

mongoclient.connect(url, (error, conn) => {
  if (error) {
    console.log('Sorry, Database Connection Failed.');
    console.log('REASON FOR ERROR = ', error);
  } else {
    console.log('Database Connectivity is Successful.');
    let mydb = conn.db(dbName); // Specify the name of the database.
    mydb
      .collection('employee')
      .find()
      .toArray((err, empdata) => {
        if (err) {
          console.log('Employees Data Could Not be Retrieved...');
        } else {
          console.log('Employees Data = ', empdata);
        }
        conn.close();
      });
  }
});
