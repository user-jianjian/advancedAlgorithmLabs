<template>
  <div>
    <div class="options">
      <el-button type="text" @click="runData1Single">数据集1+单向A*</el-button>
      <el-button type="text" @click="runData1Bi">数据集1+双向A*</el-button>
      <el-button type="text" @click="runData2Single">数据集2+单向A*</el-button>
      <el-button type="text" @click="runData2Bi">数据集2+双向A*</el-button>
    </div>

    <Board
      :board="board"
      :path="path"
      :forwardPath="forwardPath"
      :backwardPath="backwardPath"
    ></Board>
  </div>
</template>

<script>
import Board from "../components/Board.vue";
import {} from "../labs/lab2/main.js";
import { getPathInAstar, getPathInBiAstar } from "../labs/lab2/AStarSearch";
import { getMap1, getMap2 } from "../labs/lab2/helper";
export default {
  components: {
    Board,
  },

  data() {
    return {
      board: [],
      path: [],
      forwardPath: [],
      backwardPath: [],
    };
  },

  created() {
    // [this.board, this.start, this.end] = getMap1();
    // [this.path, this.forwardPath, this.backwardPath] =
    //   getPathInAstar(getMap1);
    // [this.path, this.forwardPath, this.backwardPath] = getPathInBiAstar(getMap2);
  },

  methods: {
    runData1Single() {
      this.board = [];
      this.path = [];
      this.forwardPath = [];
      this.backwardPath = [];
      [this.board, this.start, this.end] = getMap1();
      this.path = getPathInAstar(getMap1);
    },

    runData1Bi() {
      this.board = [];
      this.path = [];
      this.forwardPath = [];
      this.backwardPath = [];
      [this.board, this.start, this.end] = getMap1();
      [ , this.forwardPath, this.backwardPath] =
        getPathInBiAstar(getMap1);
    },

    runData2Single() {
      this.board = [];
      this.path = [];
      this.forwardPath = [];
      this.backwardPath = [];
      [this.board, this.start, this.end] = getMap2();
      this.path = getPathInAstar(getMap2);
    },

    runData2Bi() {
      this.board = [];
      this.path = [];
      this.forwardPath = [];
      this.backwardPath = [];
      [this.board, this.start, this.end] = getMap2();
      [ , this.forwardPath, this.backwardPath] =
        getPathInBiAstar(getMap2);
    },
  },
};
</script>

<style>
.options {
  margin: 20px auto 0 10px;
}
</style>