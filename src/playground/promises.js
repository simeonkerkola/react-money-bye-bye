const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'simi',
    //   age: 26,
    // })
    reject('something went wrong :(')
  }, 2000)
})

console.log('before');

promise.then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err);
})

console.log('after');
