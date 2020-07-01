import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


 var firebaseConfig = {
    apiKey: "AIzaSyBPPYjoFySM6jdAZh3ZycC4H289lGJ09I4",
    authDomain: "primax-bd2d6.firebaseapp.com",
    databaseURL: "https://primax-bd2d6.firebaseio.com",
    projectId: "primax-bd2d6",
    storageBucket: "primax-bd2d6.appspot.com",
    messagingSenderId: "525173646822",
    appId: "1:525173646822:web:e0184a4eabc354060fa227",
  };


// var firebaseConfig = {
//   apiKey: "AIzaSyD1uYO9ZGxhle3RTiAKcG6ASrGRaPOVTJE",
//   authDomain: "nativeinst-5cf81.firebaseapp.com",
//   databaseURL: "https://nativeinst-5cf81.firebaseio.com",
//   projectId: "nativeinst-5cf81",
//   storageBucket: "nativeinst-5cf81.appspot.com",
//   messagingSenderId: "302604961579",
//   appId: "1:302604961579:web:0d15f65ba07b7e11dee76e",
// };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
