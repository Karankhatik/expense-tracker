const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtKey = "jkdcnjebdbew32r38r98fnffiuo3r98u3fkjf3diui";

module.exports.createUser = async function (req, res) {
  
    try {
      const user = await User.findOne({ email: req.body.data.email });
      if (!user) {
        const newUser = await User.create(req.body.data);  
        const jwtToken = jwt.sign({id : newUser._id},jwtKey,{expiresIn:"2 days"});
        return res.json({ success: true, message: "User created successfully",newUser ,jwtToken});
      } else {
        return res.json({ success: false, message: "User with this email already exists" });
      }
    } catch (err) {      
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // render the sign in page
  module.exports.signIn = async function(req, res){
    try {
        const user = await User.findOne({ email: req.body.data.email });
        if (user) {
                const jwtToken = jwt.sign({id : user._id},jwtKey,{expiresIn:"2 days"});
            return res.json({
                success: true,
                message: "Rendered sign-in page successfully",
              user ,
              jwtToken
            });
        } else {
          return res.json({ success: false, message: "Wrong credential" });
        }
      } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
      }       
};

module.exports.destroy = function(req, res){
  try{
      return res.status(200).json({
        success:true,
        message : "Logout done"
      });
  }
  catch (err){
    return res.status(500),json({success: false, message: err.message})
  }
}






