let find = function (node, data) {
    let t = node;
    while (!t) {
        if (data > t.val) {
            t = t.right
        } else if (data < t.val) {
            t = t.left
        } else {
            return t
        }
    }

    return null
}