let heightOrder = function (tree) {
    if (!tree) {
        return
    }

    let arr = []
    arr.push(tree)

    while (arr.length) {
        let temp = arr.shift()
        if (temp.left) {
            arr.push(temp.left)
        }

        if (temp.right) {
            arr.push(temp.right)
        }
    }
}