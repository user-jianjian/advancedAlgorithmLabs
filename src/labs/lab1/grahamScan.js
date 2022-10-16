import { point } from "@antv/g2plot";

export function grahamScan(points) {

    // 寻找纵轴最大的点，若有多个点，就在其中寻找横轴最大的点
    const [oriPoint, oriInd] = findOriPoint(points);

    // 从点集中挖去作为原点的点
    points.splice(oriInd, 1);

    // 给points的点排序
    points.sort((p1, p2) => {
        const cos1 = cos(p1, oriPoint);
        const cos2 = cos(p2, oriPoint);

        if (cos1 > cos2) {  // cos值大（夹角小）的排在前面
            return -1;
        } else if (cos1 === cos2) {  // cos值相同的情况下，距离近的排在前面
            const dis1 = getDistance(p1, oriPoint);
            const dis2 = getDistance(p2, oriPoint);
            return dis1 - dis2;
        } else {
            return 1;
        }
    })

    // 删除points中夹角相同的点（相同夹角的点只保留最远的点）
    let i = 0;
    while (i + 1 < points.length) {
        const cos1 = cos(points[i], oriPoint);
        const cos2 = cos(points[i + 1], oriPoint);
        if (cos1 === cos2) {
            points.splice(i, 1);
        }
        i++;
    }

    points.unshift(oriPoint);  // 将原点添加进去

    return grahamScanCore(points);
}

export function grahamScanCore(points) {
    // 栈初始为
    const stack = [points[0], points[1], points[2]];

    for (let i = 3; i < points.length; i++) {
        let next = i, cur = stack.length - 1, prev = stack.length - 2;
        while (prev > 0 && isInTriangle(stack[cur], stack[0], stack[prev], points[next])) {
            stack.pop();
            cur = stack.length - 1;
            prev = stack.length - 2;
        }
        stack.push(points[i]);
    }
    
    return stack;
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function cos(p1, p2) {
    const distance = getDistance(p1, p2);
    const xgap = p1[0] - p2[0];
    return xgap / distance;
}

function findOriPoint(points) {
    let target = [-1, Number.POSITIVE_INFINITY];  // 初始化都是最小的
    let ind = -1;

    for (let i = 0; i < points.length; i++) {
        let point = points[i];

        if (point[1] < target[1]) {
            target = point;
            ind = i;
        } else if (point[1] === target[1]) {
            if (point[0] > target[0]) {
                target = point;
                ind = i;
            }
        }
    }

    return [target, ind];
}

function isInTriangle(p, p1, p2, p3) {  // p是否在p1,p2,p3构成的三角形内
    return isAtSameSide(p1, p2, p, p3) && isAtSameSide(p1, p3, p, p2) && isAtSameSide(p2, p3, p, p1);
}

function isAtSameSide(lineStart, lineEnd, p1, p2) {
    const [xCoefficient, yCoefficient, constant] = getLineExpression(lineStart, lineEnd);
    return ((p1[0] * xCoefficient + p1[1] * yCoefficient + constant) * (p2[0] * xCoefficient + p2[1] * yCoefficient + constant)) >= 0;
}

function getLineExpression(p1, p2) {
    let x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];

    const xCoefficient = y1 - y2;
    const yCoefficient = x2 - x1;
    const constant = y1 * (x1 - x2) + x1 * (y2 - y1);

    return [xCoefficient, yCoefficient, constant];
}