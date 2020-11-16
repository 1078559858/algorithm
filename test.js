/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 */
var FindElements = function (root) {
    this._root = root;

    if (root && root.val === -1) {
        this._root.val = 0
    }

    let dfs = function (root) {
        if (!root) {
            return
        }

        root.left && (root.left.val = root.val * 2 + 1)
        root.right && (root.right.val = root.val * 2 + 2)
        dfs(root.left)
        dfs(root.right)
    }

    dfs(this._root)
};

/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function (target) {
    let flag = false

    let dfs = function (root) {
        if (!root || flag) {
            return
        }

        if (root.val === target) {
            flag = true
        }

        dfs(root.left)
        dfs(root.right)
    }

    dfs(this._root)

    return flag;
};

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */