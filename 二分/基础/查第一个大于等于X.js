let binarySearch = function (arr, value) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = left + ((right - left) >> 1)
        if (arr[mid] >= value) {
            if (mid === 0 || arr[mid - 1] < value) {
                return mid;
            }
            else {
                right = mid - 1;
            }
        }
        else {
            left = mid + 1;
        }
    }

    return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 8, 9]
console.log(binarySearch(arr, 6.1))