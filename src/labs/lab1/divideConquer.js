import { grahamScanCore } from "./grahamScan";

/**
 * 
 * @param {*} points 
 * @returns 逆时针排序的凸包集
 */
export function divideConquer(points, count) {

    const len = points.length;

    if (len <= 2) {
        return points;  // 两点之间不考虑顺时针还是逆时针，无论在左还是在右边，后面都有处理
    }
    if (len === 3) {
        const antiPoints = getThreePointsInAnticlockwise(...points);  // 之前验证过了，应该就是逆时针方向
        return antiPoints;
    }

    // 找到点集中纵轴最小的点
    const [oriPoint, oriPointInd] = findLowestPointAndIndex(points);
    points.splice(oriPointInd, 1);

    const median = getMedian(points);

    const PL = points.filter((p) => {
        return p[0] <= median;
    })

    const PR = points.filter((p) => {
        return p[0] > median;
    })

    const QL = divideConquer(PL, count + 1);
    const QR = divideConquer(PR, count + 1);


    const QL_1 = [], QL_2 = [], QR_1 = [], QR_2 = [];


    if (QL.length > 0) {
        
        // 计算QL_1和QL_2(从leftMinAngleInd逆时针到leftMaxAngleInd)
        const [leftMinInd, leftMaxInd] = findMinMaxAngleAndIndex(oriPoint, QL)
        const QL_len = QL.length;
        const QL_1_len = leftMaxInd >= leftMinInd ? leftMaxInd - leftMinInd + 1 : QL_len - leftMinInd + leftMaxInd + 1;
        const QL_2_len = QL_len - QL_1_len;

        for (let i = 0; i < QL_1_len; i++) {
            QL_1.push([QL[(leftMinInd + i) % QL_len], MinusCos(oriPoint, QL[(leftMinInd + i) % QL_len])]);
        }

        for (let i = 1; i <= QL_2_len; i++) {
            QL_2.push([QL[(leftMinInd - i + QL_len) % QL_len], MinusCos(oriPoint, QL[(leftMinInd - i + QL_len) % QL_len])]);
        }
    }

    if (QR.length > 0) {
        // 计算QR_1和QR_2
        const [rightMinInd, rightMaxInd] = findMinMaxAngleAndIndex(oriPoint, QR);
        const QR_len = QR.length;
        const QR_1_len = rightMaxInd >= rightMinInd ? rightMaxInd - rightMinInd + 1 : QR_len - rightMinInd + rightMaxInd + 1;
        const QR_2_len = QR_len - QR_1_len;

        for (let i = 0; i < QR_1_len; i++) {
            QR_1.push([QR[(rightMinInd + i) % QR_len], MinusCos(oriPoint, QR[(rightMinInd + i) % QR_len])]);
        }

        for (let i = 1; i <= QR_2_len; i++) {
            QR_2.push([QR[(rightMinInd - i + QR_len) % QR_len], MinusCos(oriPoint, QR[(rightMinInd - i + QR_len) % QR_len])]);
        }
    }

    function merge(L1, L2) {

        const res = [];

        let p1 = 0, p2 = 0;

        while (p1 < L1.length || p2 < L2.length) {

            if (p1 === L1.length) {
                res.push(L2[p2]);
                p2++;
                continue;
            }

            if (p2 === L2.length) {
                res.push(L1[p1]);
                p1++;
                continue;
            }

            if (L1[p1][1] < L2[p2][1]) {
                res.push(L1[p1]);
                p1++;
            } else if (L1[p1][1] === L2[p2][1]) {  // 如果角度相同，离原点近的排在前面
                const d1 = getDistance(oriPoint, L1[p1][0]);
                const d2 = getDistance(oriPoint, L2[p2][0]);
                if (d1 <= d2) {
                    res.push(L1[p1]);
                    p1++;
                } else {
                    res.push(L2[p2]);
                    p2++;
                }
            } else {
                res.push(L2[p2]);
                p2++;
            }
        }

        return res;
    }

    // merge
    const mergedList = merge(merge(QL_1, QL_2), merge(QR_1, QR_2));

    let i = 0;
    const removedAngleMergedList = [];

    mergedList.forEach((item, ind) => {
        removedAngleMergedList[ind] = item[0];
    })

    removedAngleMergedList.unshift(oriPoint);
    points.unshift(oriPoint);

    // 要保证removedAngleMergedList一定是按角度排好序的（角度计算应该不会出现问题，那么就是mergedList不能出问题）
    const res = grahamScanCore(removedAngleMergedList);

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

function findMinMaxAngleAndIndex(oriPoints, points) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let minIndex = -1, maxIndex = -1;

    for (let i = 0; i < points.length; i++) {
        const curAngleCos = MinusCos(oriPoints, points[i]);
        // 1：
        if (curAngleCos < min) {
            min = curAngleCos;
            minIndex = i;
        }
        if (curAngleCos > max) {
            max = curAngleCos;
            maxIndex = i;
        }
    }

    return [minIndex, maxIndex];
}

function findLowestPointInd(points) {
    let index = -1;
    let lowPos = Number.POSITIVE_INFINITY;  // 初始值取较大的值

    for (let i = 0; i < points.length; i++) {
        if (points[i][1] < lowPos) {
            lowPos = points[i][1];
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
    let cosVal = innerProduct / (vModuel_1 * vModuel_2);
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

    const val = (p[1] - a[1]) * (b[0] - a[0]) - (b[1] - a[1]) * (p[0] - a[0]);

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

function findKthLargest(nums, k) {
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

function findLowestPointAndIndex(points) {
    let target = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];  // 初始化都是最小的
    let ind = -1;

    for (let i = 0; i < points.length; i++) {
        let point = points[i];

        if (point[1] < target[1]) {
            target = point;
            ind = i;
        } else if (point[1] === target[1]) {  // 纵轴相同，找横轴最大
            if (point[0] > target[0]) {
                target = point;
                ind = i;
            }
        }
    }

    return [target, ind];
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function MinusCos(p1, p2) {  // 取-cos值，这样在[0,pi]上就和角度大小保持一致了

    const distance = getDistance(p1, p2);
    if (distance === 0) {
        return -1
    }
    const xgap = p2[0] - p1[0];
    return -1 * xgap / distance;
}
