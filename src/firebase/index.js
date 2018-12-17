import firebase from 'firebase/app';
import 'firebase/storage';
import api_key from './api_key';

// Initialize Firebase
var config = {
   apiKey: api_key,
   authDomain: "card-swap-72684.firebaseapp.com",
   databaseURL: "https://card-swap-72684.firebaseio.com",
   projectId: "card-swap-72684",
   storageBucket: "card-swap-72684.appspot.com",
   messagingSenderId: "30007662181"
 };
 
 firebase.initializeApp(config);
 
 const storage = firebase.storage();

 export {
    storage, firebase as default
 }