export class MinHeap {
    constructor(arr) {
        this.heap = arr;
        const heap = this.heap;
        const n = heap.length;
        for (let j = Math.floor(n / 2) - 1; j >= 0; j--) {
            let k = j;
            while (
                (2 * k + 1 < n && heap[2 * k + 1] < heap[k]) ||
                (2 * k + 2 < n && heap[2 * k + 2] < heap[k])
            ) {
                if (2 * k + 2 < n && heap[2 * k + 2] < heap[2 * k + 1]) {
                    [heap[k], heap[2 * k + 2]] = [heap[2 * k + 2], heap[k]];
                    k = 2 * k + 2;
                } else {
                    [heap[k], heap[2 * k + 1]] = [heap[2 * k + 1], heap[k]];
                    k = 2 * k + 1;
                }
            }
        }
    }

    getMin() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    popMin() {
        const heap = this.heap;
        let n = heap.length;
        [heap[0], heap[n - 1]] = [heap[n - 1], heap[0]];
        heap.pop();
        n = n - 1;

        let k = 0;

        while (
            (2 * k + 1 < n && heap[2 * k + 1] < heap[k]) ||
            (2 * k + 2 < n && heap[2 * k + 2] < heap[k])
        ) {
            if (2 * k + 2 < n && heap[2 * k + 2] < heap[2 * k + 1]) {
                [heap[k], heap[2 * k + 2]] = [heap[2 * k + 2], heap[k]];
                k = 2 * k + 2;
            } else {
                [heap[k], heap[2 * k + 1]] = [heap[2 * k + 1], heap[k]];
                k = 2 * k + 1;
            }
        }
    }

    add(ele) {
        this.heap.push(ele);
        const n = this.heap.length;

        let k = n - 1;
        let p = Math.floor((k + 1) / 2) - 1;  // 父节点坐标

        while (p >= 0 && this.heap[p] > this.heap[k]) {
            [this.heap[p], this.heap[k]] = [this.heap[k], this.heap[p]];
            k = p;
            p = Math.floor((k + 1) / 2) - 1;
        }

        return true;
    }
}

const heap = new MinHeap([12,9,10,6,4,5,3]);
heap.popMin();