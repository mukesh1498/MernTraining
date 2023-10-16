// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const CreateModel = require("./routes/Create");
const JWT_Key = "fyr74647y7v65656783456789fghtrh{}tr66vbyf7fbv7vb";
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(cors()); // Enable CORS for your app
app.use(bodyParser.json()); // Use JSON body parser
app.use(express.urlencoded({ extended: true })); // Use URL-encoded body parser
// middleware to parse json request body
app.use(express.json());

dbConnect();

const User = require('./routes/user');
const Crud = require("./routes/Create");
app.use(User, Crud);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//  Post method for Register User


//  get method for Register User

// Post method for Login user


// Post Method for Create User/ADD USER 


// Define a route to handle GET requests to fetch records


//get method for fetch record to update the User

// post method for update the record 





