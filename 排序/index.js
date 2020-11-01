function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var arr = [
    [],
    [1],
    [2, 1],
    [2, 1, 3],
    [2, 3, 54, 6, 2, 4, 56, 6, 7, 8]
]

var head = new ListNode(4);
var next = head.next = new ListNode(1)
next = next.next = new ListNode(12)
next = next.next = new ListNode(3)
next = next.next = new ListNode(31)

var head1 = new ListNode(4);

var head2 = new ListNode(4);
head2.next = new ListNode(1)

var head3 = new ListNode(4);
head3.next = new ListNode(1)
head3.next.next = new ListNode(12)

var arrHead = [
    new ListNode(), //  []
    head1,          //  4
    head2,          //  4   1
    head3,          //  4   1   12
    head            //  4   1   12  31
]

var printSort = function (fn) {
    arr.forEach(value => {
        fn(value)
        console.log(value)
    })
}

var printSortList = function (fn) {
    arrHead.forEach(head => {
        var sortHead = fn(head)

        var printArr = []
        while (sortHead) {
            printArr.push(sortHead.val)
            sortHead = sortHead.next
        }
        console.log(printArr)

    })
}

// // var sortAll = require('./main/bulleSort.txt')    // 冒泡排序测试
// // var sortAll = require('./main/insertSort.txt')   // 插入排序测试
// // var sortAll = require('./main/selectSort.txt')   // 选择排序测试
// // var sortAll = require('./main/mergeSort.txt')    // 归并排序测试
// // var sortAll = require('./main/quickSort.txt')    // 快排排序测试
var sortAll = require('./main/heapSort.txt')     // 堆排序测试
printSort(sortAll.sort)

var sortAll = require('./main/mergeSortList.txt')   // 堆排序测试-链表
// printSortList(sortAll.sortList)

