<template>
  <div>
    <div id="size" class="options">
      <el-input v-model="pointsSize" placeholder="请输入生成的数据集规模">
        <template #append>
          <el-button id="button" @click="generatePoints">确定</el-button>
        </template>
      </el-input>
    </div>
    <div class="options">
      <el-button type="text" @click="runBruteForce">点击运行蛮力算法</el-button>
      <el-button type="text" @click="runGrahamScan"
        >点击运行Graham-Scan算法</el-button
      >
      <el-button type="text" @click="runDivideConqer"
        >点击运行分治算法</el-button
      >
    </div>
    <el-button type="text" @click="$router.push('/lab1-compare')"
        >点击查看性能比较</el-button
      >
    <p>运行时间为{{ time }}毫秒</p>

    <square-canvas :points="points" :convexHull="convexHull"></square-canvas>
  </div>
</template>

<script>
import SquareCanvas from "../components/SquareCanvas.vue";
import { generatePointsSet } from "../labs/lab1/generatePointsSet";
import { bruteForce } from "../labs/lab1/bruteForce";
import { grahamScan } from "../labs/lab1/grahamScan";
import { divideConquer } from "../labs/lab1/divideConquer";
export default {
  data() {
    return {
      pointsSize: undefined,
      points: [],
      convexHull: [],
      time: "",
    };
  },
  methods: {
    generatePoints() {
      this.points = [];
      this.convexHull = [];
      this.points = generatePointsSet(0, 500, 0, 500, this.pointsSize);
    },

    runBruteForce() {
      const start = performance.now();
      this.convexHull = [];
      this.convexHull = bruteForce(this.points);
      const end = performance.now();
      this.time = Math.floor(end - start);
    },

    runGrahamScan() {
      const start = performance.now();
      this.convexHull = [];
      this.convexHull = grahamScan(this.points);
      const end = performance.now();
      this.time = Math.floor(end - start);
    },

    runDivideConqer() {
      const start = performance.now();
      this.convexHull = [];
      this.convexHull = divideConquer(this.points);
      const end = performance.now();
      this.time = Math.floor(end - start);
    },
  },
  components: {
    SquareCanvas,
  },
};
</script>

<style>
#size {
  width: 200px;
  display: inline-block;
  margin-bottom: 10px;
}

#button {
  display: inline;
  margin-top: 3px;
}

.options {
  margin: 10px auto 0 auto;
}
</style>