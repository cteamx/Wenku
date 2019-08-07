<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "wenku"
};
</script>

<style>
/* CSS */
html,
body {
  margin: 0px;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  height: 100%;
}

.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 0px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}


.el-link.el-link--default:hover {
    color: #444444;
}

.el-link.el-link--default {
    color: #444444;
}

.el-tabs__item {
    padding: 0 10px;
}
</style>
