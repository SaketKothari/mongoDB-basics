let express = require('express');
let mongodb = require('mongodb');
let app = express();
let mongoclient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017';
let dbName = 'node_24feb';

app.get('/register', (req, res) => {
  console.log('Employee Data = ', req.query);
  console.log('Employee No     = ', parseInt(req.query.empno));
  console.log('Employee Name   = ', req.query.empname);
  console.log('Employee Age    = ', parseInt(req.query.age));
  console.log('Employee Salary = ', parseFloat(req.query.salary));
 
  let empdata = {
    empno: parseInt(req.query.empno),
    empname: req.query.empname,
    age: parseInt(req.query.age),
    salary: parseFloat(req.query.salary),
  };

  mongoclient.connect(url, (error, conn) => {
    if (error) {
      console.log('Sorry, Database Connectivity Failed....');
      res.send('Sorry, Database Connectivity Failed....');
    } else {
      console.log('Database Connectivity Successfully Established.....');
      let db = conn.db(dbName);
      db.collection('employee').insertOne(empdata, (e, s) => {
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
