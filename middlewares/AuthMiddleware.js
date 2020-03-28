exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/register');
  }
}

exports.hasAdminPrivileges = (req, res, next) => {
  if(req.isAuthenticated()){
      if(req.user.role == 'admin'){
        next();
      }else{
        res.status(403).json({msg: 'This operation requires admin privileges.'});
      }
  }else{
    res.redirect('/register');
  }
}
