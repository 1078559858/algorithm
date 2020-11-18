let insert = function (node, data) {
    if (!node) {
        return new Node(data);
    }

    let t = node;
    while (t !== null) {
        if (data > t.val) {
            if (t.right === null) {
                t.right = new Node(data)
                return
            }
            p = p.right
        }
        else {
            if (t.left === null) {
                t.left = new Node(data)
                return;
            }
            p = p.left
        }
    }



}