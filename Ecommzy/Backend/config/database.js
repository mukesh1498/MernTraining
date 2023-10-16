// for cmd commect compass and shell =>      "C:\Program Files\MongoDB\mongosh-1.10.6-win32-x64\bin\mongosh"
//  to show database table ->  show dbs
// create a db -> use databaseName 


// Use `module.exports`, not `module.export`




const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("DB Connection Successfully");
    })
    .catch((error) => {
      console.error('Error connecting to DB', error.message); // Log the error message
      process.exit(1);
    });
}
module.exports = dbConnect;