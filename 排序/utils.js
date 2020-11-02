module.exports.swap = function (arr, i, j) {
  if (arr instanceof Array) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  } else {
    console.log('not arr')
  }
}

module.exports.ListNode = function () {
  return function (val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

module.exports.printList = function (list) {
  let printArr = []
  while (list) {
    printArr.push(list.val)
    list = list.next
  }
  console.log(printArr)
}

module.exports.printListArr = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    let printArr = []
    let list = arr[i]
    while (list) {
      printArr.push(list.val)
      list = list.next
    }
    console.log(printArr)
  }
}

module.exports.createListByArr = function (mock, mockList = []) {
  let listnode = module.exports.ListNode()
  for (var i = 0; i < mock.length; i++) {
    let n = mock[i].length
    let node = new (module.exports.ListNode())()
    let nextNode = node;
    let j = -1
    while (++j < n) {
      nextNode.next = new listnode(mock[i][j])
      nextNode = nextNode.next
    }
    mockList.push(node.next)
    // module.exports.printList(node.next)
  }
  return mockList
}