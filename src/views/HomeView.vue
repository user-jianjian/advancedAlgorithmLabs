<template>
  <div class="home">
    <h1>高级算法实验</h1>
    <LabDes link="/lab1" class="lab" id="lab1">
      <template v-slot:title><h5>实验一：分治算法</h5></template>
      <template v-slot:default>
        <p>
          求解凸包问题：输入是平面上 n 个点的集合 Q，凸包问题是要输出一个 Q 的
          凸包。其中， Q 的凸包是一个凸多边形 P， Q 中的点或者在 P 上或者在 P
          中。（详 情请见课件）
        </p>
      </template>
    </LabDes>

    <LabDes link="/lab2" class="lab" id="lab2">
      <template v-slot:title><h5>实验二：搜索算法</h5></template>
      <template v-slot:default>
        <p>
          寻路问题。输入一个方格表示的地图，要求用
          A*算法找到并输出从起点（在方格中标示字母S）到终点（在方格中标示字母
          T）的代价最小 的路径。
        </p>
      </template>
    </LabDes>

    <LabDes link="/lab3" class="lab" id="lab3">
      <template v-slot:title><h5>实验三：近似算法</h5></template>
      <template v-slot:default>
        <p>集合覆盖问题</p>
      </template>
    </LabDes>

    <LabDes link="/lab4" class="lab" id="lab4">
      <template v-slot:title><h5>实验四： 快速排序</h5></template>
      <template v-slot:default>
        <p>
          快速排序是算法导论中的经典算法。在本实验中，给定一个长为 n 的整数数
          组，要求将数组升序排序。
        </p>
      </template>
    </LabDes>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";
import LabDes from "../components/LabDes";
export default {
  name: "HomeView",
  components: {
    Home,
    LabDes,
  },
};
</script>
<style scoped>
h1 {
  margin: 20px auto 30px auto;
}

.lab {
  margin: 0 auto 20px auto;
}
</style>