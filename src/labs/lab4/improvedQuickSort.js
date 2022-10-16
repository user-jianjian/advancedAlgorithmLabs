export function improvedQuickSort(A) {
    sort(A, 0, A.length - 1);
}

function sort(A, p, q) {
    if (p >= q) {
        return;
    }

    const [r1, l2] = Rand_Partition(A, p, q)
    sort(A, p, r1);
    sort(A, l2, q);
}

function Rand_Partition(A, p, q) {

    const rand_ind = p + Math.floor(Math.random() * (q - p + 1));
    [A[rand_ind], A[q]] = [A[q], A[rand_ind]];

    let l = p, i = p, g = q;
    const x = A[q];

    while (i <= g) {
        if (A[i] < x) {  // [p, l) < x
            [A[i], A[l]] = [A[l], A[i]];
            l ++;
            i ++;
        } else if (A[i] > x) {  // (g, q] > x
            [A[i], A[g]] = [A[g], A[i]];
            g --;
        } else if (A[i] === x) {  // [l, i) = x
            i ++;
        }
    }

    return [l - 1, g + 1];
}