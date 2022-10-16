export function quickSort(A) {
    boundaryQuickSort(A, 0, A.length - 1);
}

function boundaryQuickSort(A, p, r) {
    if (p >= r) {
        return;
    }

    let q = Rand_Partition(A, p, r);
    boundaryQuickSort(A, p, q - 1);
    boundaryQuickSort(A, q + 1, r);
}

function Rand_Partition(A, p, r) {
    const rand_ind = p + Math.floor(Math.random() * (r - p + 1));

    [A[rand_ind], A[r]] = [A[r], A[rand_ind]];
    
    let x = A[r];

    let i = p - 1;

    for (let j = p; j < r; j ++) {
        if (A[j] <= x) {
            i ++;
            [A[i], A[j]] = [A[j], A[i]];
        }
    }

    [A[i + 1], A[r]] = [A[r], A[i + 1]];

    return i + 1;
}