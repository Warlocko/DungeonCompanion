let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const eventsRef = dbRef.child('events')

exports.create = (event) => {
  let key = eventsRef.push().key
  return eventsRef.child(key).set({
    id: key,
    name: event.name,
    description: event.description,
    img_url: event.img_url,
    campaign_id: event.campaign_id
  });
}

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    let event = null
    eventsRef.orderByChild('id').equalTo(id).on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        event = data.val()
        if (event) {
          resolve(event)
        }
      })
      if (!snapshot.hasChildren()) {
        reject(null)
      }
    });
  });
}

exports.findByCampaignId = (campaign_id) => {
  let events = []
  let campaignID = ""
  return new Promise((resolve, reject) => {
    eventsRef.on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        eventsRef.child(childSnapshot.key).child('campaign_id').on("value", function (cmpid) {
          campaignID = cmpid.val()
        })
        if (campaignID == campaign_id) {
          events.push(childSnapshot.val())
        }
      })
      if(events!=[]){
        resolve(events)
      }else{
        reject([])
      }
    });
  });
}

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    eventsRef.on("value", function (snapshot) {
      let events = snapshot.val()
      if (events) {
        resolve(events);
      } else {
        reject(null)
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })
}