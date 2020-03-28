let UserModel = require('../models/User');

exports.index = (req, res) => {
  let user = req.user;
  let isAdmin = req.user.role == "DM";
  res.render('dashboard/index', {user: user, isAdmin: isAdmin});
}

exports.userList = (req, res) => {
  UserModel.findAll().then((data)=> {
      let userList = data;
      res.render('dashboard/userList', {userList: userList});
    }
  )
}

exports.map = (req,res) =>{
	//Do a DB request for a map based on id

	res.render('dashboard/map')

}
