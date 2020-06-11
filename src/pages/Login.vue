<template>
  <div class="min">
    <div>
      <div class="login">
        <h3 class="login_title">系统登录</h3>
        <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="user" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="pass" autocomplete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { API_login } from "@/api/apis";
export default {
  data() {
    return {
      user: "",
      pass: "",
      isquire: true
    };
  },
  methods: {
    login() {
      // this.$router.push("/Index/home");
      // console.log(this.user, this.pass);
      //如果为false，打印操作太频繁，返回，不发请求
      if (this.isquire == false) {
        console.log("您操作太频繁");
        return;
      }
      //将isquire设为false
      this.isquire = false;
      //发请求
      API_login(this.user, this.pass).then(res => {
        
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
          localStorage.token=res.data.token
          localStorage.user=this.user
          setTimeout(() => {
            this.$router.push("/Index/home");
          }, 1500);
          localStorage.setItem("userId",res.data.id);
          localStorage.setItem("role",res.data.role)//存储登录用户的权限
        } else {
          this.$message.error("账户名或密码错误");
        }
        console.log(res.data.code);
        console.log(res)
      });
      //3秒之后再将isquire设为true
      setTimeout(() => {
        this.isquire = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less">
.min {
  width: 100%;
  height: 710px;
  background-color: #2d3a4b;
}
.login {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_title {
  color: #fff;
  margin-left: 50%;
}
.btn {
  width: 100%;
}
</style>