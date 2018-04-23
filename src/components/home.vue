<template>
  <div class="home_page">
    <el-container>
      <el-aside width="220px">
        <div class="left_main">
          <div class="logo_main">
            <img src="./../../static/img/logo.png">
          </div>
          <div class="menu_main">
              <router-link to="/Record" class="active"><i class="iconfont icon-jiluliebiao"></i>交易记录</router-link>
          </div>
        </div>
      </el-aside>
      <el-container>
  
        <el-header height="70px">
  
          <topitem></topitem>
  
        </el-header>
  
        <el-main>
          <router-view></router-view>
        </el-main>
  
      </el-container>
    </el-container>
  </div>
</template>
<script>
import topitem from "./top";
export default {
  name: "home",
  components: {
    topitem
  },
  data() {
    return {
      handleOpen(key, keyPath) {
        // 导航栏切换
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.home_page {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      width: 220px;
      .left_main {
        height: 100%;
        overflow: hidden;
        background: rgb(1, 84, 163);
        .logo_main {
          height: 57px;
          padding-top: 13px;
          border-right: solid 1px rgb(228, 228, 228);
          background: #ffffff;
          img {
            margin: 0 auto;
            display: block;
          }
        }
        .menu_main {
          width: 100%;
          padding-top: 50px;
          height: calc(100% - 70px);
            a {
              display: block;
              line-height: 50px;
              color: #ffffff;
              font-size: 16px;
              padding-left: 20px;
              .iconfont {
                margin-right: 8px;
                font-size: 20px;
                color: rgb(156, 193, 255);
              }
            }
            a:hover {
              background: rgb(1, 71, 138);
            }
            .active {
              background: rgb(1, 71, 138);
            }
            // li {
            //   display: block;
            //   height: 50px;

            // }
            // .active {
            //   background: rgb(1, 71, 138);
            // }
        }
      }
    }
  }
}
</style>
