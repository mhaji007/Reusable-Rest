const User = require('../models/User')

exports.getAuth= async(req, res) => {
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
