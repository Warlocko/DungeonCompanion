let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const campaignRef = dbRef.child('campaigns')

exports.create = (campaign) => {
    let key = campaignRef.push().key
    return campaignRef.child(key).set({
      id: key,
      name: campaign.name,
      description: campaign.description
    });
  }

  exports.findAll = () => {
    return new Promise((resolve,reject) => {
        campaignRef.on("value", function(snapshot){
          if(snapshot.val()){
            console.log(snapshot.val())
            resolve(snapshot.val())
          }else{
            reject('No hay campaigns')
          }
        })
    })
  }