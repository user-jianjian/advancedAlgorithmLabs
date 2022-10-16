<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span><slot name="title"></slot></span>
        <el-button class="button" type="text" @click="$router.push(this.link)"
          >进入详情页</el-button
        >
      </div>
    </template>
    <div class="text item"><slot></slot></div>
  </el-card>
</template>

<script>
export default {
  props: ["link"],
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  /* margin: 0 auto; */
}
</style>