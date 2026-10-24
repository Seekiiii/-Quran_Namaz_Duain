const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBxvRF4HjvkrooiEZBQqvV7NHwXpZSp_bU",
    authDomain: "deen-aasan.firebaseapp.com",
    projectId: "deen-aasan",
    storageBucket: "deen-aasan.firebasestorage.app",
    messagingSenderId: "479154999212",
    appId: "1:479154999212:web:5eba19fd8b15b4487d3409",
  };
  let firebaseDb = null;
  if(FIREBASE_CONFIG.apiKey){
    firebase.initializeApp(FIREBASE_CONFIG);
    firebaseDb = firebase.firestore();
  }
