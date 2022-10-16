<template>
  <div>
      <div>{{title}}</div>
      <div>{{content}}</div>
      <button @click="confirmHandler">确定</button>
      <button @click="cancelHandler">取消</button>
    </div>
</template>

<script>

export default {
    props: ["title","content","cancelHandler","confirmHandler"],
    watch: {
        title()
    }
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