var utils = require('../utils')

var swap = utils.swap;

var reverseList = function (head) {
  let [pre, curr] = [null, head]
  while (curr) {
    let temp = curr.next;
    curr.next = pre
    pre = curr
    curr = temp
  }

  return pre
}


