let a = new Promise((resolve, reject) => {
    console.log('promise start');
    resolve(1)
}).then(data => {
    console.log(`promise 1 is: ${data}`);
    // return Promise.resolve(2)
}).then(data => {
    console.log(`promise 2 is: ${data}`);
    // return 3
}).then(data => {
    console.log(`2promise 3 is: ${data}`);
    // return Promise.resolve(4)
})

let b = new Promise((resolve, reject) => {
    console.log('2promise start');
    resolve(1)
}).then(data => {
    console.log(`2promise 1 is: ${data}`);

    setTimeout(() => {
        console.log('xxx')
        return Promise.resolve(2)
    }, 1000);

}).then(data => {
    console.log(`2promise 2 is: ${data}`);
    return 3
}).then(data => {
    console.log(`2promise 3 is: ${data}`);
    return Promise.resolve(4)
})

Promise.resolve()
    .then(() => {
        console.log('xxxxxx1')
        return new Promise(r => {
            setTimeout(() => {
                r(console.log(1))
            }, 1000)
            console.log('yyy1')
        })
    })
    .then(r => {
        console.log('xxxxxx2')
        return new Promise(r => {
            setTimeout(() => {
                r(console.log(2))
            }, 1000)
            console.log('yyy2')
        })
    })
    .then(r => {
        console.log('xxxxxx3')
        return new Promise(r => {
            setTimeout(() => {
                r(console.log(3))
            }, 1000)
            console.log('yyy3')
        })
    })


Promise.resolve()
    .then(new Promise(r => {
        setTimeout(() => {
            r(console.log(1))
        }, 1000)
    }))
    .then(new Promise(r => {
        setTimeout(() => {
            r(console.log(2))
        }, 1000)
    }))
    .then(new Promise(r => {
        setTimeout(() => {
            r(console.log(3))
        }, 1000)
    }))


// let b = async function () {
//     console.log(`b `);
//     let c = await async1()
//     console.log(c);
// }

// let async1 = async function () {
//     console.log(`async 1 start `);
//     return new Promise((resolve, reject) => {
//         console.log(`async 1 resolve `);
//         resolve(`async 1`)
//     }).then(res => {
//         console.log(`async 1 end `);
//         return Promise.resolve('async1 end end')
//     })
// }

// b()