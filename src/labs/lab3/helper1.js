import { difference } from "set-operations";

// const random = new Random(); // uses the nativeMath engine

const [X, F] = generateData(500, 1000);
console.log(X);
console.log(F);

export function generateData(size, maxInteger) {

    const X = new Set();
    const F = new Set();

    // 生成1到maxInterger的随机整数
    while (X.size < size) {
        X.add(Math.ceil(Math.random() * maxInteger));
    }

    console.log(X);

    let pickedX = new Set();  // X中已经选择过的元素
    let unpickedX = new Set([...X]);  // X中尚未被选择的元素

    const onepickedSet = getRandomsSet(X, 20, pickedX);
    F.add(onepickedSet);
    unpickedX = getSetDifference(unpickedX, onepickedSet);

    console.log(F, unpickedX);
    
    let count = 0;

    while (unpickedX.size > 20 && count < 20) {
        console.log(unpickedX.size)
        const randomSize = Math.ceil(Math.random() * 20);
        const onepicked_1 = getRandomsSet(unpickedX, randomSize);  // 从没有选过的选
        const onepicked_2 = getRandomsSet(pickedX, 20 - randomSize); // 从选过里的选
        pickedX = new Set([...pickedX, ...onepicked_1]);
        unpickedX = getSetDifference(unpickedX, onepicked_1);
        F.add(new Set([...onepicked_1, ...onepicked_2]));
        count ++;
    }

    console.log(F);

    // F.add(unpickedX);

    // while (F.size < size) {
    //     const randSize = Math.ceil(Math.random() * 20);
    //     F.add(generateRandomSet(randSize, maxInteger))
    // }

    // return X, F;
}

// 从sourceSet中随机抽取，生成randomSize大小的子集
function getRandomsSet(sourceSet, randomSize) {
    const len = sourceSet.size;
    const randoms = new Set();
    const sourceArr = [...sourceSet]

    while (randoms.size < randomSize) {
        const randomInd = Math.floor(Math.random() * len);
        randoms.add(sourceArr[randomInd]);
    }

    console.log(randoms);
    
    return randoms;
}

function getSetDifference(set1, set2) {  // set1 - set2
    return difference([...set1], [...set2], false)
}

function generateRandomSet(size, maxInteger) {
    const randomSet = new Set();

    while (randomSet.size < size) {
        randomSet.add(Math.ceil(Math.random() * maxInteger))
    }

    return randomSet;
}