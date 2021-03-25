let PQ = require("./priority_queue");

function testArray(arr) {
    const q = PQ((l,r) => l + r);
    for(let elem of arr) {
        q.push(elem, 1);
    }

    let sorted = arr.sort((l,r) => l - r);
    for(let ii = 0; ii < sorted.length; ) {
        let start = ii;
        let end = ii + 1;
        while(end < sorted.length && sorted[start] === sorted[end])
            end++

        let [elem, multiple] = q.pop();
        if(elem !== sorted[ii] || multiple !== end - start) {
            throw new Error("Array test failed", arr);
        }
        ii = end;
    }
}

testArray([]);
testArray([1,2,3]);
testArray([1,1,1]);

const randomArray = [];
for(let ii = 0; ii < 10000; ii++) {
    randomArray.push(Math.floor(Math.random() * 1000));
}
testArray(randomArray);


console.log("Tests passed");
