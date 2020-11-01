let utils = require('./排序/utils')
let ListNode = utils.ListNode();
let printList = utils.printList

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    let heap = new Heap()
    for (var i = 0; i < lists.length; i++) {
        if (!lists[i]) {
            continue;
        }

        let list = lists[i]
        heap.createHeap(list)
    }

    heap.buildHeapLittle();

    while (heap.arr.length > 0) {
        let t = heap.arr[0]

        heap.nextNode.next = t;
        heap.nextNode = heap.nextNode.next;

        if (t.next) {
            heap.arr[0] = t.next
            heap.heapifyLittle(heap.arr, heap.arr.length, 0)
        } else {
            [heap.arr[0], heap.arr[heap.arr.length - 1]] = [heap.arr[heap.arr.length - 1], heap.arr[0]]
            heap.arr.pop()
            heap.heapifyLittle(heap.arr, heap.arr.length, 0)
        }
    }

    return heap.listNode.next
};

class Heap {
    constructor(len) {
        this.arr = []
        this.listNode = new ListNode()
        this.nextNode = this.listNode;
    }

    createHeap(list) {
        this.arr.push(list)
    }

    buildHeapLittle() {
        let mid = Math.floor(this.arr.length / 2);
        while (mid >= 0) {
            this.heapifyLittle(this.arr, this.arr.length, mid)
            mid--;
        }
    }

    heapifyLittle(arr, len, i) {
        while (true) {
            let maxPos = i;
            if (i * 2 + 1 < len && arr[i * 2 + 1].val < arr[maxPos].val) {
                maxPos = i * 2 + 1
            }

            if (i * 2 + 2 < len && arr[i * 2 + 2].val < arr[maxPos].val) {
                maxPos = i * 2 + 2;
            }

            if (maxPos === i) {
                break;
            }

            [arr[i], arr[maxPos]] = [arr[maxPos], arr[i]]
            i = maxPos
        }
    }
}

var mock = [[7, 15, 111], []]
var mockList = utils.createListByArr(mock)

printList(mergeKLists(mockList))
