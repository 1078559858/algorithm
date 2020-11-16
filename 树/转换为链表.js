let global = require('./utils/global')

function Convert(pRootofTree) {
    if (!pRootofTree) {
        return
    }

    converCore(pRootofTree)
    while (pRootofTree.left) {
        pRootofTree = pRootofTree.left
    }

    return pRootofTree
}

function converCore(node, last) {
    if (node.left) {
        last = converCore(node.left, last)
    }

    node.left = last

    if (last) {
        last.right = node
    }

    last = node;
    if (last.right) {
        last = converCore(last.right, node)
    }
    return last
}

var node = global.createBinaryTree()
var res = Convert(node)

console.log(res);