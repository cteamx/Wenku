<template>
  <div id="div">
    <div v-if="is_top_arrow" class="top-arrow"></div>
    <div class="bg">
      <div class="header">
        <el-dropdown size="mini" class="setting" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-edit"></i>
        <span>开发者文库</span>
        <i class="el-icon-info" @click="open('https://wenku.dev')"></i>
      </div>
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane name="v2exNew">
          <span slot="label" class="tab-title">
            <img src="../assets/images/v2ex.png" alt> v2ex新
          </span>
          <V2ex v-if="is_v2ex_new" type="new"/>
        </el-tab-pane>
        <el-tab-pane name="v2exTop">
          <span slot="label" class="tab-title">
            <img src="../assets/images/v2ex.png" alt> v2ex热
          </span>
          <V2ex v-if="is_v2ex_top" type="top"/>
        </el-tab-pane>
        <el-tab-pane name="csdn">
          <span slot="label" class="tab-title">
            <img src="../assets/images/csdn.jpg" alt> CSDN
          </span>
          <Csdn v-if="is_csdn"/>
        </el-tab-pane>
        <el-tab-pane name="github">
          <span slot="label" class="tab-title">
            <img src="../assets/images/github.png" alt> GitHub
          </span>
          <Github v-if="is_github"/>
        </el-tab-pane>
        <el-tab-pane name="gitbook">
          <span slot="label" class="tab-title">
            <img src="../assets/images/gitbook.png" alt> GitBook
          </span>
          <Gitbook v-if="is_gitbook"/>
        </el-tab-pane>
        <el-tab-pane name="freebuf">
          <span slot="label" class="tab-title">
            <img src="../assets/images/freebuf.png" alt> FreeBuf
          </span>
          <Freebuf v-if="is_freebuf"/>
        </el-tab-pane>
        <el-tab-pane name="cto51">
          <span slot="label" class="tab-title">
            <img src="../assets/images/51cto.png" alt> 51CTO
          </span>
          <Cto51 v-if="is_cto51"/>
        </el-tab-pane>
        <el-tab-pane name="infoq">
          <span slot="label" class="tab-title">
            <img src="../assets/images/infoq.jpg" alt> InfoQ
          </span>
          <Infoq v-if="is_infoq"/>
        </el-tab-pane>
        <el-tab-pane name="shouji">
          <span slot="label" class="tab-title">
            <img src="../assets/images/imooc.png" alt> 手记
          </span>
          <Shouji v-if="is_shouji"/>
        </el-tab-pane>
        <el-tab-pane name="oschina">
          <span slot="label" class="tab-title">
            <img src="../assets/images/oschina.png" alt> 开源中国
          </span>
          <Oschina v-if="is_oschina" type="new"/>
        </el-tab-pane>
        <el-tab-pane name="oschinaJob">
          <span slot="label" class="tab-title">
            <img src="../assets/images/oschina.png" alt> 职业生涯
          </span>
          <Oschina v-if="is_oschina_job" type="job"/>
        </el-tab-pane>
        <el-tab-pane name="oschinaOpen">
          <span slot="label" class="tab-title">
            <img src="../assets/images/oschina.png" alt> 开源访谈
          </span>
          <Oschina v-if="is_oschina_open" type="open"/>
        </el-tab-pane>
        <el-tab-pane name="toutiao">
          <span slot="label" class="tab-title">
            <img src="../assets/images/toutiao.png" alt> 开发者头条
          </span>
          <Toutiao v-if="is_toutiao"/>
        </el-tab-pane>
        <el-tab-pane name="segmentfault">
          <span slot="label" class="tab-title">
            <img src="../assets/images/sf.png" alt> SegmentFault
          </span>
          <Segmentfault v-if="is_segmentfault"/>
        </el-tab-pane>
        <el-tab-pane name="jobbole">
          <span slot="label" class="tab-title">
            <img src="../assets/images/job.png" alt> 伯乐在线
          </span>
          <Jobbole v-if="is_jobbole"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { shell, ipcRenderer } from "electron";
import V2ex from "@/components/v2ex";
import Toutiao from "@/components/toutiao";
import Segmentfault from "@/components/segmentfault";
import Jobbole from "@/components/jobbole";
import Csdn from "@/components/csdn";
import Github from "@/components/github";
import Gitbook from "@/components/gitbook";
import Freebuf from "@/components/freebuf";
import Cto51 from "@/components/cto51";
import Infoq from "@/components/infoq";
import Shouji from "@/components/shouji";
import Oschina from "@/components/oschina";

export default {
  name: "main",
  components: {
    V2ex,
    Toutiao,
    Segmentfault,
    Jobbole,
    Csdn,
    Github,
    Gitbook,
    Freebuf,
    Cto51,
    Shouji,
    Oschina,
    Infoq
  },
  data() {
    return {
      activeName: "v2exNew",
      is_v2ex_new: true,
      is_v2ex_top: true,
      is_toutiao: true,
      is_segmentfault: true,
      is_juejin: true,
      is_jobbole: true,
      is_top_arrow: true,
      is_csdn: true,
      is_github: true,
      is_freebuf: true,
      is_gitbook: true,
      is_cto51: true,
      is_infoq: true,
      is_shouji: true,
      is_oschina: true,
      is_oschina_job: true,
      is_oschina_open: true
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let isMac = "darwin" === process.platform;
      if (!isMac) {
        this.is_top_arrow = false;
      }
    },
    open(url) {
      shell.openExternal(url);
    },
    handleCommand(command) {
      if (command === "exit") {
        ipcRenderer.send("exit", "ping");
      }
    },
    tabHandleClick(tab, event) {
      if (tab.name === "v2exNew") {
        this.is_v2ex_new = false;
        this.$nextTick(() => {
          this.is_v2ex_new = true;
        });
      } else if (tab.name === "v2exTop") {
        this.is_v2ex_top = false;
        this.$nextTick(() => {
          this.is_v2ex_top = true;
        });
      } else if (tab.name === "toutiao") {
        this.is_toutiao = false;
        this.$nextTick(() => {
          this.is_toutiao = true;
        });
      } else if (tab.name === "segmentfault") {
        this.is_segmentfault = false;
        this.$nextTick(() => {
          this.is_segmentfault = true;
        });
      } else if (tab.name === "juejin") {
        this.is_juejin = false;
        this.$nextTick(() => {
          this.is_juejin = true;
        });
      } else if (tab.name === "jobbole") {
        this.is_jobbole = false;
        this.$nextTick(() => {
          this.is_jobbole = true;
        });
      } else if (tab.name === "csdn") {
        this.is_csdn = false;
        this.$nextTick(() => {
          this.is_csdn = true;
        });
      } else if (tab.name === "github") {
        this.is_github = false;
        this.$nextTick(() => {
          this.is_github = true;
        });
      } else if (tab.name === "gitbook") {
        this.is_gitbook = false;
        this.$nextTick(() => {
          this.is_gitbook = true;
        });
      } else if (tab.name === "freebuf") {
        this.is_freebuf = false;
        this.$nextTick(() => {
          this.is_freebuf = true;
        });
      } else if (tab.name === "cto51") {
        this.is_cto51 = false;
        this.$nextTick(() => {
          this.is_cto51 = true;
        });
      } else if (tab.name === "infoq") {
        this.is_infoq = false;
        this.$nextTick(() => {
          this.is_infoq = true;
        });
      } else if (tab.name === "shouji") {
        this.is_shouji = false;
        this.$nextTick(() => {
          this.is_shouji = true;
        });
      } else if (tab.name === "oschina") {
        this.is_oschina = false;
        this.$nextTick(() => {
          this.is_oschina = true;
        });
      } else if (tab.name === "oschinaJob") {
        this.is_oschinaJob = false;
        this.$nextTick(() => {
          this.is_oschinaJob = true;
        });
      } else if (tab.name === "oschinaOpen") {
        this.is_oschinaOpen = false;
        this.$nextTick(() => {
          this.is_oschinaOpen = true;
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
#div {
  height: 100%;
  overflow-y: hidden;

  .bg {
    height: 100%;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .header {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      background: #409eff;
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-size: 13px;

      .setting {
        color: #fff;
        float: left;
        margin-left: 8px;
        cursor: pointer;
      }

      span {
        font-weight: 500;
      }

      .el-icon-info {
        float: right;
        line-height: 31px;
        margin-right: 8px;
        cursor: pointer;
      }
    }

    .tab-title {
      font-size: 12px;

      img {
        width: 13px;
        height: 13px;
        vertical-align: middle;
      }
    }

    .footer {
      border-top: 1px solid #dedede;
      background: #ececec;
      height: 50px;
    }
  }

  .top-arrow {
    width: 100%;
    height: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: transparent;
  }

  .top-arrow::before {
    content: "";
    width: 0;
    height: 0;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #409eff;
  }
}
</style>
