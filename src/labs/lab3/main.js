import { generateData } from './helper'
import { greedySetCover } from './greedy'
import { setCoverRounding } from './linearProgramming'

const [X, F] = generateData(100, 1000);
// console.log(greedySetCover(X, F));

setCoverRounding(X, F);