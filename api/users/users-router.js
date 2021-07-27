const router = require("express").Router();
const Users = require("./users-model");
const {  restricted } = require('../auth/auth-middleware');


//GET METHODS
  router.get("/", restricted, (req, res, next) => { // done for you
    Users.findAllUsers()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next);
  });

  router.get("/:user_id", restricted, (req, res, next) => { // done for you
    Users.findByUserId(req.params.user_id)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });

  router.get("/:username", restricted, (req,res,next)=>{
    Users.findByUsername({username:req.params.username})
    .then(user =>{
      res.status(200).json(user);
    })
    .catch(next);
  })
  
  router.get("/:user_phone",  (req, res, next) => { // done for you
    Users. findByPhone(req.params.user_phone)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });

  //POST METHODS
  router.post('/', async (req, res) => {
    res.status(201).json(await Users.addUser(req.body))
  })

  module.exports = router;
  