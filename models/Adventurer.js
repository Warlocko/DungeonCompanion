let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const adventurersRef = dbRef.child('adventurers');

exports.findByMaster = (master_id) => {
    return new Promise((resolve,reject) => {
    adventurersRef.orderByChild('master_id').equalTo(master_id).on("value", function(snapshot) {
      if(snapshot.val()){
        resolve(snapshot.val())
      }else{
        reject(null)
      }
      });
  });
  }

exports.createAdventurer = (adventurer) => {
  let key = adventurersRef.push().key
  return adventurersRef.child(key).set({
    id: key,
    name: adventurer.name,
    class: adventurer.class,
    race: adventurer.race,
    master_id: adventurer.master_id
  });
}