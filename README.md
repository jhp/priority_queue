jhp's priority queue
====================

This is a simple javascript implementation of minimum priority queues. It
allows multiple entries with the same priority, and these will be
combined with a custom function when popping the queue.


Examples
--------

~~~{.javascript}
let PQ = require("priority_queue");

// multiple elements at the same priority will be combined via +
let plus = (left,right) => left + right;

// create a new empty queue, with the given concatenation operator
let queue = PQ(plus);

queue.push(2, "two");
queue.push(3, "three");
queue.push(1, "one");

// elements will pop off the queue starting from the min element,
// regardless of insertion order
queue.pop(); // returns [1, "one"]
queue.pop(); // returns [2, "two"]
queue.pop(); // returns [3, "three"]
queue.isEmpty(); // returns true

// multiple elements with the same priority will be combined.
queue.push(5, "five");
queue.push(5, "five");
queue.pop(); // returns [5, "fivefive"]
queue.isEmpty(); // returns true

// other operations
let copied = queue.copy();
queue.push(10, "ten");

copied.isEmpty(); // true
queue.isEmpty(); // false

// the underlying heap array can be taken out, for example to
// serialize the structure. The heap array can then be passed
// as a second argument to construct an identical queue.

// WARNING: the array in the second argument must satisfy
// heap invariants. Don't just throw unsorted data in
// to initialize, push the elements one-by-one instead.

let array = queue._getHeap(); // [[10, "ten"]]
let initialized = PQ(plus, array);
~~~
