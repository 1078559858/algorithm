const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'strawberry', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'pineapple', color: 'yellow' },
  { name: 'grape', color: 'purple' },
  { name: 'plum', color: 'purple' }
];

function test(color) {
  return fruits.every(obj => obj.color == color)
}

console.log(test('yellow'))