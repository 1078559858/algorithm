//  1. 多重判断使用includes

function teset(fruit) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
    if (redFruits.includes(fruit)) {
        console.log('true')
    }
}

//  2. 少量嵌套,尽早使用return(略)


//  3. 使用默认参数和解构
function test({ name } = {}, count = 1) {
    console.log(name || 'unknown');
    console.log(count)
}

//  4. 对象遍历替代switch
const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
};

function test(color) {
    return fruitColor[color] || [];
}

// 5. 判断尽量使用every和some
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
    const isAllRed = fruits.every(f => f.color == 'red');

    console.log(isAllRed); // false
}