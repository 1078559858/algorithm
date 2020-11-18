let binarySearch = function (arr, left, right, value) {
    if (left > right) {
        return -1
    }

    let mid = left + ((right - left) >> 1)
    if (arr[mid] === value) {
        return mid
    }
    else if (arr[mid] < value) {
        return binarySearch(arr, mid + 1, right, value)
    }
    else {
        return binarySearch(arr, left, mid - 1, value)
    }
}

let arr = [1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 8, 9]
console.log(binarySearch(arr, 0, arr.length - 1, 1))   //  0
console.log(binarySearch(arr, 0, arr.length - 1, 2))   //  1
console.log(binarySearch(arr, 0, arr.length - 1, 20))  //  -1