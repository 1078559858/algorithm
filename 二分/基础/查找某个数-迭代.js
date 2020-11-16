let binarySearch = function (arr, value) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        if (arr[mid] === value) {
            return mid
        }
        else if (arr[mid] > value) {
            right = mid - 1;
        }
        else {
            left = mid + 1
        }
    }
    return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 8, 9]
console.log(binarySearch(arr, 1))   //  0
console.log(binarySearch(arr, 2))   //  1
console.log(binarySearch(arr, 20))  //  -1