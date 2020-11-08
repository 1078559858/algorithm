let preOrder = function (tree) {
    if (!tree) {
        return
    }

    console.log(tree.val)
    preOrder(tree.left)
    preOrder(tree.right)
}

let inOrder = function (tree) {
    if (!tree) {
        return
    }

    inOrder(tree.left)
    console.log(tree.val)
    inOrder(tree.right)
}

let postOrder = function (tree) {
    if (!tree) {
        return
    }

    postOrder(tree.left)
    postOrder(tree.right)
    console.log(tree.val)
}