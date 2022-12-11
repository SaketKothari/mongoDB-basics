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
//============================= List All employees ==============================
app.get('/getallemployees', (req, res) => {
  mongoclient.connect(url, (error, conn) => {
    if (error) {
      console.log('Sorry, Database Connectivity Failed....');
      res.send('Sorry, Database Connectivity Failed....');
    } else {
      console.log('Database Connectivity Successfully Established.....');
      let db = conn.db(dbName);
      db.collection('employee')
        .find({}, { empno: 1, salary: 1, _id: 0 })
        .toArray((e, empdata) => {
          if (e) {
            console.log('Employees Data Could not be Retrieved...');
          } else {
            console.log('Employees Data = ', empdata);
            res.json(empdata);
          }
          conn.close();
          res.end();
        });
    }
  });
});
//============================= Search employee ==============================
app.get('/searchemployee', (req, res) => {
  mongoclient.connect(url, (error, conn) => {
    if (error) {
      console.log('Sorry, Database Connectivity Failed....');
      res.send('Sorry, Database Connectivity Failed....');
    } else {
      console.log('Database Connectivity Successfully Established.....');
      let db = conn.db(dbName);
      console.log('Employee Nop to Be Searched = ', req.query.empno);
      db.collection('employee')
        .find({ empno: parseInt(req.query.empno) })
        .toArray((e, empdata) => {
          if (e) {
            console.log('Employee Data Could not be Retrieved...');
          } else {
            if (empdata.length == 0) {
              console.log('Employee Not Found....');
              res.send('Employee Not Found....');
            } else {
              console.log('Employee Data = ', empdata);
              res.send(`<div align="center" style="background-color:green;color:yellow">
                            <h1>::::::::::Employees Details::::::::</h1>
                            <h2>Employee No     = ${empdata[0].empno}</h2>
                            <h2>Employee Name   = ${empdata[0].empname}</h2>
                            <h2>Employee Age    = ${empdata[0].age}</h2>
                            <h2>Employee Salary = ${empdata[0].salary}</h2>
                        </div>`);
            }
            conn.close();
            res.end();
          }
        });
    }
  });
});
//===================================================================
app.listen(7000, () => {
  console.log('Server Running on Port No 7000...');
});

// select * from employee   -- find()

// select * from employees where salary > 30000    -- find({salary:{$gt:30000}})

// select empno , salary from employee ; -- find({},{empno:1,salary:1})

// select empno , salary from employee where salary > 30000;  -- find({salary > 30000},{empno:1,salary:1})
