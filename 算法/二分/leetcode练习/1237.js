// 统计有序二维数组,除常规算法外,还有nlogn和m+n,两种解法.
// 240 解法2
// nlogn和nlogm的区别,到底有没有nlog的实现, 
// 二分查找的套路,双指针\nlogn\把数组分为四部分

// 待实现
// 1337
// 167
// 面试题 10.05. 稀疏数组搜索
// 350


let find = function (arr, left = 0, right = arr.length - 1) {
    if (left > right) {
        console.log(left, right)
        return arr.length;
    }

    let mid = left + ((right - left) >> 1)
    let res = arr[mid]
    if (res === 0) {
        if (mid === 0 || arr[mid - 1] === 1) {
            return mid
        } else {
            return find(arr, left, mid - 1)
        }
    } else {
        return find(arr, mid + 1, right)
    }
}

let arr = [1, 1, 1, 0, 0, 0, -1]
// let arr = [0, 0, 0, 0, 0, 0, 0]
// let arr = [1, 1, 1, 1, 1, 1, 1]
console.log(find(arr))