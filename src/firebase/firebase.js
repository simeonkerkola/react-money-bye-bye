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

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, 'Removed', snapshot.val())
// })
//
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, 'Changed', snapshot.val());
// })
//
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, 'Added', snapshot.val());
// })

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []
//
//   snapshot.forEach((child) => {
//     expenses.push({
//       id: child.key,
//       ...child.val(),
//     })
//   })
//   console.log(expenses)
// })
//
// setTimeout(() => {
//   database.ref('expenses').push({
//     description: 'Something expensive',
//     note: '',
//     amount: 45345555,
//   })
// }, 3000)

// Preparing data for Redux
// database
//   .ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = []
//
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key, // Value of automatically created id
//         ...childSnapshot.val(), // Get everything else as well
//       })
//     })
//     console.log(expenses);
//   })

// database.ref('expenses').push({
//   description: 'Rent',
//   amount: 666,
//   note: 'paid full'
// })
