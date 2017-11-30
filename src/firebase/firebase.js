import * as firebase from 'firebase' // takes all named exports from firebase, use like firebase.anyMethod

const config = {
  apiKey: 'AIzaSyA1aGkbCCri3JAm1IIxzt61ibPOfPGoAmQ',
  authDomain: 'expensify-7781a.firebaseapp.com',
  databaseURL: 'https://expensify-7781a.firebaseio.com',
  projectId: 'expensify-7781a',
  storageBucket: 'expensify-7781a.appspot.com',
  messagingSenderId: '461278143099',
}

firebase.initializeApp(config)

const database = firebase.database()

export { firebase, database as default }
