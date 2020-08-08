

exports.getPost= async(req, res) => {

  // res.json({posts:{title:'my first post'}, description: 'random data'});
  res.send(req.user);
 // User.findbyOne({_id: req.user})
};


