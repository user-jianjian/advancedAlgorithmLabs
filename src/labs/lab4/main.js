import { generateData } from "./generateData";
import { quickSort } from "./quickSort";
import { improvedQuickSort } from "./improvedQuickSort";

const data = generateData(10, 20);
improvedQuickSort(data);
console.log(data);
