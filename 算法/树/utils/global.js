function BT(value) {
    this.left = null
    this.right = null
    this.val = value !== null ? value : null
}

let tempArr = [
    [10],
    [5, 15],
    [1, 7, 11, 16],
    // [7, 8, 9, 10, null, null, 1, 2]
]

module.exports.createBinaryTree = function (arr) {
    arr = arr || tempArr;

    let rootBinaryTreeNode = new BT(arr[0][0])

    let hArr = []
    hArr.push(rootBinaryTreeNode)

    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j += 2) {
            let t = hArr.shift()
            t.left = new BT(arr[i][j])
            t.right = new BT(arr[i][j + 1])

            hArr.push(t.left)
            hArr.push(t.right)
        }
    }

    return rootBinaryTreeNode
}

module.exports.printTree = function (node) {

}