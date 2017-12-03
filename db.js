var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/webix-nodejs';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  createCapped(db, function() {
      db.close();
    });

  var userObj = [
    { username: 'janedoe', birthday: new Date(1980, 6, 20), name:"Jane Doe", email:"janedoe@gmail.com", age:37, group_id:2 },
    { username: 'alexb', birthday: new Date(1968, 1, 11), name:"Alex Brown", email:"alexb@hotmail.com", age:49, group_id:1 },
    { username: 'bonny', birthday: new Date(2001, 2, 18), name:"Bonny Ampa", email:"bonny@gmail.com", age:16, group_id:2 }
  ];

  var groupObj = [
    { name:"Admin" },
    { name:"User" },
    { name:"Guest" },
  ];

  var documentObj = [
    { userId:1, name:"resume.doc" },
    { userId:1, name:"July_2015.doc" },
    { userId:3, name:"pic001548.jpg" },
    { userId:3, name:"pic001548.jpg" },
    { userId:3, name:"pic001549.jpg" },
    { userId:3, name:"pic001550.jpg" },
    { userId:3, name:"pic001551.jpg" }
  ];

  for (var i=10; i<90; i++) {
    documentObj.push({ userId:2, name:"photo0000"+i+".jpg" });
  }

  db.collection("user").insertMany(userObj, function(err, res) {
    if (err) throw err;
    console.log("Number of users collection inserted: " + res.insertedCount);
  });

  db.collection("group").insertMany(groupObj, function(err, res) {
    if (err) throw err;
    console.log("Number of group collection inserted: " + res.insertedCount);
  });

  db.collection("document").insertMany(documentObj, function(err, res) {
    if (err) throw err;
    console.log("Number of document collection inserted: " + res.insertedCount);
  });

  db.close();
});

var createCapped = function(db, callback) {
  db.createCollection("file", { "capped": true, "size": 100000, "max": 5000},
    function(err, results) {
      console.log("Collection file created.");
      callback();
    }
  );
};