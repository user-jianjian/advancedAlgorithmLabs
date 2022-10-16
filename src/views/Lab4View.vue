<template>
  <div>
    <div class="options">
      <el-button type="text" @click="getPerformanceLine1"
        >点击查看不同重复比例的性能图</el-button
      >
      <el-button type="text" @click="getPerformanceLine2"
        >点击查看与库函数的性能比较图</el-button
      >
    </div>
    <div id="performance"></div>
  </div>
</template>

<script>
import {
  generateData,
  generateProportionData,
} from "../labs/lab4/generateData";
import { quickSort } from "../labs/lab4/quickSort";
import { improvedQuickSort } from "../labs/lab4/improvedQuickSort";
import { Line } from "@antv/g2plot";

const MULTIPLIER = 10;
const TIMES = 1;

export default {
  created() {
    const data = generateProportionData(100, 0.2, 200);
    console.log(data);
    quickSort(data);
    console.log(data);
  },
  methods: {
    getPerformanceLine1() {
      const proportions = [
        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
      ];
      this.performanceData = [];
      const SIZE = Math.pow(10, 4);
      for (let proportion of proportions) {
        const data = generateProportionData(
          SIZE,
          proportion,
          MULTIPLIER * SIZE
        );
        const start = performance.now();
        quickSort(data);
        const end = performance.now();
        this.performanceData.push({
          proportion,
          time: end - start,
          //   category: "initialQuickSort",
        });
      }
      console.log(this.performanceData);
      //   const line = new Line("performance", {
      //     data: this.performanceData,
      //     xField: "size",
      //     yField: "time",
      //     seriesField: "category",
      //   });

      const line = new Line("performance", {
        data: this.performanceData,
        xField: "proportion",
        yField: "time",
      });
      line.render();
    },

    getPerformanceLine2() {
      const scales = [
        Math.pow(10, 4),
        Math.pow(10, 5),
        Math.pow(10, 6),
        Math.pow(10, 7),
      ];
      const proportions = [0, 0.05, 0.1];
      this.performanceData = [];
      //   for (let scale of scales) {
      //     for (let proportion of proportions) {
      //       const data = generateProportionData(
      //         scale,
      //         proportion,
      //         MULTIPLIER * scale
      //       );
      //       let start = performance.now();
      //       improvedQuickSort(data);
      //       let end = performance.now();
      //       this.performanceData.push({
      //         sizeAndpropotion: scale + "," + proportion,
      //         time: end - start,
      //         category: "MyQuickSort",
      //       });
      //       start = performance.now();
      //       data.sort((a, b) => a - b);
      //       end = performance.now();
      //       this.performanceData.push({
      //         sizeAndpropotion: scale + "," + proportion,
      //         time: end - start,
      //         category: "QuickSort",
      //       });
      //     }
      //   }
      this.performanceData = [
        {
          sizeAndpropotion: "10000,0",
          time: 14.599999904632568,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000,0",
          time: 0.30000007152557373,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "10000,0.05",
          time: 1.5,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000,0.05",
          time: 0.20000004768371582,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "10000,0.1",
          time: 1.399999976158142,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000,0.1",
          time: 0.2999999523162842,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "100000,0",
          time: 16.800000071525574,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "100000,0",
          time: 2.200000047683716,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "100000,0.05",
          time: 19,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "100000,0.05",
          time: 1.899999976158142,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "100000,0.1",
          time: 15.799999952316284,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "100000,0.1",
          time: 1.8000000715255737,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "1000000,0",
          time: 225.20000004768372,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "1000000,0",
          time: 17.899999976158142,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "1000000,0.05",
          time: 238.60000002384186,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "1000000,0.05",
          time: 24.399999976158142,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "1000000,0.1",
          time: 238.90000009536743,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "1000000,0.1",
          time: 23.399999976158142,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "10000000,0",
          time: 2439.899999976158,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000000,0",
          time: 221.10000002384186,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "10000000,0.05",
          time: 2421.2000000476837,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000000,0.05",
          time: 225.30000007152557,
          category: "QuickSort",
        },
        {
          sizeAndpropotion: "10000000,0.1",
          time: 2231,
          category: "MyQuickSort",
        },
        {
          sizeAndpropotion: "10000000,0.1",
          time: 222.29999995231628,
          category: "QuickSort",
        },
      ];
      console.log(this.performanceData);
      const line = new Line("performance", {
        data: this.performanceData,
        xField: "sizeAndpropotion",
        yField: "time",
        seriesField: "category",
      });
      line.render();
    },

    getPerformanceData() {
      const scales = [];
      const performanceData = [];
    },
    averageRunTime(algorithm, generateDataMethod, scale, times) {
      const data = generateDataMethod(scale, MULTIPLIER * scale);
      let totaltime = 0;

      for (let i = 0; i < times; i++) {
        const start = performance.now();
        algorithm(data);
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