
import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "what-you-do-894d6",
    storageBucket: "what-you-do-894d6.appspot.com",
    messagingSenderId: "93142296643",
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: "G-9DJ8M61PWL"
  
  };
  firebase.initializeApp(config);

  export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
      
    },
    
  };

export default firebase