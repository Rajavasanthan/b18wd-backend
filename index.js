const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://vasanth:vasanth123@zen.guo9l.mongodb.net/zen?retryWrites=true&w=majority";
const dbName = "zen";

app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    let connection = await MongoClient.connect(url);
    let db = connection.db(dbName);
    let users = await db.collection("users").find().toArray();
    connection.close();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    // Open the connection
    let connection = await MongoClient.connect(url);

    // Select the DB
    let db = connection.db(dbName);

    // Perform action (FIND,UPDATE etc...)
    await db.collection("users").insertOne(req.body);

    // Close the Connection
    connection.close();
    res.json({
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    // Open the connection
    let connection = await MongoClient.connect(url);

    // Select the DB
    let db = connection.db(dbName);

    // Perform action (FIND,UPDATE etc...)
    let user = await db
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectID(req.params.id) },
        { $set: { age: 20 } }
      );
    console.log(user);
    // Close the Connection
    connection.close();
    res.json({
      message: "User Update",
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    // Open the connection
    let connection = await MongoClient.connect(url);

    // Select the DB
    let db = connection.db(dbName);

    // Perform action (FIND,UPDATE etc...)
    let user = await db
      .collection("users")
      .deleteOne({ _id: mongodb.ObjectID(req.params.id) });
    console.log(user.deletedCount);
    // Close the Connection
    connection.close();
    res.json({
      message: "User Update",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log("Server is Running in Port 3000");
});
