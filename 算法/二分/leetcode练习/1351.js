// 1351. 统计有序矩阵中的负数, 有多种解法.
// 因为左右上下都是递减的, 所以算法的实现应该是 * 2的, 一共有8种解法. 
// 其实根据左右和上下两个方向,可以用二分查找法优化一下mlogn和nlogm两种, 复杂度是

// 方法1: 暴力法, 复杂度O(mn)或者O(nm)
var countNegatives1 = function (grid) {
    if (grid.length === 0) {
        return 0
    }

    let m = grid.length;
    let n = grid[0].length;

    let sum = 0;
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (grid[i][j] < 0) {
                sum += (n - j)
                break;
            }
        }
    }

    return sum;
};

// 方法2: 暴力法:者O(nm)
var countNegatives2 = function (grid) {
    if (!grid.length) {
        return 0
    }

    let m = grid.length;
    let n = grid[0].length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[j][i] < 0) {
                sum += (m - j)
                break;
            }
        }
    }

    return sum
}

// 方法3: m+n
var countNegatives3 = function (grid) {
    if (!grid.length) {
        return 0;
    }

    let m = grid.length;
    let n = grid[0].length;
    let sum = 0;

    let pos = n - 1;
    for (let i = 0; i < m; i++) {
        for (var j = pos; j >= 0; j--) {
            if (grid[i][j] >= 0) {
                pos = j
                break;
            }
        }

        sum += (n - j - 1)
    }
    return sum
}

// 方法4: n+m
var countNegatives4 = function (grid) {
    if (!grid.length) {
        return 0
    }

    let m = grid.length;
    let n = grid[0].length;
    let sum = 0;
    let pos = m - 1;
    for (let j = 0; j < n; j++) {
        for (var i = pos; i >= 0; i--) {
            if (grid[i][j] >= 0) {
                pos = i;
                break
            }
        }
        sum += (m - i - 1)
    }
    return sum
}

// 方法5: 复杂度mlogn
var countNegatives5 = function (grid) {
    if (!grid.length) {
        return 0;
    }

    let m = grid.length;
    let n = grid[0].length;
    let sum = 0;

    let bSearch = function (arr, left, right) {
        if (left > right) {
            return -1;
        }

        let mid = left + ((right - left) >> 1);
        if (arr[mid] >= 0) {
            return bSearch(arr, mid + 1, right)
        } else {
            if (mid === 0 || arr[mid - 1] >= 0) {
                return mid
            } else {
                return bSearch(arr, left, mid - 1)
            }
        }
    }

    for (let i = 0; i < m; i++) {
        let pos = bSearch(grid[i], 0, n)
        if (pos >= 0) {
            sum += (n - pos)
        }
    }

    return sum;
}

// 方法6: 复杂度nlogm
var countNegatives6 = function (grid) {
    if (!grid.length) {
        return 0;
    }

    let m = grid.length;
    let n = grid[0].length;
    let sum = 0;
    let bSearch = function (grid, idx, up, down) {
        if (up > down) {
            return -1;
        }

        let mid = up + ((down - up) >> 1);
        if (grid[mid][idx] >= 0) {
            return bSearch(grid, idx, mid + 1, down)
        } else {
            if (mid === 0 || grid[mid - 1][idx] >= 0) {
                return mid;
            } else {
                return bSearch(grid, idx, up, mid - 1)
            }
        }
    }

    for (let i = 0; i < n; i++) {
        let pos = bSearch(grid, i, 0, m - 1)
        if (pos >= 0) {
            sum += (m - pos)
        }
    }

    return sum;
}

// 方法7: 复杂度mlogm
var countNegatives7 = function (grid) {
    if (!grid.length) {
        return 0;
    }

    let m = grid.length - 1;
    let n = grid[0].length - 1;

    let solve = function (grid, mUp, mDown, nLeft, nRight) {
        if (mUp > mDown) {
            return 0
        }

        let mid = mUp + ((mDown - mUp) >> 1);
        let pos = -1;

        for (let i = nLeft; i <= nRight; i++) {
            if (grid[mid][i] < 0) {
                pos = i;
                break;
            }
        }

        let sum = 0;
        if (pos === -1) {
            sum += solve(grid, mid + 1, mDown, nLeft, nRight)
        } else {
            sum += (grid[0].length - pos)
            sum += solve(grid, mUp, mid - 1, pos, nRight)
            sum += solve(grid, mid + 1, mDown, nLeft, pos)
        }

        return sum
    }

    return solve(grid, 0, m, 0, n)
}

// 方法8: 复杂度nlogn
var countNegatives = function (grid) {
    if (!grid.length) {
        return 0
    }

    let m = grid.length - 1;
    let n = grid[0].length - 1;
    let solve = function (grid, nLeft, nRight, mUp, mDown) {
        if (nLeft > nRight) {
            return 0;
        }

        let mid = nLeft + ((nRight - nLeft) >> 1)
        let pos = -1;
        for (let i = mUp; i <= mDown; i++) {
            if (grid[i][mid] < 0) {
                pos = i;
                break;
            }
        }

        let sum = 0;
        if (pos === -1) {
            sum += solve(grid, mid + 1, nRight, mUp, mDown)
        } else {
            sum += (grid.length - pos)
            sum += solve(grid, nLeft, mid - 1, pos, mDown)
            sum += solve(grid, mid + 1, nRight, mUp, pos)
        }

        return sum;
    }

    return solve(grid, 0, n, 0, m)
}



var grid = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]];
console.log(countNegatives(grid))

var grid = [[3, 2], [1, 0]]
console.log(countNegatives(grid))

var grid = [[3, -1, -3, -3, -3], [2, -2, -3, -3, -3], [1, -2, -3, -3, -3], [0, -3, -3, -3, -3]]
console.log(countNegatives(grid))

var grid = [[5, 1, 0], [-5, -5, -5]];
console.log(countNegatives(grid))