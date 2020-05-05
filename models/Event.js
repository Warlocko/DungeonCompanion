let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const eventsRef = dbRef.child('events')

exports.create = (event) => {
  let key = eventsRef.push().key
  return eventsRef.child(key).set({
    id: key,
    name: event.name,
    description: event.description
  });
}

exports.findById = (id) => {
    return new Promise((resolve,reject) => {
        let event = null
      eventsRef.orderByChild('id').equalTo(id).on("value", function(snapshot) {
        snapshot.forEach(function(data) {   
                event = data.val()
                if(event){
                  resolve(event)
                }
            })
        if(!snapshot.hasChildren()){
          reject(null)
        }
        });
    });
}

exports.findByCampaignId = (campaign_id) => {
    return new Promise((resolve,reject) => {
        eventsRef.orderByChild('campaign_id').equalTo(campaign_id).on("value", function(snapshot) {
          if(snapshot.val()){
              resolve(snapshot.val())
          }else{
              reject(null)
          }
          });
      });
}

exports.findAll = () => {
    return new Promise((resolve,reject) => {
      eventsRef.on("value", function(snapshot) {
        let events = snapshot.val()
        if(events){
          resolve(events);
        }else{
          reject(null)
        }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    })
  }