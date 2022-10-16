import { generatePointsSet } from "./generatePointsSet"
import { bruteForce} from "./bruteForce"
import { grahamScan } from "./grahamScan";
import { divideConquer } from "./divideConquer" 
export let points = generatePointsSet(0, 100, 0, 100, 50);

const copyedPoints = copy2ndArray(points);
// export const convexHull = divideConquer(copyedPoints, 0);
export const convexHull = bruteForce(copyedPoints, 0);



function copy2ndArray(sourceArray) {
    const m = sourceArray.length;
    const n = sourceArray[0].length;

    const targetArray = new Array(m).fill(0).map(() => new Array(n));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            targetArray[i][j] = sourceArray[i][j];
        }
    }

    return targetArray;
}