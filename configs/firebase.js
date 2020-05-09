let firebase = require('firebase');
var firebaseConfig = {
  apiKey: "AIzaSyDOotcRsZJ4CgAW2eG2kUgUWt9vmN_fUcc",
  authDomain: "dungeon-companion-3b920.firebaseapp.com",
  databaseURL: "https://dungeon-companion-3b920.firebaseio.com",
  projectId: "dungeon-companion-3b920",
  storageBucket: "dungeon-companion-3b920.appspot.com",
  messagingSenderId: "998414387568",
  appId: "1:998414387568:web:6d86ad2817501f9e2fe7b5",
  measurementId: "G-5B7S87JZF5"
};
firebase.initializeApp(firebaseConfig);

exports.firebaseRef = () => {
    return firebase.database().ref()
}