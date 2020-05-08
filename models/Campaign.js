let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const campaignRef = dbRef.child('campaigns')

exports.create = (campaign) => {
    let key = campaignRef.push().key
    return campaignRef.child(key).set({
      id: key,
      name: campaign.name,
      description: campaign.description,
      img_url: campaign.img_url,
      DM_id: campaign.DM_id
    });
  }

  exports.findAll = () => {
    return new Promise((resolve,reject) => {
        campaignRef.on("value", function(snapshot){
          if(snapshot.val()){
            resolve(snapshot.val())
          }else{
            reject([])
          }
        })
    })
  }

  exports.findByUserId = (user_id) => {
    let campaigns = []
    let campaignDM = ""
    return new Promise((resolve, reject) => {
      campaignRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          campaignRef.child(childSnapshot.key).child('DM_id').on("value",function(dm) {
            campaignDM = dm.val()
          })
          if(childSnapshot.child('jugadores').hasChild(user_id) || campaignDM==user_id){
            campaigns.push(childSnapshot.val())
          }
        })
        if(campaigns!=[]){
          resolve(campaigns)
        }else{
          reject([])
        }
      })
    })
  }

exports.addPlayer = (user,campaign_id) => {
   return campaignRef.child(campaign_id).child('jugadores').child(user.id).set({
     id: user.id,
     name: user.username
   })
}