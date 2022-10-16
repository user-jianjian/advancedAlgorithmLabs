export class MinHeap {
    constructor(arr) {
        this.heap = arr === undefined ? [] : arr;
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

    isEmpty() {
        return this.heap.length === 0;
    }

    getMin() {
        return this.heap[0];
    }

    popMin() {
        const heap = this.heap;
        const top = heap[0];
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

        return top;
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

// const heap = new MinHeap([12,9,10,6,4,5,3]);
// heap.popMin();

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Node {
    constructor(parent, point, topography, targetPoint) {

        this.x = point.x;
        this.y = point.y;
        this.point = point;
        this.parent = parent;


        if (parent === null) {  // 说明是根节点
            this.G = 0;
            this.H = 0;
        } else {
            this.G = this.parent.G + topography + Math.sqrt(Math.pow(this.x - this.parent.x, 2) +
                Math.pow(this.y - this.parent.y, 2));
            this.H = Math.sqrt(Math.pow(this.x - targetPoint.x, 2) +
                Math.pow(this.y - targetPoint.y, 2));
        }

        this.F = this.G + this.H;
    }
}

Node.prototype.valueOf = function () {
    return this.F;
}

export class BiNode {
    constructor(parent, point, map, source, target, reverse) {
        this.parent = parent;
        this.point = point;
        this.x = point.x;
        this.y = point.y;


        const sourceDis = Math.sqrt(Math.pow(this.x - source.x, 2) + Math.pow(this.y - source.y, 2));
        const targetDis = Math.sqrt(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2));

        if (parent === null) {
            this.G = 0;
            this.H = targetDis;
        } else {
            this.G = this.parent.G + map[this.x][this.y] + Math.sqrt(Math.pow(this.x - this.parent.x, 2) +
                Math.pow(this.y - this.parent.y, 2));
                
            if (!reverse) {
                this.H = (targetDis - sourceDis) / 2 - this.parent.H;
            } else {
                // 保证potential函数是相反的就行
                this.H = (sourceDis - targetDis) / 2 - this.parent.H;
            }
        }

        this.F = this.G + this.H;
    }
}

BiNode.prototype.valueOf = function () {
    return this.F;
}