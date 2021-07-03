import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC5fDsOkTCluEIIHxTJk06giPGnb3KVI7c",
    authDomain: "whatsapp-mern-994c3.firebaseapp.com",
    projectId: "whatsapp-mern-994c3",
    storageBucket: "whatsapp-mern-994c3.appspot.com",
    messagingSenderId: "754971802583",
    appId: "1:754971802583:web:76e4bfccdccad8ac7ea992"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
  const provider =new firebase.auth.GoogleAuthProvider();

export {provider};

export default auth;