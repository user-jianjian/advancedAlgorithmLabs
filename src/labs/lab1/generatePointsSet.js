

/**
 * 
 * @param {*} xstart 
 * @param {*} xend 
 * @param {*} ystart 
 * @param {*} yend 
 * @param {*} number 
 * @returns 点的集合（二维数组的形式）
 */
export function generatePointsSet(xstart, xend, ystart, yend, number) {
    // 如何避免产生相同位置的点呢？
    const pointsSet = [];
    const set = new Set();

    for (let i = 0; i < number; i ++) {
        let randx = getRandomNumFrominterval(xstart, xend);
        let randy = getRandomNumFrominterval(ystart, yend);

        // 避免产生重复的点
        while (set.has(randx + ',' + randy)) {
            randx = getRandomNumFrominterval(xstart, xend);
            randy = getRandomNumFrominterval(ystart, yend);
        }

        set.add(randx + ',' + randy);

        pointsSet.push([randx, randy])
    }

    return pointsSet;
}

/**
 * 
 * @param {*} left
 * @param {*} right 
 * @returns (left, right)之间的随机数
 */
function getRandomNumFrominterval(left,right){  
    const range = right - left;
    let rand = Math.random();
    while (rand === 0) {
        rand = Math.random();
    }
    const num = left + rand * range; //四舍五入
    return num;
}