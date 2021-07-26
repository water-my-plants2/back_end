const router = require("express").Router();
const bcrypt = require('bcryptjs');
const Users = require("../users/users-model");
const tokenBuilder = require('./token-builder')
//const { checkUsernameExists, validateRoleName } = require('./auth-middleware');



router.post("/register",  (req, res, next) => {
    
    let user ={
      username :req.body.username,
      password: req.body.password
    }
  
    const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
    const hash = bcrypt.hashSync(user.password, rounds);
  
    user.password = hash
   
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(next);
  });
  
  router.post('/login', (req, res, next) => {
      
   let { username, password } = req.body;
    Users.findBy({ username }) 
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // generate a token and send it back
          const token = tokenBuilder(user)
          // the client will provide token in future requests
          res.status(200).json({
            message: `welcome, ${user.username}`,
            token,
          });
        } else {
          next({ status: 401, message: 'invalid credentials' });
        }
      })
      .catch(next);
  });



module.exports = router;