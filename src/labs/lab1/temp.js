import { grahamScanCore } from "./grahamScan";

export function divideConquer(points) {
    
    /**
     * 1:
     * 预处理阶段
     * 
     * 
     */
    const len = points.length;
    if (len <= 2) {
        return points;  // 两点之间不考虑顺时针还是逆时针，无论在左还是在右边，后面都有处理
    }
    if (len === 3) {
        const antiPoints = getThreePointsInAnticlockwise(...points);  // 之前验证过了，应该就是逆时针方向
        return antiPoints;
    }

    /**
     * 2: 
     * divide阶段
     * 获取中位数，将点集合划分成左右点集两个部分
     * =》 应该也没啥问题
     * 
     */
    const median = getMedian(points);


    const PL = points.filter((p) => {
        return p[0] <= median;
    })

    const PR = points.filter((p) => {
        return p[0] > median;
    })

    /**
     * 3:
     * conquer阶段
     *               10
     *          5           5
     *      3       2    3      2
     */
    const QL = divideConquer(PL);
    const QR = divideConquer(PR);

    /**
     * 4:
     * 寻找左边点集的中间点（重心）、左边点集最低的点、右边点集角度最小的点和角度最大的点
     * 问题1： 合并成5个之后，还能够保证顺序嘛
     * 
     */
    const centerP = findMiddlePoint(QL);
    const leftLowPIndex = findLowestPointInd(QL);
    const leftLowP = QL[leftLowPIndex]
    const [rightMinAngleInd, rightMaxAngleInd] = findMinMaxAngleIndex(centerP, leftLowP, QR);

    const QL_1 = [], QR_1 = [], QR_2 = [];

    // 对左边的点计算其角度
    let count = 0, i = leftLowPIndex, QL_len = QL.length;
    while (count < QL_len) {
        QL_1.push([QL[i % QL_len], computeAngle(centerP, leftLowP, QL[i % QL_len])])
        i ++;
        count ++;
    }

    count = 0;
    let s = rightMinAngleInd, t = rightMaxAngleInd;
    let QR_1_len = t >= s ? t - s + 1 : QR.length - s  + t  + 1;
    let QR_2_len = QR.length - QR_1_len;

    // 对右边的点计算角度

    for (let i = 0; i < QR_1_len; i ++) {
        QR_1.push([QR[(s + i) % QR.length], computeAngle(centerP, leftLowP, QR[(s + i) % QR.length])]);
    }

    for (let i = 1; i <= QR_2_len; i ++) {
        QR_2.push([QR[(t + i) % QR.length], computeAngle(centerP, leftLowP, QR[(t + i) % QR.length])]);
    }

    function merge(L1, L2) {

        const res = [];
        
        let p1 = 0, p2 = 0;

        while (p1 < L1.length || p2 < L2.length) {

            if (p1 === L1.length) {
                res.push(L2[p2]);
                p2 ++;
                continue;
            }

            if (p2 === L2.length) {
                res.push(L1[p1]);
                p1 ++;
                continue;
            }

            if (L1[p1][1] <= L2[p2][1]) {
                res.push(L1[p1]);
                p1 ++;
            } else {
                res.push(L2[p2]);
                p2 ++;
            }
        }

        return res;
    }

    // merge
    const mergedList = merge(QL_1, merge(QR_1, QR_2));
    const removedAngleMergedList = [];

    mergedList.forEach((item, ind) => {
        removedAngleMergedList[ind] = item[0];
    })

    removedAngleMergedList.unshift(centerP);
    const res = grahamScanCore(removedAngleMergedList);
    res.shift();

    return res;
}



function findMiddlePoint(points) {
    let xsum = 0, ysum = 0;

    points.forEach((p) => {
        xsum += p[0];
        ysum += p[1];
    })

    return [xsum / points.length, ysum / points.length]
}

function findMinMaxAngleIndex(centerP, leftLowP, points) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let minIndex = -1, maxIndex = -1;

    for (let i = 0; i < points.length; i ++) {
        const curAngle = computeAngle(centerP, leftLowP, points[i]);
        // 1：
        if (curAngle < min) {
            min = curAngle;
            minIndex = i;
        }
        if (curAngle > max) {
            max = curAngle;
            maxIndex = i;
        }
    }

    return [minIndex, maxIndex];
}

function findLowestPointInd(points) {
    let index = -1;
    let lowPos = Number.POSITIVE_INFINITY;  // 初始值取较大的值

    for (let i = 0; i < points.length; i ++) {
        if (points[i][1] < lowPos) {
            lowPos =  points[i][1];
            index = i;
        }
    }

    return index;
}

function computeAngle(centerP, leftLowP, targetP) {
    const vector_1 = [leftLowP[0] - centerP[0], leftLowP[1] - centerP[1]];
    const vector_2 = [targetP[0] - centerP[0], targetP[1] - centerP[1]];
    const innerProduct = (vector_1[0] * vector_2[0] + vector_1[1] * vector_2[1]);
    const vModuel_1 = Math.sqrt(Math.pow(vector_1[0], 2) + Math.pow(vector_1[1], 2));
    const vModuel_2 = Math.sqrt(Math.pow(vector_2[0], 2) + Math.pow(vector_2[1], 2));
    let cosVal =  innerProduct / (vModuel_1 * vModuel_2);
    cosVal = cosVal < - 1 ? -1 : cosVal;
    cosVal = cosVal > 1 ? 1 : cosVal;
    const angle = Math.acos(cosVal);

    if (isAnticlockwise(vector_1, vector_2)) {
        return angle;
    } else {
        return 2 * Math.PI - angle;
    }
}

// function getAnticlockwise(points) {
//     // 根据向量叉积来按照逆时针排序点集合

//     const mid = findMiddlePoint(points);
//     points.sort((p1, p2) => {

//         return -1 * ((p1[0] - mid[0]) * (p2[1] - mid[1]) - (p1[1] - mid[1]) * (p2[0] - mid[0]));
//     })
// }

function getThreePointsInAnticlockwise(a, b, p) {

    const val = (p[1]-a[1])*(b[0]-a[0])-(b[1]-a[1])*(p[0]-a[0]);

    if (val > 0) {
        return [a, b, p];
    } else {
        return [p, b, a];
    }
}   

function isAnticlockwise(p1, p2) {  // p1=>p2是不是逆时针排序
    return (p1[0] * p2[1] - p1[1] * p2[0]) >= 0;
}

function getMedian(points) {
    const xArr = [];
    const len = points.length;
    points.forEach((p) => {
        xArr.push(p[0]);
    })

    if (len % 2 === 1) {
        return findKthLargest(xArr, len - Math.floor(len / 2));
    } else {
        return (findKthLargest(xArr, len / 2) + findKthLargest(xArr, (len / 2) + 1)) / 2;
    }
}


function partition(arr, startIndex, endIndex) {

    const randIndex = Math.ceil(startIndex + Math.random() * (endIndex - startIndex));
    let pivot = arr[randIndex];
    [arr[randIndex], arr[startIndex]] = [arr[startIndex], arr[randIndex]]

    let mark = startIndex;
    for (let i = startIndex + 1; i <= endIndex; i++) {
        if (arr[i] < pivot) {
            mark++;
            [arr[mark], arr[i]] = [arr[i], arr[mark]];
        }
    }
    arr[startIndex] = arr[mark];
    arr[mark] = pivot;
    return mark;
}

function findKthLargest (nums, k) {
    let targetIndex = nums.length - k;
    let start = 0,
        end = nums.length - 1;
    let index = partition(nums, start, end);
    while (index != targetIndex) {
        if (index > targetIndex) {
            end = index - 1;
        } else {
            start = index + 1;
        }
        index = partition(nums, start, end);
    }
    return nums[index];
};