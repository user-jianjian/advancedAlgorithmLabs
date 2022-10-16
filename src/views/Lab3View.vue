<template>
  <div>
    <div class="options">
      <el-button type="text" @click="getPerformanceGragh"
        >点击查看性能图</el-button
      >
    </div>
    <div id="performance"></div>
  </div>
</template>

<script>
// import {} from '../labs/lab3/helper'
// import {} from "../labs/lab3/main";
import { generateData } from "../labs/lab3/helper";
import { greedySetCover } from "../labs/lab3/greedy";
import { setCoverRounding } from "../labs/lab3/linearProgramming";
import { Line } from "@antv/g2plot";
const AVG_TIMES = 1;
const MULTIPLIER = 10;
export default {
  methods: {
    getPerformanceGragh() {
      // this.performanceData = this.getPerformanceData();
      this.performanceData = [
        {
          size: 10,
          time: 0,
          category: "greedy",
        },
        {
          size: 10,
          time: 1,
          category: "linearProgramming",
        },
        {
          size: 20,
          time: 0,
          category: "greedy",
        },
        {
          size: 20,
          time: 2,
          category: "linearProgramming",
        },
        {
          size: 30,
          time: 0,
          category: "greedy",
        },
        {
          size: 30,
          time: 2,
          category: "linearProgramming",
        },
        {
          size: 100,
          time: 1,
          category: "greedy",
        },
        {
          size: 100,
          time: 294,
          category: "linearProgramming",
        },
        {
          size: 150,
          time: 0,
          category: "greedy",
        },
        {
          size: 150,
          time: 1569,
          category: "linearProgramming",
        },
        {
          size: 200,
          time: 1,
          category: "greedy",
        },
        {
          size: 200,
          time: 4253,
          category: "linearProgramming",
        },
        {
          size: 250,
          time: 2,
          category: "greedy",
        },
        {
          size: 250,
          time: 10528,
          category: "linearProgramming",
        },
        {
          size: 300,
          time: 6,
          category: "greedy",
        },
        {
          size: 300,
          time: 23387,
          category: "linearProgramming",
        },
      ];
      console.log(this.performanceData);

      const line = new Line("performance", {
        data: this.performanceData,
        xField: "size",
        yField: "time",
        seriesField: "category",
      });

      
      line.render();
    },

    getPerformanceData() {
      const scales = [10, 20, 30, 100, 150, 200, 250, 300];
      const performanceData = [];
      for (let scale of scales) {
        const greedyRuntime = this.averageRunTime(
          greedySetCover,
          scale,
          AVG_TIMES
        );
        performanceData.push({
          size: scale,
          time: greedyRuntime,
          category: "greedy",
        });
        const linearProgrammingRuntime = this.averageRunTime(
          setCoverRounding,
          scale,
          AVG_TIMES
        );
        performanceData.push({
          size: scale,
          time: linearProgrammingRuntime,
          category: "linearProgramming",
        });
      }

      return performanceData;
    },

    averageRunTime(algorithm, scale, times) {
      const [X, F] = generateData(scale, MULTIPLIER * scale);
      let totaltime = 0;

      for (let i = 0; i < times; i++) {
        const start = performance.now();
        algorithm(X, F);
        const end = performance.now();
        totaltime += Math.floor(end - start);
      }

      return totaltime / times;
    },
  },
};
</script>

<style>
</style>