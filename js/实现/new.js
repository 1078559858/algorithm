
Promise.resolve(1).then(res => {
  console.log(res)
}).then(res => {
  console.log(res)
}).then(res => {
  console.log(res)
})

Promise.resolve(1).then(res => {
  console.log(res)
}).then(res => {
  console.log('1' + res)
}).then(res => {
  console.log('12' + res)
}).then(res => {
  console.log('123' + res)
})

async function async1() {
  console.log('async1');
  // thrownewError('error!!!')
  return 'async1 success'
}
async1().then(res => console.log(res))

new Promise(resolve => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
}).then(res => {
  console.log('1' + res)
}).then(res => {
  console.log('2' + res)
})