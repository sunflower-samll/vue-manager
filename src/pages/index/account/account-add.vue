<template>
  <div class="account_add">
    <div class="account_top">添加账号</div>
    <div class="account_form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <!-- 

             class="avatar-uploader"======样式
            action=====请求地址
            :show-file-list="false"====图片是否展示
            :http-request="uploadImg"====请求事件
            list-type="picture-card"=====框框样式
            :on-preview="handlePictureCardPreview"======点击文件列表中已上传的文件时的钩子
           -->

        <!-- <el-form-item> -->
          <el-button type="primary" @click="account_add">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_accountAdd } from "@/api/apis";
// import { API_uploadAvatar } from "@/api/apis";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogImageUrl: '',
        dialogVisible: false,
      rules: {
        region: [{ required: true, message: "请选择用户组", trigger: "change" }]
      }
    };
  },
  methods: {
    // //头像上传功能代码
    // //fileObj：文件对象
    // uploadImg(fileObj) {
    //   console.log(fileObj)
    //   //创建对象来包装文件
    //   let formData = new FormData();
    //   // console.log(formData)//{}
    //   formData.set("file", fileObj.file);
    //   //头像上传接口调用
    //   API_uploadAvatar(formData).then(res => {
    //     console.log(res.data.imgUrl)
    //   });
    // },
    //账号添加
    account_add() {
      API_accountAdd(
        this.ruleForm.name,
        this.ruleForm.pass,
        this.ruleForm.region
      ).then(res => {
        if (res.data.code == 0) {
          console.log("账号添加成功");
          // this.ruleForm = "";
          (this.ruleForm.name = ""),
            (this.ruleForm.pass = ""),
            (this.ruleForm.region = "");
        } else {
          console.log("账号添加失败");
        }
        // console.log(res.data)
      });
      // console.log(this.ruleForm.name, this.ruleForm.pass, this.ruleForm.region);
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