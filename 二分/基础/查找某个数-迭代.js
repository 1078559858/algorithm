let binaryFind = function (arr, value) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1)
        if (arr[mid] === value) {
            return mid
        }
        else if (arr[mid] > value) {
            right = mid
        }
        else {
            left = mid;
        }
    }
}