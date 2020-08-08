const User = require('../models/User');
const {registerValidation} = require('../validation');


exports.getAuth= async(req, res) => {

  // Validate data before creating a user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0]);

  // Check if user alreday exists in the database
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Email already exists');

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  }catch(err){
    res.status(400).send(err)
  }

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
