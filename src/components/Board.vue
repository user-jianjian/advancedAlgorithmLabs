<template>
  <div>
    <svg :width="boardWidth" :height="boardHeight">
      <rect
        v-for="(pos, ind) in plains"
        :key="ind"
        :x="pos[1] * (cellSize + strokeSize)"
        :y="pos[0] * (cellSize + strokeSize)"
        :width="cellSize"
        :height="cellSize"
        :style="{
          fill: 'rgb(255, 255, 255)',
          strokeWidth: strokeSize,
          stroke: 'rgb(0, 0, 0)',
        }"
      />
      <rect
        v-for="(pos, ind) in obstacles"
        :key="ind"
        :x="pos[1] * (cellSize + strokeSize)"
        :y="pos[0] * (cellSize + strokeSize)"
        :width="cellSize"
        :height="cellSize"
        :style="{
          fill: 'rgb(127, 127, 127)',
          strokeWidth: strokeSize,
          stroke: 'rgb(0, 0, 0)',
        }"
      />
      <rect
        v-for="(pos, ind) in deserts"
        :key="ind"
        :x="pos[1] * (cellSize + strokeSize)"
        :y="pos[0] * (cellSize + strokeSize)"
        :width="cellSize"
        :height="cellSize"
        :style="{
          fill: 'rgb(255, 192, 0)',
          strokeWidth: strokeSize,
          stroke: 'rgb(0, 0, 0)',
        }"
      />
      <rect
        v-for="(pos, ind) in rivers"
        :key="ind"
        :x="pos[1] * (cellSize + strokeSize)"
        :y="pos[0] * (cellSize + strokeSize)"
        :width="cellSize"
        :height="cellSize"
        :style="{
          fill: 'rgb(0, 176, 240)',
          strokeWidth: strokeSize,
          stroke: 'rgb(0, 0, 0)',
        }"
      />

      <circle
        v-for="(pos, ind) in circlePath"
        :key="ind"
        :cx="pos[1]"
        :cy="pos[0]"
        :r="cellSize / 2 - 1"
        fill="rgb(254, 70, 165)"
      />

      <circle
        v-for="(pos, ind) in innerForwardPath"
        :key="ind"
        :cx="(pos[1] + 1 / 2) * (cellSize + strokeSize)"
        :cy="(pos[0] + 1 / 2) * (cellSize + strokeSize)"
        :r="cellSize / 2 - 1"
        fill="rgb(254, 70, 165)"
      />

      <circle
        v-for="(pos, ind) in innerBackwardPath"
        :key="ind"
        :cx="(pos[1] + 1 / 2) * (cellSize + strokeSize)"
        :cy="(pos[0] + 1 / 2) * (cellSize + strokeSize)"
        :r="cellSize / 2 - 1"
        fill="red"
      />
    </svg>
  </div>
</template>

<script>
const CELL_SIZE = 20;
const STROKE_SIZE = 1;

export default {
  props: ["board", "path", "forwardPath", "backwardPath"],

  data() {
    return {
      cellSize: CELL_SIZE,
      strokeSize: STROKE_SIZE,
      innerForwardPath: [],
      innerBackwardPath: [],
    };
  },

  watch: {
    forwardPath() {
      this.innerForwardPath = this.forwardPath;
    },

    backwardPath() {
      this.innerBackwardPath = this.backwardPath;
    },

    board() {
      console.log("<<<<<")
      this.boardWidth = this.board[0].length * (CELL_SIZE + 2 * STROKE_SIZE);
      this.boardHeight = this.board.length * (CELL_SIZE + 2 * STROKE_SIZE); // 1：不能是空数组
      [this.plains, this.obstacles, this.deserts, this.rivers] =
      this.getTopography();
      // if (this.innerForwardPath.length !== 0 || this.innerBackwardPath.length !== 0) {
      //   // do nothing
      //   this.circlePath = [];
      // } else {
      //   this.getCirclePath();
      // }
    },
    path() {
      // console.log(".........")
      // this.circlePath = [];
      this.getCirclePath();
      // console.log(this.circlePath);
    },

    
  },

  // computed: {
  //   board() {
  //     this.boardWidth = this.board[0].length * (CELL_SIZE + 2 * STROKE_SIZE);
  //     this.boardHeight = this.board.length * (CELL_SIZE + 2 * STROKE_SIZE); // 1：不能是空数组
  //     [this.plains, this.obstacles, this.deserts, this.rivers] =
  //     this.getTopography();
  //     return this.board;
  //   },
  //   path() {
  //     this.getCirclePath();
  //     return this.path;
  //   },
  // },

  created() {
    // this.boardWidth = this.board[0].length * (CELL_SIZE + 2 * STROKE_SIZE);
    // this.boardHeight = this.board.length * (CELL_SIZE + 2 * STROKE_SIZE); // 1：不能是空数组
    // [this.plains, this.obstacles, this.deserts, this.rivers] =
    //   this.getTopography();
    // this.getCirclePath();
  },

  methods: {
    getTopography() {
      const board = this.board;
      const plains = [],
        obstacles = [],
        deserts = [],
        rivers = [];

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          if (board[i][j] === 0) {
            plains.push([i, j]);
          } else if (board[i][j] === -1) {
            obstacles.push([i, j]);
          } else if (board[i][j] === 4) {
            deserts.push([i, j]);
          } else if (board[i][j] === 2) {
            rivers.push([i, j]);
          }
        }
      }

      return [plains, obstacles, deserts, rivers];
    },

    getCirclePath() {
      const path = this.path;
      this.circlePath = [];

      path.forEach((pos, ind) => {
        this.circlePath.push([
          (pos[0] + 1 / 2) * (CELL_SIZE + STROKE_SIZE),
          (pos[1] + 1 / 2) * (CELL_SIZE + STROKE_SIZE),
        ]);
      });
    },
  },
};
</script>

<style>
</style>