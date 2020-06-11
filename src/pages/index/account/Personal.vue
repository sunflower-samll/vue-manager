<template>
  <el-card class="box-card">
    <p>管理员信息</p>
    <el-divider></el-divider>
    <p>
      <span>管理员ID：</span>
      <span>{{personalArr.id}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      <span>账号：</span>
      <span>{{personalArr.account}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      <span>用户组：</span>
      <span>{{personalArr.userGroup}}</span>
    </p>
    <el-divider></el-divider>
    <p>
      <span>创建时间：</span>
      <span>{{personalArr.ctime}}</span>
    </p>
    <el-divider></el-divider>
    <p class="end">
      <span>管理员头像：</span>
      <el-upload
        action=" http://127.0.0.1:5000/users/avatar_upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :data="id"
        :on-success="success"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="personalArr.imgUrl" alt />
      </el-dialog>
      <!-- <img class="personal_img" :src="personalArr.imgUrl" alt /> -->
    </p>
  </el-card>
</template>

<script>
import { API_Personal } from "@/api/apis";
export default {
  data() {
    return {
      personalArr: [],
      id: { id: localStorage.getItem("userId") }, //存Id连接data，data上传就额外附带id参数
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    //个人信息页面
    API_Personal(localStorage.getItem("userId")).then(res => {
      console.log(res);
      // console.log(res.data.accountInfo)
      this.personalArr = res.data.accountInfo;
      console.log(this.personalArr);
      console.log(this.personalArr.imgUrl);
    });
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    // window.location.reload()

    },
    success(){
    window.location.reload()

    }
  }
};
</script>

<style lang="less" scoped>
.personal_img {
  width: 100px;
  height: 100px;
}
</style>