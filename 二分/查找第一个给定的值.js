let bianryFindFirst = function (arr, value) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1)

        if (arr[mid] === value) {
            if (mid !== 0 || arr[mid] < value) {
                return mid
            }
            else {
                right = mid - 1;
            }
        }
        else if (arr[mid] < value) {
            left = mid;
        }
        else {
            right = mid
        }
    }
}