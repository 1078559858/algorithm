// 1. 最大节点
// 2. 最小节点
// 3. 前驱节点
// 4. 后继节点
// 5. 层高

var global = require('./utils/global')

let floor = function (node) {
    let total = 0

    function _floor(node, current) {
        if (!node) {
            return
        }

        if (node.left) {
            total = Math.max(total, current + 1)
            _floor(node.left, current + 1)
        }

        if (node.right) {
            total = Math.max(total, current + 1)
            _floor(node.right, current + 1)
        }
    }

    _floor(node, 1)

    return total
}

// 测试层高
// var node = global.createBinaryTree()
// console.log(floor(node))