let UserModel = require('../models/User');
let AdventurerModel = require('../models/Adventurer');
let CampaignModel = require('../models/Campaign');

exports.index = (req, res) => {
  let user = req.user;
  let isAdmin = req.user.role == "DM";
  CampaignModel.findAll().then((campaigns) =>{
    res.render('dashboard/index', {user: user, isAdmin: isAdmin, campaigns: campaigns});
  });
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
  let event = {name: "Hombres lobo invaden!", description :"Un grupo de hombres lobo (muy hambrientos) demabulan por el bosque, ¿Qué harán nuestros heroés?"};
  let response1 = {title: "Un heroe se alza", description:"Jericho utiliza un Arco Largo para atacar a los Hombres Lobo."};
  let response2 = {title: "Un heroe se alza", description:"Adam utiliza un Nora de Amor para confundir a los Hombres Lobo."};
  let responses = {responses: [response1,response2]};
  console.log(responses);
  res.render('dashboard/event',{event: event, responses: responses});
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

exports.newcampaign = (req,res) =>{
  console.log(req.body);
  CampaignModel.create({name: req.body.name, description: req.body.description})
  .then(
    res.redirect('/app/dashboard')
  );
}

exports.addplayer = (req,res) => {

  //Agregar al jugador a la campaña

  res.redirect('/app/campaign/1');
}

exports.profile = (req,res) => {
  UserModel.find(req.params.id)
    .then(user => {
      AdventurerModel.findByMaster(req.params.id)
      .then(adventurers => {
        let adv = {"adv": [{id: "1", name: "Jericho"}]};
        console.log(adv);
        res.render('dashboard/profile', {user:user, adv:adv});
      });
    });
}
