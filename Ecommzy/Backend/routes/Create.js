const express = require("express");
const router = express.Router();


const { Create, getRecord, } = require("../controller/Create");
const { getUpdateUser, UpdateUser, deleteUser } = require("../controller/updateuser")
router.post("/create", Create);
router.get("/getUser", getRecord);
router.get("/getUpdateUser/:id", getUpdateUser);
router.put("/UpdateUser/:userId", UpdateUser)
router.delete("/DeleteUser/:userId", deleteUser)


module.exports = router;