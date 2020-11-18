let binarySearch = function (arr, value) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = low + ((high - low) >> 1);
        if (arr[mid] === value) {
            if (mid === arr.length - 1 || arr[mid + 1] > value) {
                return mid;
            }
            else {
                low = mid + 1;
            }
        }
        else if (arr[mid] > value) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }

    return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 8, 9]
console.log(binarySearch(arr, 6.1))     //  -1
console.log(binarySearch(arr, 7))       //  9
console.log(binarySearch(arr, 6))       //  8
console.log(binarySearch(arr, 5))       //  4
console.log(binarySearch(arr, 1))       //  0
console.log(binarySearch(arr, 10))      //  -1