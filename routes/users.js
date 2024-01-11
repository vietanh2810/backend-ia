// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

//importing modules
const express = require("express");
const userController = require("../controllers/user");
const { signup, getAllUsers, login, validateUser, getOneUser } = userController;
const userAuth = require("../middlewares/auth");
const { authenticate, checkAdminRole, saveUser } = userAuth;

const router = express.Router();

//get all users
router.get(
  "/",
  authenticate,
  checkAdminRole,
  (req, res) => {
    getAllUsers(req, res).catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  }
);

//signup endpoint DONE
//passing the middleware function to the signup
router.post(
  "/signup",
  (req, res, next) => {
    // Call the getAllUsers function here
    saveUser(req, res, next).catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  },
  (req, res, next) => {
    // Call the getAllUsers function here
    signup(req, res, next).catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  },
);

//login route DONE
router.post("/login",
  (req, res) => {
    // Call the getAllUsers function here
    login(req, res).catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  },
);

//profile route
router.get("/profile",
  authenticate,
  (req, res) => {
    getOneUser(req, res).catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  }
)

module.exports = router;