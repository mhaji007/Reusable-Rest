const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');


exports.getAuth= async(req, res) => {

  // Validate data before creating a user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0]);

  // Check if user already exists in the database
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Email already exists');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  }catch(err){
    res.status(400).send(err)
  }

};

exports.getLogin= async(req, res) => {

    // Validate data before creating a user
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    // Check if user already exists in the database
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email does not exist');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    res.send('Logged in');

};



/////////////////////////////////////////////////


// const User = require('../models/User');

// // VALIDATION

// const Joi = require('@hapi/joi');

// const schema = Joi.object({
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required()
// });


// exports.getAuth= async(req, res) => {

//   const {error} = schema.validate(req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//   }catch(err){
//     res.status(400).send(err)
//   }

// };
