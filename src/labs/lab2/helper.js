import { Point } from './dataStructure'
export function getMap1() {
    const map = new Array(14).fill(0).map(() => new Array(17).fill(0));  // 0表示普通地形

    map[5][6] = map[6][6] = map[7][7] = map[8][7] = map[9][7] = map[9][8] = map[10][8] = map[11][8] = -1;

    return [map, new Point(8, 3), new Point(9, 14)];
}

export function isNodeEqual(node1, node2) {
    return node1.F = node2.F;
}

export function getMap2() {
    const map = new Array(20).fill(0).map(() => new Array(40).fill(0));  // 0表示普通地形
    map[0][3] = -1
    map[2][0] = map[2][1] = map[2][2] = map[2][3] = map[2][4] = map[2][5] = -1
    map[0][7] = map[1][7] = map[2][7] = map[2][8] = map[2][9] = map[2][10] = map[3][8] = -1
    map[0][12] = map[1][12] = map[2][12] = map[3][12] = map[4][12] = map[5][12] = map[6][12] = map[7][12] = -1
    map[5][8] = map[5][7] = map[6][7] = map[7][7] = map[6][6] = map[6][5] = map[6][4] = map[6][3] = map[6][2] = -1
    map[7][5] = map[8][5] = map[9][5] = map[10][5] = map[11][5] = -1
    map[11][4] = map[11][3] = map[11][2] = map[10][2] = map[12][3] = map[13][3] = map[14][3] = map[15][3] = map[16][
        3] = -1
    map[15][4] = map[15][5] = map[15][6] = map[15][7] = map[15][8] = map[14][8] = map[13][8] = map[13][9] = map[12][8] =
        map[11][8] = map[10][8] = map[10][7] = map[9][7] = -1
    map[13][11] = map[12][12] = map[13][12] = map[14][12] = map[15][12] = map[16][12] = map[17][12] = map[18][12] =
        map[19][12] = -1
    map[18][3] = map[19][3] = map[17][7] = map[18][7] = map[19][7] = map[15][24] = map[15][25] = map[16][24] = map[16][
        25] = -1
    map[10][19] = map[11][19] = map[12][19] = map[10][20] = map[11][20] = map[12][20] = map[10][21] = map[11][21] =
        map[12][21] = -1
    map[10][28] = map[11][31] = map[13][31] = map[7][36] = map[9][36] = -1

    // desert 4

    for (let i = 24; i < 40; i++) {
        map[0][i] = 4;
    }
    for (let i = 25; i < 40; i++) {
        map[1][i] = 4;
    }
    for (let i = 26; i < 40; i++) {
        map[2][i] = 4;
    }
    for (let i = 26; i < 37; i++) {
        map[3][i] = 4;
    }
    for (let i = 26; i < 36; i++) {
        map[4][i] = 4;
    }
    for (let i = 27; i < 33; i++) {
        map[5][i] = 4;
    }
    for (let i = 27; i < 33; i++) {
        map[6][i] = 4;
    }
    for (let i = 29; i < 33; i++) {
        map[7][i] = 4;
    }

    // river 2
    map[1][34] = map[2][33] = map[3][32] = map[4][33] = map[5][33] = map[5][34] = map[6][33] = map[6][34] = map[7][33] =
        map[7][34] = map[7][35] = 2
    map[8][32] = map[8][33] = map[8][34] = map[8][35] = map[9][32] = map[9][33] = map[9][34] = map[10][32] = map[10][
        33] = map[11][32] = 2
    map[10][36] = map[10][35] = map[11][35] = map[11][34] = map[12][34] = map[12][33] = map[13][34] = map[13][33] =
        map[13][32] = map[14][34] = map[14][33] = map[14][32] = 2
    map[15][33] = map[15][32] = map[15][31] = map[16][33] = map[16][32] = map[16][31] = map[17][32] = map[17][31] =
        map[17][30] = 2
    map[18][31] = map[18][30] = map[18][29] = map[19][30] = map[19][29] = map[19][28] = 2
    map[7][2] = -1;
    
    return [map, new Point(10, 4), new Point(0, 35)];
}