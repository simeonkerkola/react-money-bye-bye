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

database.ref().set({
  name: 'Simi',
  age: 26,
  hasEaten: false,
  location: {
    city: 'Stadi',
    country: 'Härmä',
  },
})
// database.ref().set('This is my data')
database.ref('age').set(22)
database.ref('location/city').set('Hesa')
database
  .ref('attr')
  .set({ height: 666 })
  .then(() => {
    console.log('Height updated')
  })
  .catch((err) => {
    console.log('Couldn update :(', err)
  })

console.log('I made changes to data')
