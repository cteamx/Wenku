<template>
  <div class="segmentfault">
    <el-table height="420" :data="tableData" style="width: 100%" size="mini" :show-header="false">
      <el-table-column prop="title" class="title">
        <template slot-scope="scope">
          <el-link
            :underline="false"
            target="_blank"
            class="title_url"
            @click="open(scope.row.url)"
          >{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { shell } from "electron";
import segmentfault from "../spiders/segmentfault";

export default {
  name: "segmentfault",
  data() {
    return {
      tableData: null
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let loading = this.$loading({
        target: ".segmentfault",
        lock: true,
        text: "玩命加载中",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.9)"
      });

      segmentfault.getNew(d => {
        this.tableData = d;
        loading.close();
      });
    },
    open(url) {
      shell.openExternal(url);
    }
  }
};
</script>

<style scoped lang="scss">
.el-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
}
</style>
