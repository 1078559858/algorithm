const str = [1, 2, 3]
str.reduce((total, value) => {
  return total.then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log(value))
      }, 1000);
    })
  })
}, Promise.resolve())