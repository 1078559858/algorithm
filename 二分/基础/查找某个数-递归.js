let binaryFind = function (arr, left, right, value) {
    let mid = left + ((right - left) >> 1)
    if (arr[mid] === value) {
        return mid
    }
    else if (arr[mid] > value) {
        return binaryFind(arr, left, mid, value)
    }
    else {
        return binaryFind(arr, mid, right, value)
    }
}

binaryFind(arr, 0, arr.length - 1, value)