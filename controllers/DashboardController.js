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
exports.cmpmap = (req,res) =>{
  //Do a DB request for a map storing

  res.render('dashboard/campaignForm')

}
exports.frmevent = (req,res) =>{
  res.render('dashboard/event-form');
}
exports.event = (req,res) => {
  console.log(req);
  let event = {name: "Example Event", description :"Example description"}
  res.render('dashboard/event',{event: event})
}

exports.newevent = (req,res) => {

  //Add event to database

  res.redirect('/app//campaign/1');
}
exports.ansevent = (req,res) => {
  let cmpid = req.params.cmpid;
  let evid = req.params.evid;


  let adv = {"adv": [{id: "1", name: "example adventurer"}]}
  let item = {"item": [{id: "1", name: "example item"}]}

  res.render('dashboard/answer-event-form', {cmpid: cmpid, evid: evid, adv: adv, item: item});
}
exports.anseventsend = (req,res) => {

  //Add event to database

  res.redirect('/app/campaign/1');
}

exports.newplayer = (req,res) => {

  res.render('dashboard/player-invite')
}

exports.allevents = (req,res) => {

  //Mostrar todos las respuestas de jugadores a eventos de la campaña

  res.redirect('/app/campaign/1');
}

exports.addplayer = (req,res) => {

  //Agregar al jugador a la campaña

  res.redirect('/app/campaign/1');
}
