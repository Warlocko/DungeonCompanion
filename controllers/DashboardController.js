let UserModel = require('../models/User');
let AdventurerModel = require('../models/Adventurer');
let CampaignModel = require('../models/Campaign');
let EventModel = require('../models/Event')

exports.index = (req, res) => {
  let user = req.user;
  let isAdmin = req.user.role == "DM";
  CampaignModel.findByUserId(user.id).then((campaigns) =>{
    res.render('dashboard/index', {user: user, isAdmin: isAdmin, campaigns: campaigns});
  }).catch((campaigns) => {
    res.render('dashboard/index', {user: user, isAdmin: isAdmin, campaigns: campaigns})
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

	res.render('dashboard/map', {cmpid: req.params.cmpid})

}
exports.cmpmap = (req,res) =>{
  res.render('dashboard/campaignForm')

}
exports.frmevent = (req,res) =>{
  cmpid = req.params.cmpid
  res.render('dashboard/event-form', {cmpid: cmpid});
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
  EventModel.create({name: req.body.name, description: req.body.description, img_url: req.body.img_url, campaign_id: req.params.cmpid})
  .then((event) => {
    res.redirect('/app/dashboard')
  });
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
  res.render('dashboard/player-invite', {cmpid: req.params.cmpid})
}

exports.allevents = (req,res) => {
  EventModel.findAll()
    .then((events) => {
      
    })

  res.redirect('/app/campaign/1');
}

exports.newcampaign = (req,res) =>{
  CampaignModel.create({name: req.body.name, description: req.body.description, img_url: req.body.img_url, DM_id: req.user.id})
  .then(
    res.redirect('/app/dashboard')
  );
}

exports.addplayer = (req,res) => {
  cmpid = req.params.cmpid
  UserModel.find(req.body.id)
    .then((user) => {
      CampaignModel.addPlayer(user,cmpid)
        .then(() => {
          UserModel.addPlayer(user,req.user.id)
            .then(() => {
              res.redirect(`/app/campaign/${cmpid}`);
            })
        })
    }).catch((error) => {
      res.render('dashboard/player-invite', {cmpid: cmpid, playerError: error})
    })

  
}

exports.profile = (req,res) => {
  UserModel.find(req.params.id)
    .then(user => {
        console.log(user.id)
        AdventurerModel.findByMaster(user.id)
        .then(adventurers => {
            res.render('dashboard/profile', {user:user, adventurers:adventurers});
          }).catch((adventurers) => {
            res.render('dashboard/profile', {user:user, adventurers:adventurers})
          })
    });
}

exports.addplayerDM = (req,res) => {
  res.render('dashboard/addcharacter')
}

exports.bestiary = (req,res) => {
  res.render('dashboard/bestiary')
}
