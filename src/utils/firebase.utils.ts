import * as firebase from "firebase/app";
import * as firebaseDB from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQyJBpTcXBvdDjvMnZHpB1rzsXnwY9g70",
  authDomain: "hriyaan-24ae1.firebaseapp.com",
  databaseURL: "https://hriyaan-24ae1-default-rtdb.firebaseio.com",
  projectId: "hriyaan-24ae1",
  storageBucket: "hriyaan-24ae1.appspot.com",
  messagingSenderId: "366933122954",
  appId: "1:366933122954:web:40735430be0513e41ab273",
  measurementId: "G-NEN52EJCXW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebaseDB.getDatabase(app)


export const startListeningForChangesOnRoom = (roomID:string, onChangeListner:(val: any)=>void) => {
    const query =  firebaseDB.query(firebaseDB.ref(database, `mafia/${roomID}`))

    const listener = firebaseDB.onValue(query, (snapshot) => {
      let val = snapshot.val()
      console.log(2);
      console.log(val);
      onChangeListner(val)
    })

    return listener
}