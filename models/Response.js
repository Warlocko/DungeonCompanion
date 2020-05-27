let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const responsesRef = dbRef.child('responses')

exports.create = (response) => {
  let key = responsesRef.push().key
  return responsesRef.child(key).set({
    id: key,
    description: response.description,
    adventurer_name: response.adventurer_name,
    event_id: response.event_id
  });
}

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    let response = null
    responsesRef.orderByChild('id').equalTo(id).on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        response = data.val()
        if (response) {
          resolve(response)
        }
      })
      if (!snapshot.hasChildren()) {
        reject(null)
      }
    });
  });
}

exports.addResult = (description, response_id) => {
  let key = responsesRef.child(response_id).child('results').push().key
  return responsesRef.child(response_id).child('results').child(key).set({
    id: key,
    description: description
  })
}

exports.getResults = (response_id) => {
  let results = []
  return new Promise ((resolve, reject)=> {
    responsesRef.child(response_id).child('results').on("value", function(snapshot){
      snapshot.forEach(function(data){
        results.push(data.val())
      })
      if(results){
        resolve(results)
      }else{
        reject([])
      }
    })
  })
}

exports.findByEventId = (event_id) => {
  let responses = []
  let eventID = ""
  return new Promise((resolve, reject) => {
    responsesRef.on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        responsesRef.child(childSnapshot.key).child('event_id').on("value", function (evid) {
          eventID = evid.val()
        })
        if (eventID == event_id) {
          responses.push(childSnapshot.val())
        }
      })
      if(responses!=[]){
        resolve(responses)
      }else{
        reject([])
      }
    });
  });
}

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    responsesRef.on("value", function (snapshot) {
      let responses = snapshot.val()
      if (responses) {
        resolve(responses);
      } else {
        reject(null)
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })
}