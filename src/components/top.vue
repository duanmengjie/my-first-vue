<template>
  <div class="top_page">
  
    <h3 class="head_title">电子支付管理系统</h3>
  
    <div class="head_rt">
  
      <div class="head_sit" @mouseover="showDialog()" @mouseleave="hideDialog()">
  
        <a class="admin_link"><i class="iconfont icon-yonghu"></i>admin</a>
  
        <a class="admin_link2" v-if="passwordText" @click="editPassword()">修改密码</a>
  
      </div>
  
      <a class="exit_link"><i class="iconfont icon-tuichu"></i>退出</a>
  
    </div>

    <div class="mask_box" v-if="passwordVisible"></div>
    <div class="dialog_main" v-if="passwordVisible">
      <div class="dialog_head">
        <h3 class="title">修改密码</h3>
        <i class="iconfont icon-iconfontguanbi" @click="close_password()"></i>
      </div>
      <ul class="form_pass">
        <li>
          <p class="title_box">原密码：</p>
          <input type="password" class="form_txt" v-model="password" name="password"/>
        </li>
        <li>
          <p class="title_box">新密码：</p>
          <input type="password" class="form_txt" placeholder="输入6~20位密码"  v-model="new_pwd" name="new_pwd"/>
        </li>
        <li>
          <p class="title_box">新密码确认：</p>
          <input type="password" class="form_txt" placeholder="再次输入密码" v-model="new_pwd_conf" name="new_pwd_conf"/>
        </li>
        <li v-if="error">
          <div class="edit_msg" v-if="msg === 'no_oldpass'"><i class="iconfont icon-guanbi"></i>原密码不能为空</div>
          <div class="edit_msg" v-else-if="msg === 'no_newpass'"><i class="iconfont icon-guanbi"></i>新密码不能为空</div>
          <div class="edit_msg" v-else-if="msg === 'no_new_pwd_conf'"><i class="iconfont icon-guanbi"></i>确认密码不能为空</div>
          <div class="edit_msg" v-else-if="msg === 'emptylogin'"><i class="iconfont icon-guanbi"></i>密码不存在</div>
          <div class="edit_msg" v-else><i class="iconfont icon-guanbi"></i>两次密码输入不一致</div>
        </li>
        <div>
          <input type="hidden" name="username" value="username" v-model="username" />
        </div>
        <div class="form_footer">
          <a class="cancel" @click="close_password()">取消</a>
          <a class="pass_btn" @click="submitForm()">确认</a>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordVisible: false, // 是否显示修改密码弹窗
      passwordText: false, // 是否显示修改密码文字
      password: "",
      new_pwd: "",
      new_pwd_conf: "",
      username: "",
      error: false
    };
  },
  methods: {
    // 关闭密码弹窗
    close_password() {
      this.passwordVisible = false;
      this.password = "";
      this.new_pwd = "";
      this.new_pwd_conf = "";
      this.error = false;
    },
    // 修改密码弹窗显示
    editPassword() {
      this.passwordVisible = true;
    },
    // 鼠标移上显示修改密码文字
    showDialog() {
      this.passwordText = true;
    },
    // 鼠标移上隐藏修改密码文字
    hideDialog() {
      this.passwordText = false;
    },
    // 确认提交
    submitForm() {
      let vm = this;
      if (this.password == "") {
        this.error = true;
        this.msg = "no_oldpass";
      } else if (this.new_pwd == "") {
        this.error = true;
        this.msg = "no_newpass";
      } else if (this.new_pwd_conf == "") {
        this.error = true;
        this.msg = "no_new_pwd_conf";
      } else {
        const username = localStorage.getItem("username");
        this.username = username;
        console.log(username);
        this.$http
          .get(API.editPassword, {
            params: {
              password: this.password,
              new_pwd: this.new_pwd,
              new_pwd_conf: this.new_pwd_conf,
              username: this.username
            }
          })
          .then(res => {
            let data = res.data;
            if (data.result === "success") {
              this.error = false;
              this.password_dialog = false;
              this.password_btn = false;
              vm.$router.replace({ path: "/" });
            } else {
              this.error = true;
              this.msg = data.result;
            }
          })
          .catch(error => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top_page {
  width: 100%;
  height: 70px;
  .head_title {
    display: inline-block;
    color: rgb(77, 77, 77);
    font-size: 18px;
    padding: 25px 0 0 22px;
  }
  .head_rt {
    float: right;
    height: 70px;
    padding-right: 20px;
    .head_sit {
      display: inline-block;
      width: 120px;
      height: 66px;
      position: relative;
      border-top: solid 4px rgb(255, 255, 255);
      .admin_link {
        width: 120px;
        height: 66px;
        line-height: 66px;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        color: rgb(77, 77, 77);
        cursor: pointer;
      }
      .admin_link .iconfont,
      .exit_link .iconfont {
        font-size: 26px;
        margin-right: 3px;
        vertical-align: middle;
      }
      .admin_link:hover {
        color: rgb(1, 84, 163);
      }
      .admin_link2 {
        width: 120px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 0;
        top: 66px;
        z-index: 10;
        background: rgb(242, 242, 242);
        color: rgb(77, 77, 77);
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
    }
    .exit_link {
      width: 120px;
      height: 66px;
      line-height: 66px;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      color: rgb(77, 77, 77);
      cursor: pointer;
      border-top: solid 4px rgb(255, 255, 255);
    }
    .exit_link:hover {
      border-top: solid 4px rgb(1, 84, 163);
      color: rgb(1, 84, 163);
    }
  }
  .mask_box {
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 99;
    opacity: 0.5;
    position: fixed;
    left: 0;
    top: 0;
  }
  .dialog_main {
    width: 420px;
    height: 402px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -201px 0 0 -210px;
    background: #ffffff;
    z-index: 100;
    border-radius: 8px;
    box-shadow: #aeadad 0px 2px 6px 0px;
    .dialog_head {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: rgb(242, 242, 242);
      border-radius: 8px 8px 0 0;
      .title {
        color: rgb(77, 77, 77);
        font-size: 16px;
        padding-left: 30px;
        display: inline-block;
      }
      .iconfont {
        float: right;
        margin-right: 15px;
        color: rgb(189, 191, 193);
        padding: 0 10px;
        cursor: pointer;
        font-size: 20px;
      }
      &:hover {
        color: #409eff;
      }
    }
    .form_pass {
      display: block;
      padding: 18px 30px;
      position: relative;
      height: 316px;
      .title_box {
        display: block;
        color: rgb(77, 77, 77);
        font-size: 14px;
        padding: 0 0 10px 0;
      }
      .form_txt {
        display: block;
        height: 30px;
        border: solid 1px rgb(190, 190, 190);
        border-radius: 3px;
        width: 100%;
        margin-bottom: 20px;
        color: #606266;
        font-size: 14px;
        text-indent: 10px;
        &:focus {
          color: #606266;
          border: solid 1px #409eff;
        }
      }
      .form_footer {
        width: 86%;
        overflow: hidden;
        position: absolute;
        left: 30px;
        bottom: 30px;
        a {
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
        }
        .cancel {
          background: rgba(1, 84, 163, 0);
          border: solid 1px rgb(195, 195, 195);
          border-radius: 4px;
          color: rgb(77, 77, 77);
          width: 58px;
          height: 28px;
          cursor: pointer;
          &:hover {
            border: solid 1px #409eff;
            color: #409eff;
          }
        }
        .pass_btn {
          background: rgb(1, 84, 163);
          border-radius: 4px;
          color: #ffffff;
          float: right;
          cursor: pointer;
        }
      }
    }
    ::-webkit-input-placeholder {
      color: rgb(190, 190, 190);
    }
    :-moz-placeholder {
      color: rgb(190, 190, 190);
    }
    ::-moz-placeholder {
      color: rgb(190, 190, 190);
    }
    :-ms-input-placeholder {
      color: rgb(190, 190, 190);
    }
    .edit_msg {
      color: rgb(230, 33, 41);
      font-size: 13px;
    }
  }
}
</style>
