const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

// @route   POST  api/users
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //Simple validation
  if( !name || !email || !password){
    return res.status(400).json({ msg:'Please enter all fields' }); 
  }

  //Check for existing user
  User.findOne({ email })
      .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = User({
          name,
          email,
          password
        });

        //Create salt&hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;

            newUser.password = hash;
            newUser.save()
                   .then(user => {

                    jwt.sign(
                      //When we send a token, we send the id to know which user it is
                      { id: user.id },
                      //Get the jwt secret
                      config.get('jwtSecret'),
                      //Set the expire time
                      { expiresIn: 3600 },
                      (err,token) => {
                        if(err) throw err;

                        res.json({
                          token,
                          user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                          }
                        });
                      }
                    )
                   });
          });
        });
      })
});



//Export router
module.exports = router;