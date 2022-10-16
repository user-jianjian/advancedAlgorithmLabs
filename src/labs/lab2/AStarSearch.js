import { MinHeap, Point, Node, BiNode } from './dataStructure'

export function getPathInAstar(mapFun) {
    const [map, sourceP, targetP] = mapFun();

    const minHeap = new MinHeap();
    const pointsMap = new Map();  // key: 点坐标  value: F值； 为了剪枝
    pointsMap.set(sourceP.x + ',' + sourceP.y, 0);
    let targetNode = null;
    let curSolutionF = Number.POSITIVE_INFINITY;  // 为了剪枝
    minHeap.add(new Node(null, sourceP, map[sourceP.x][sourceP.y], targetP));

    while (!minHeap.isEmpty()) {
        const popedNode = minHeap.popMin();
        // console.log(popedNode);
        if (popedNode.x === targetP.x && popedNode.y === targetP.y) {
            targetNode = popedNode;
            break;
        }
        const popedNodePoint = popedNode.point;
        const surroundedPoints = findSurroundedPoints(popedNodePoint, map, pointsMap, 
            curSolutionF, targetP, popedNode);
        surroundedPoints.forEach((point, ind) => {
            const node = new Node(popedNode, point, map[point.x][point.y], targetP);
            if (point.x === targetP.x && point.y === targetP.y) {
                curSolutionF = Math.min(curSolutionF, node.F);
            }
            pointsMap.set(point.x + ',' + point.y, node.F);
            minHeap.add(node);
        })
    }

    const paths = getPathFromNode(targetNode);

    return paths;
}

function getPathFromNode(node) {
    let p = node;
    const paths = [];

    while (p) {
        paths.unshift([p.x, p.y]);
        p = p.parent;
    }

    return paths;
}

function findSurroundedPoints(point, map, pointsMap, curSolutionF, targetP, parent) {
    const x = point.x;
    const y = point.y;
    const x_top = x - 1 >= 0 ? x - 1 : x;
    const x_bottom = x + 1 < map.length ? x + 1 : x;
    const y_left = y - 1 >= 0 ? y - 1 : y;
    const y_right = y + 1 < map[0].length ? y + 1 : y;
    const surroundedPoints = [];

    for (let i = x_top; i <= x_bottom; i ++) {
        for (let j = y_left; j <= y_right; j ++) {
            if (map[i][j] !== -1) {
                const curnode = new Node(parent, new Point(i, j), map[i][j], targetP);
                const curF = curnode.F;

                if (!(pointsMap.has(i + ',' + j) && pointsMap.get(i + ',' + j) <= curF) &&
                    curF < curSolutionF
                ) {
                    surroundedPoints.push(new Point(i, j));
                }
                
            }
        }
    }

    return surroundedPoints;
}

// getPathInAstar(getMap1);

export function getPathInBiAstar(mapFun) {
    const [map, sourceP, targetP] = mapFun();
    const forwardMinHeap = new MinHeap();
    const backwardMinHeap = new MinHeap();
    const forwardOpenMap = new Map();
    const forwardClosedMap = new Map();
    const backwardOpenMap = new Map();
    const backwardClosedMap = new Map();

    // 初始化
    const sourceNode = new BiNode(null, sourceP, map, sourceP, targetP, false);
    const targetNode = new BiNode(null, targetP, map, sourceP, targetP, true);
    forwardMinHeap.add(sourceNode);
    backwardMinHeap.add(targetNode);
    forwardOpenMap.set(sourceP.x + ',' + sourceP.y, sourceNode);
    backwardOpenMap.set(targetP.x + ',' + targetP.y, targetNode);


    while (!forwardMinHeap.isEmpty() || !backwardMinHeap.isEmpty()) {

        // 为空的情况后续处理

        const forwardPopedNode = forwardMinHeap.popMin();

        const surroundedNodes = biFindSurroundedNodes(forwardPopedNode, 
            map, forwardOpenMap, sourceP, targetP, false);
        
        surroundedNodes.forEach(node => {
            addOrUpdateMap(forwardOpenMap, node.x + ',' + node.y, node);
            forwardMinHeap.add(node);
        })

        addOrUpdateMap(forwardClosedMap, forwardPopedNode.x + ',' + forwardPopedNode.y, forwardPopedNode);

        // 说明前向和后向搜索有碰到一起
        if (backwardClosedMap.has(forwardPopedNode.x + ',' + forwardPopedNode.y)) {
            return getPathFromBiNode(forwardClosedMap, backwardClosedMap, forwardOpenMap, backwardOpenMap);
        }

        const backwardPopedNode = backwardMinHeap.popMin();

        const backwardSurroundedNodes = biFindSurroundedNodes(backwardPopedNode, 
            map, backwardOpenMap, sourceP, targetP, true);
        
        backwardSurroundedNodes.forEach(node => {
            addOrUpdateMap(backwardOpenMap, node.x + ',' + node.y, node);
            backwardMinHeap.add(node);
        })

        addOrUpdateMap(backwardClosedMap, backwardPopedNode.x + ',' + backwardPopedNode.y, backwardPopedNode);

        // 说明前向和后向搜索有碰到一起
        if (forwardClosedMap.has(backwardPopedNode.x + ',' + backwardPopedNode.y)) {
            return getPathFromBiNode(forwardClosedMap, backwardClosedMap, forwardOpenMap, backwardOpenMap);
        }

    } 

    console.log("没找到对应路径")

}

function biFindSurroundedNodes(popedNode, map, pointsMap, sourceP, targetP, reverse) {
    const point = popedNode.point;
    const x = point.x;
    const y = point.y;
    const x_top = x - 1 >= 0 ? x - 1 : x;
    const x_bottom = x + 1 < map.length ? x + 1 : x;
    const y_left = y - 1 >= 0 ? y - 1 : y;
    const y_right = y + 1 < map[0].length ? y + 1 : y;
    const surroundedNodes = [];

    for (let i = x_top; i <= x_bottom; i ++) {
        for (let j = y_left; j <= y_right; j ++) {
            if (map[i][j] !== -1) {
                const curnode = new BiNode(popedNode, new Point(i, j), map, sourceP, targetP, reverse);
                const curF = curnode.F;

                if (!(pointsMap.has(i + ',' + j) && pointsMap.get(i + ',' + j).F <= curF)) {
                    surroundedNodes.push(curnode);
                }
                
            }
        }
    }

    return surroundedNodes;
}

function addOrUpdateMap(map, key, node) {

    // if (key === '7,6') {
    //     // console.log(node);
    // }
    if (!map.has(key)) {
        map.set(key, node);
    } else {
        if (node.F < map.get(key).F) {
            map.set(key, node);
        }
    }
}

function getPathFromBiNode(forwardClosedMap, backwardClosedMap, forwardOpenMap, backwardOpenMap) {
    
    let bestForwardNode = null, bestBackwardNode = null, bestCost = Number.POSITIVE_INFINITY;
    const path = [], forwardPath = [], backwardPath = [];

    const pointCors = [...forwardClosedMap.keys(), ...backwardClosedMap.keys()];
    const pointCorsSet = new Set(pointCors);

    for (let pointCor of pointCorsSet) {
        if (forwardOpenMap.has(pointCor) && backwardOpenMap.has(pointCor)) {
            const curCost = forwardOpenMap.get(pointCor).G + backwardOpenMap.get(pointCor).G;
            if (curCost < bestCost) {
                bestCost = curCost;
                bestForwardNode = forwardOpenMap.get(pointCor);
                bestBackwardNode = backwardOpenMap.get(pointCor);
            }
        }
    }

    let f = bestForwardNode, b = bestBackwardNode;

    while (f) {
        path.unshift([f.x, f.y]);
        forwardPath.unshift([f.x, f.y]);
        f = f.parent;
    }

    b = b.parent;

    while (b) {
        path.push([b.x, b.y]);
        backwardPath.push([b.x, b.y]);
        b = b.parent;
    }

    // console.log(path);

    return [path,forwardPath, backwardPath];
}