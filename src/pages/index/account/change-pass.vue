<template>
  <div class="account_add">
    <div class="account_top">修改密码</div>
    <div class="account_form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkPassword">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_checkPassword } from "@/api/apis";
import { API_updatePassword } from "@/api/apis";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "", //原密码
        checkPass: "", //确认密码
        newPass: "" //新密码
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //检查密码密码
    checkPassword() {
      // console.log(this.ruleForm.pass)
      // console.log(localStorage.getItem("userId"))
      API_checkPassword(
        this.ruleForm.pass,
        localStorage.getItem("userId")
      ).then(res => {
        if (res.data.code === 0) {
          console.log(this.ruleForm.newPass, localStorage.getItem("userId"));
          //修改密码
          API_updatePassword(
            this.ruleForm.newPass,
            localStorage.getItem("userId")
          ).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
                message: res.data.msg,
                type: "error"
              });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.account_add {
  background-color: #fff;
  padding: 20px;
  .account_form {
    width: 320px;
    margin-top: 20px;
  }
  .account_top {
    height: 30px;
    line-height: 18px;
    border-bottom: 1px solid #ccc;
  }
}
</style>