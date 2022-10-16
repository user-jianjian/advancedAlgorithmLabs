export function greedySetCover(X, F) {
    const U = [...X];  // 尚未被覆盖的元素集
    let C = [];  // 满足条件的子集集合C

    while (U.length !== 0) {

        // console.log(U.length);

        let S = [], maxCover = 0;

        for (let k = 0; k < F.length; k ++) {
            const subSet = F[k];
            let curCover = 0;

            let i = 0, j = 0;

            while (i < U.length && j < subSet.length) {
                if (U[i] === subSet[j]) {
                    curCover ++;
                    i ++;
                    j ++;
                } else if (U[i] < subSet[j]) {
                    i ++;
                } else {
                    j ++;
                }
            }

            if (curCover > maxCover) {
                maxCover = curCover;
                S = subSet;
            }
        }

        diff(U, S);
        C.push(S);
    }

    return C;
}

function diff(A, B) {  // 求A - B，其中A和B均是有序的

    // console.log(A, B);

    let i = 0, j = 0;

    while (i < A.length && j < B.length) {
        if (A[i] === B[j]) {
            A.splice(i, 1);
            // console.log(A)
        } else if (A[i] < B[j]) {
            i ++;
        } else {
            j ++;
        }
    }

    // console.log(A);
}

function union(A, B) {
    const u = [];

    let i = 0, j = 0;

    while (i < A.length && j < B.length) {
        if (A[i] <= B[i]) {
            u.push(A[i]);
            i ++;
        } else {
            u.push(B[i]);
            j ++;
        }
    }

    if (i < A.length) {
        u.push(...A.slice(i));
    }

    if (j < B.length) {
        u.push(...B.slice(j));
    }

    return u;
}