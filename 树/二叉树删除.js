let deleteNode = function (node, data) {
    let p = node;
    let pp = null;

    while (p !== null && p.data != data) {
        pp = p
        if (data > p.val) {
            p = p.right
        }
        else {
            p = p.left
        }
    }

    if (p === null) {
        return
    }

    // 要删除的结点有两个子节点
    if (p.left !== null && p.right !== null) {
        let minP = p.right;
        let minPP = p;

        while (minP.left !== null) {
            minPP = minP
            minP = minP.left
        }

        p.data = minP.data
        p = minP
        pp = minPP
    }

    let child = null
    if (p.left !== null) {
        child = p.left
    } else if (p.right !== null) {
        child = p.right
    } else {
        child = null
    }

    if (pp === null) {
        node = child
    }
    else if (pp.left === p) {
        pp.left = child
    }
    else {
        pp.right = child
    }

}











