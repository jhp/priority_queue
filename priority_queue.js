module.exports = function newQueue(plus, q=[]) {

    const self = {
        isEmpty: () => !q.length
    };

    self._getHeap = () => q;

    self.copy = () => newQueue(plus, q.map(([idx,val]) => [idx,val]));

    self.push = (priority, elem) => {
        let idx = q.length;
        let parent = Math.ceil(idx/2) - 1;
        q.push(null);
        while(parent >= 0 && q[parent][0] > priority) {
            q[idx] = q[parent];
            idx = parent;
            parent = Math.ceil(idx/2) - 1;
        }
        q[idx] = [priority, elem];
        return self;
    };

    function popOne() {
        if(q.length === 1) {
            return q.pop();
        }
        let ret = q[0];
        let popped = q.pop();
        let idx = 0;
        while(true) {
            let minIdx = idx, min = popped;
            let lidx = idx*2 + 1;
            let ridx = idx*2 + 2;
            if(lidx < q.length && q[lidx][0] < min[0]) {
                min = q[lidx];
                minIdx = lidx;
            }
            if(ridx < q.length && q[ridx][0] < min[0]) {
                min = q[ridx];
                minIdx = ridx;
            }
            if(minIdx === idx) {
                q[idx] = popped;
                return ret;
            }
            q[idx] = q[minIdx];
            idx = minIdx;
        }
    }

    self.pop = () => {
        if(!q.length) throw new Error("underflow");
        let res = popOne();
        while(q.length && q[0][0] === res[0]) {
            res[1] = plus(res[1], popOne()[1]);
        }
        return res;
    }

    return self;
}
