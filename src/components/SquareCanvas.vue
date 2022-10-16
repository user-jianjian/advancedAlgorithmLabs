<template>
  <div>
    <svg height="500" width="500" style="border: 1px solid black">
      <circle
        v-for="(p, index) in curPoints"
        :key="index"
        :cx="p[0]"
        :cy="p[1]"
        r="2"
        stroke="black"
        stroke-width="0.5"
        fill="black"
      />

      <circle
        v-for="(p, index) in convexHull"
        :key="index"
        :cx="p[0]"
        :cy="p[1]"
        r="2"
        stroke="red"
        stroke-width="0.5"
        fill="red"
      />

      <line
        v-for="(edge, index) in edges"
        :key="index"
        :x1="edge[0][0]"
        :y1="edge[0][1]"
        :x2="edge[1][0]"
        :y2="edge[1][1]"
        style="stroke: red; stroke-width: 0.5"
      />
    </svg>
  </div>
</template>

<script>

export default {
  props: ["points", "convexHull"],

  created() {
  },

  computed: {

    curPoints() {
      return this.points;
    },

    edges() {

      if (this.convexHull.length <= 0) {
        return [];
      }

      const edges = [];

      for (let i = 0; i < this.convexHull.length - 1; i++) {
        edges.push([this.convexHull[i], this.convexHull[i + 1]]);
      }

      edges.push([this.convexHull[this.convexHull.length - 1], this.convexHull[0]]);

      return edges;
    },

    curConvexHull() {
      return this.convexHull;
    }
  },

  mounted() {},

  methods: {
    getEdges(convexHull) {
      console.log(convexHull.length);

      if (convexHull.length <= 0) {
        return [];
      }

      const edges = [];
      for (let i = 0; i < convexHull.length - 1; i++) {
        edges.push([convexHull[i], convexHull[i + 1]]);
      }
      edges.push([convexHull[convexHull.length - 1], convexHull[0]]);

      console.log(edges);

      return edges;
    },
  },
};
</script>

<style>
</style>