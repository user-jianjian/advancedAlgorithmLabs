<template>
  <div>
    <div id="buttons">
      <el-button type="text" @click="getBruteLine"
        >点击生成暴力算法性能图</el-button
      >
      <el-button type="text" @click="getScanDivideLine"
        >点击生成扫描和分治算法性能图</el-button
      >
    </div>

    <div id="bruteline"></div>
    <div id="scandivideline"></div>
  </div>
</template>

<script>
import { generatePointsSet } from "../labs/lab1/generatePointsSet";
import { bruteForce } from "../labs/lab1/bruteForce";
import { grahamScan } from "../labs/lab1/grahamScan";
import { divideConquer } from "../labs/lab1/divideConquer";

import { Line } from "@antv/g2plot";

export default {
  data() {
    return {};
  },

  methods: {
    getBrutePerformance(scales, times) {
      const brutePerformanceData = [];
      for (let scale of scales) {
        const runTime = this.averageRunTime(bruteForce, scale, times);
        brutePerformanceData.push({
          size: scale,
          time: runTime,
        });
      }
      return brutePerformanceData;
    },

    getScanDividePerformance(scales, times) {
      const performanceData = [];
      for (let scale of scales) {
        const grahamRunTime = this.averageRunTime(grahamScan, scale, times);
        console.log(grahamRunTime);
        performanceData.push({
          size: scale,
          time: grahamRunTime,
          category: "grahamScan",
        });
        const divideRuntime = this.averageRunTime(divideConquer, scale, times);
        performanceData.push({
          size: scale,
          time: divideRuntime,
          category: "divideConquer",
        });
      }
      return performanceData;
    },

    averageRunTime(algorithm, scale, times) {
      const points = generatePointsSet(0, 500, 0, 500, scale);
      let totaltime = 0;

      for (let i = 0; i < times; i++) {
        const start = performance.now();
        const convexHull = algorithm(points);
        const end = performance.now();
        totaltime += Math.floor(end - start);
      }

      return totaltime / times;
    },

    getBruteLine() {
      const AVERAGE_TIMES = 1;
      const scales = [10, 30, 50, 100, 150, 200];
      this.brutePerformanceData = this.getBrutePerformance(
        scales,
        AVERAGE_TIMES
      );
      const line = new Line("bruteline", {
        data: this.brutePerformanceData,
        xField: "size",
        yField: "time",
        width: 500,
        height: 300,
        autoFit: false,
        padding: "auto",
      });

      line.render();
    },

    getScanDivideLine() {
      const AVERAGE_TIMES = 10;
      const scales = [1000, 2000, 3000, 10000, 20000, 30000];
      this.scanDivideData = this.getScanDividePerformance(
        scales,
        AVERAGE_TIMES
      );

      const line = new Line("scandivideline", {
        data: this.scanDivideData,
        xField: "size",
        yField: "time",
        seriesField: "category",
      });

      line.render();
    },
  },
};
</script>

<style>
#bruteline {
  width: 600px;
  height: 400px;
  margin: 0 auto;
  margin-top: 20px;
}

#scandivideline {
  width: 600px;
  height: 400px;
  margin: 0 auto;
  margin-top: 20px;
}

#buttons {
  margin: 0 auto;
  margin-top: 10px;
}
</style>