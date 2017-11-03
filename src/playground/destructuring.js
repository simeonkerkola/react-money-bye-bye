// console.log('destructuring');
//
// const person = {
//   name: 'Simi',
//   age: 26,
//   location: {
//     city: 'Helsinki',
//     temp: 2,
//   }
// }
//
// // Change const name to firstName, 'Anonymous' by default
// const { name: firstName = 'Anonymous', age } = person
// console.log(`${firstName} is ${age}`);
//
// const { city, temp: temperature } = person.location
// if (location) console.log(`It's ${temperature} in ${city}`);

// Array destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', 19147]
const [, , state = 'New York'] = address
console.log(`You are in ${state}`);
