let firebase = require('../configs/firebase')
const dbRef = firebase.firebaseRef()
const usuariosRef = dbRef.child('usuarios');
const bcrypt = require('bcrypt')

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.find = (id) => {
  return new Promise((resolve,reject) => {
    const userRef = usuariosRef.child(id);
    userRef.on("value", function(snapshot) {
      let user = snapshot.val()
      if(user){
        resolve(snapshot.val());
      }else{
        reject('User error')
      }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  })
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
  return new Promise((resolve,reject) => {
    let user = null
  usuariosRef.orderByChild('email').equalTo(email).on("value", function(snapshot) {
    snapshot.forEach(function(data) {   
            user = data.val()
            if(user){
              resolve(user)
            }
        })
    if(!snapshot.hasChildren()){
      reject(null)
    }
    });
});
}

/**
 * Crea al usuario con los datos definidos dentro del objeto user
 */
exports.create = (user) => {
  // Obtiene la contraseña definida por el usuario
  let pass = user.password;
  // Encripta la contraseña
  pass = bcrypt.hashSync(pass, 10);
  let key = usuariosRef.push().key
  return usuariosRef.child(key).set({
    id: key,
    username: user.name,
    email: user.email,
    password: pass,
    role: user.role
  });
}

exports.findAll = () => {
  return new Promise((resolve,reject) => {
    usuariosRef.on("value", function(snapshot) {
      let users = snapshot.val()
      if(users){
        resolve(users);
      }else{
        reject(null)
      }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  })
}