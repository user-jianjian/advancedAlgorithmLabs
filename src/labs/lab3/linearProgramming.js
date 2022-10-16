export function setCoverRounding(X, F) {
    const m = X.length;
    const n = F.length;
    const C = [];

    const A = new Array(m).fill(0).map(() => new Array(n).fill(0));  // 系数阵

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            if (F[j].indexOf(X[i]) !== -1) {
                A[i][j] = 1;
            }
        }
    }

    let solver = require("javascript-lp-solver/src/solver"),
        results,
        model = {
            "optimize": "cost",
            "opType": "min",
            "constraints": {},
            "variables": {}
        };
    
    for (let j = 0; j < n; j ++) {
        model["variables"]["F" + j] = {
            "cost": 1,
            ["own" + j]: 1,
        };
        for (let i = 0; i < m; i ++) {
            if (A[i][j] === 1) {
                model["variables"]["F" + j]["X" + i] = 1;
            }
        }
    }

    for (let i = 0; i < m; i ++) {
        model["constraints"]["X" + i] = {
            "min": 1
        }
    }

    for (let j = 0; j < n; j ++) {
        model["constraints"]["own" + j] = {
            "min": 0,
        }
    }

    for (let j = 0; j < n; j ++) {
        model["constraints"]["own" + j] = {
            "max": 1,
        }
    }

    let f = 0;

    for (let i = 0; i < m; i ++) {
        let count = 0;
        for (let j = 0; j < n; j ++) {
            count += A[i][j];
        }
        f = Math.max(f, count);
    }

    for (let j = 0; j < n; j ++) {
        if (results["F" + j] === undefined) {
            continue;
        }
        if (results["F" + j] > 1 / f) {
            C.push(F[j]);
        }
    }

    return C;
}