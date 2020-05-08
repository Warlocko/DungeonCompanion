let UserModel = require('../models/User');
let AdventurerModel = require('../models/Adventurer');
let CampaignModel = require('../models/Campaign');
let EventModel = require('../models/Event')
let ResponseModel = require('../models/Response')

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
  user = req.user
  EventModel.findByCampaignId(req.params.cmpid)
    .then((events) => {
      res.render('dashboard/map', {cmpid: req.params.cmpid, events: events,user:user})
    }).catch((events)=>{
      res.render('dashboard/map', {cmpid: req.params.cmpid, events: events,user:user})
    })
}


exports.cmpmap = (req,res) =>{
  res.render('dashboard/campaignForm')
}


exports.frmevent = (req,res) =>{
  cmpid = req.params.cmpid
  res.render('dashboard/event-form', {cmpid: cmpid});
}


exports.event = (req,res) => {
  let cmpid = req.params.cmpid
  let evid = req.params.evid
  EventModel.findById(evid)
  .then((event) => {
    ResponseModel.findByEventId(evid)
    .then((responses) => {
      res.render('dashboard/event',{cmpid: cmpid, event: event, responses: responses});
    }).catch((responses) => {
      res.render('dashboard/event',{cmpid: cmpid, event: event, responses: responses});
    })
  }).catch((event)=>{
  })
}

exports.newevent = (req,res) => {
  cmpid = req.params.cmpid
  EventModel.create({name: req.body.name, description: req.body.description, img_url: req.body.img_url, campaign_id: req.params.cmpid})
  .then(() => {
    res.redirect(`/app/campaign/${cmpid}`)
  });
}

exports.ansevent = (req,res) => {
  let cmpid = req.params.cmpid;
  let evid = req.params.evid;
  let user_id = req.user.id;
  AdventurerModel.findByMaster(user_id)
    .then((adv) => {
      res.render('dashboard/answer-event-form', {cmpid: cmpid, evid: evid, adv: adv});
    })
}
exports.anseventsend = (req,res) => {
  cmpid = req.params.cmpid
  event_id = req.params.evid
  ResponseModel.create({description: req.body.description, event_id: event_id, adventurer_name: req.body.adventurer_name})
    .then(
      res.redirect(`/app/campaign/${cmpid}`)
    )
}

exports.newplayer = (req,res) => {
  res.render('dashboard/player-invite', {cmpid: req.params.cmpid})
}

exports.allevents = (req,res) => {
  EventModel.findAll()
    .then((events) => {
      
    })

  res.redirect(`/app/campaign/${cmpid}`);
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
        AdventurerModel.findByMaster(user.id)
        .then(adventurers => {
            res.render('dashboard/profile', {user:user, adventurers:adventurers});
          }).catch((adventurers) => {
            res.render('dashboard/profile', {user:user, adventurers:adventurers})
          })
    });
}

exports.addplayerDM = (req,res) => {
  UserModel.getPlayers(req.user.id)
    .then((players) => {
      res.render('dashboard/addcharacter', {players: players})
    })
}

exports.newAdventurer = (req,res) => {
  id = req.user.id
  AdventurerModel.createAdventurer({name: req.body.name, race: req.body.race, class: req.body.class, master_id: req.body.master_id})
   .then(() => {
      res.redirect(`/app/profile/${id}`)
   })
  
}

exports.bestiary = (req,res) => {
  res.render('dashboard/bestiary')
}
