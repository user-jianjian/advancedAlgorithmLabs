export function generateData(size, maxInt) {
    const data = [];
    for (let i = 0; i < size; i ++) {
        data.push(Math.ceil(Math.random() * maxInt))
    }
    return data;
}

export function generateProportionData(size, proportion, maxInt) {
    const data = [];
    const repeatedNum = Math.ceil(Math.random() * maxInt);
    for (let i = 0; i < size ; i ++) {
        data.push(Math.ceil(Math.random() * maxInt));
    }
    for (let i = 0; i < Math.floor(size * proportion); i ++) {
        const randInd = Math.floor(Math.random() * size);
        data[randInd] = repeatedNum;
    }

    return data;
}