
export function generateData(size, max) {
    const X = [];
    const xSet = new Set();
    const F = [];
    const SUB_SIZE = 20;
    const MAX_SIZE = 30;  // size必须大于MAX_SIZE

    for (let i = 0; i < size; i++) {
        // console.log(i);
        let rand = Math.ceil(Math.random() * max);

        while (xSet.has(rand)) {
            rand = Math.ceil(Math.random() * max);
            // console.log(rand);
        }

        X.push(rand);
        xSet.add(rand);
    }

    const picked = [];  // 已经被挑选过的
    const xCopy = [...X];  // 未被挑选的
    let unpickedStart = 0;  // 未被挑选的起始下标，与xCopy结合在一起使用

    const onePicked = getRands(xCopy, SUB_SIZE, picked, 0);
    F.push(onePicked);
    unpickedStart += SUB_SIZE;

    while (size - unpickedStart > SUB_SIZE) {  // 未被选择的元素还有超过20个
        // console.log(unpickedStart);
        const randSize = Math.ceil(Math.random() * SUB_SIZE);  // 子集数组大小
        const pickedSize = Math.ceil(Math.random() * randSize);  // 从被挑选过的
        const unpickedSize = randSize - pickedSize;  // 从未被挑选过的
        const sub_picked = getRands([...picked], pickedSize);
        const sub_unpicked = getRands(xCopy, unpickedSize, picked, unpickedStart);
        const sub = [...sub_picked, ...sub_unpicked]
        
        unpickedStart += unpickedSize;

        F.push(sub);
    }

    // console.log(F);

    // 将所有未被处理的元素都加入到F中
    F.push(getRands(xCopy, size - unpickedStart, picked, unpickedStart));

    // 填充F，使其长度等于size
    while (F.length < size) {
        const randSize = Math.ceil(Math.random() * MAX_SIZE);  // 子集数组大小
        F.push(getRands([...X], randSize));
    }

    

    // 对两个集合排序
    X.sort((a, b) => a - b);
    F.forEach(sub => sub.sort((a, b) => a - b));

    // console.log(X, F);

    return [X, F];
    // console.log(X);
}

function getRands(arr, n, picked = null, start = 0) {  // arr.length > size

    // start表示从哪个位置开始挑


    const rands = [];

    let len = arr.length - start;  // 剩余长度

    for (let i = start; i < start + n; i ++) {
        const index = Math.floor(Math.random() * len) + i;
        rands[i - start] = arr[index];
        if (picked) {
            picked.push(arr[index]);
        }
        arr[index] = arr[i];
        len--;
    }

    return rands;
}



// generateData(100, 1000);