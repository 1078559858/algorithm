var global = require('./utils/global')

var arr = []

let preOrder = function (tree) {
    if (!tree) {
        return
    }

    // console.log(tree.val)
    arr.push(tree.val)
    preOrder(tree.left)
    preOrder(tree.right)
}

let inOrder = function (tree) {
    if (!tree) {
        return
    }

    inOrder(tree.left)
    // console.log(tree.val)
    arr.push(tree.val)
    inOrder(tree.right)
}

let postOrder = function (tree) {
    let arr = []

    function _postOrder(tree) {
        if (!tree) {
            return
        }

        _postOrder(tree.left)
        _postOrder(tree.right)
        arr.push(tree.val)
    }

    _postOrder(tree)

    return arr
}

var node = global.createBinaryTree()

let res = postOrder(node)
console.log(res.join(','))