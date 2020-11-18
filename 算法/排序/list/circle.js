var hasCycle = (head) => {
  let fastP = head;
  let slowP = head;
  while (fastP) {                         // 快指针指向真实节点
    if (fastP.next == null) return false; // 如果下一个为null，说明没有环
    slowP = slowP.next;                   // 慢的走一步
    fastP = fastP.next.next;              // 快的走两步
    if (slowP == fastP) return true;      // 快慢指针相遇，有环
  }
  return false;                           // fastP指向null了，也始终不相遇
}

var hasCycle = (head) => {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (fast === slow) {
      return true
    }
  }

  return false
}