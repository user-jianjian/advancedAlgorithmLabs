
export function bruteForce(pointsSet) {

    const pointsNum = pointsSet.length;
    const deletePoints = new Set();

    for (let i = 0; i < pointsNum; i++) {
        for (let j = i + 1; j < pointsNum; j++) {
            for (let k = j + 1; k < pointsNum; k++) {
                for (let m = k + 1; m < pointsNum; m++) {
                    if (deletePoints.has(pointsSet[i][0] + ',' + pointsSet[i][1])) {
                        continue;
                    }
                    if (deletePoints.has(pointsSet[j][0] + ',' + pointsSet[j][1])) {
                        continue;
                    }
                    if (deletePoints.has(pointsSet[k][0] + ',' + pointsSet[k][1])) {
                        continue;
                    }
                    if (deletePoints.has(pointsSet[m][0] + ',' + pointsSet[m][1])) {
                        continue;
                    }

                    let p1 = pointsSet[i];
                    let p2 = pointsSet[j];
                    let p3 = pointsSet[k];
                    let p4 = pointsSet[m];

                    if (isInTriangle(p1, p2, p3, p4)) {
                        deletePoints.add(p1[0] + ',' + p1[1]);
                    } else if (isInTriangle(p2, p1, p3, p4)) {
                        deletePoints.add(p2[0] + ',' + p2[1]);
                    } else if (isInTriangle(p3, p1, p2, p4)) {
                        deletePoints.add(p3[0] + ',' + p3[1]);
                    } else if (isInTriangle(p4, p1, p2, p3)) {
                        deletePoints.add(p4[0] + ',' + p4[1]);
                    }

                }
            }
        }
    }


    const convexHullSets = pointsSet.filter(p => !deletePoints.has(p[0] + ',' + p[1]))
        .map((p) => [p[0], p[1]]);  // 凸包点的集合

    const convexHullSetsInOrder = getAnticlockwiseOutput(convexHullSets);

    return convexHullSetsInOrder;
}

function isInTriangle(p, p1, p2, p3) {  // p是否在p1,p2,p3构成的三角形内
    return isAtSameSide(p1, p2, p, p3) && isAtSameSide(p1, p3, p, p2) && isAtSameSide(p2, p3, p, p1);
}

function isAtSameSide(lineStart, lineEnd, p1, p2) {
    const [xCoefficient, yCoefficient, constant] = getLineExpression(lineStart, lineEnd);
    return ((p1[0] * xCoefficient + p1[1] * yCoefficient + constant) * 
        (p2[0] * xCoefficient + p2[1] * yCoefficient + constant)) >= 0;
}

function getLineExpression(p1, p2) {
    let x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];

    const xCoefficient = y1 - y2;
    const yCoefficient = x2 - x1;
    const constant = y1 * (x1 - x2) + x1 * (y2 - y1);

    return [xCoefficient, yCoefficient, constant];
}

function getExpressionVal(lineStart, lineEnd, point) {
    // x2 > x1, 所以说在直线上方的值是大于0的
    const [xCoefficient, yCoefficient, constant] = getLineExpression(lineStart, lineEnd);
    return xCoefficient * point[0] + yCoefficient * point[1] + constant;
}

function getAnticlockwiseOutput(points) {
    const [leftmostP, rightmostP] = getLeftmostAndRightmost(points);

    const upPoints = points.filter((point) => {
        return getExpressionVal(leftmostP, rightmostP, point) > 0;
    })
    upPoints.sort((p1, p2) => {
        return p2[0] - p1[0];
    })

    const downPoints = points.filter((point) => {
        return getExpressionVal(leftmostP, rightmostP, point) < 0;
    })
    downPoints.sort((p1, p2) => {
        return p1[0] - p2[0];
    })

    return [leftmostP, ...downPoints, rightmostP, ...upPoints];
}

function getLeftmostAndRightmost(points) {
    let min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY;

    let leftmost = [], rightmost = [];
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (point[0] < min) {
            leftmost = [point[0], point[1]];
            min = point[0];
        }
        if (point[0] > max) {
            rightmost = [point[0], point[1]];
            max = point[0];
        }
    }

    return [leftmost, rightmost];
}