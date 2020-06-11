<template>
  <div class="Product_box">
    <div class="shopTop">
      <p style="font-size:15px;margin-bottom:10px">店铺管理</p>
      <el-button class="btn" type="primary" @click="shopEdit">保存</el-button>
    </div>
    <hr />
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="店铺名称" class="product_name">
        <el-input class="product_input" placeholder v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input class="product_say" v-model="form.bulletin" type="textarea" :rows="2" placeholder></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <div class="avatar-uploader">
          <div class="block">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="avatarSuccess"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" width="150" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="店铺图片">
        <!-- 店铺图片上传接口地址 -->
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="success"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费" class="product_name">
        <el-input class="product_input" placeholder v-model="form.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间" class="product_name">
        <el-input class="product_input" placeholder v-model="form.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述" class="product_name">
        <el-input class="product_input" placeholder v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分" class="product_name">
        <el-input class="product_input" placeholder v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item label="销量" class="product_name">
        <el-input class="product_input" placeholder v-model="form.sellCount"></el-input>
      </el-form-item>

      <el-form-item label="活动" class="product_name">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox label="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="营业时间" class="product_name">
        <template>
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//    店铺详情         修改店铺信息
import { API_shop_info, API_shop_edit } from "@/api/apis";
export default {
  data() {
    return {
      // checked: true,
      dialogImageUrl: "",
      dialogVisible: false,
      value: "修改",
      imgs: "http://127.0.0.1:5000/upload/shop/", //服务器地址
      form: {
        name: "", //店铺名
        bulletin: "", //店铺公告
        avatar: "", //店铺头像
        deliveryPrice: "", //配送费
        deliveryTime: "", //送达时间
        description: "", //描述
        score: "", //评分
        sellCount: "", //销量
        supports: "", //活动
        date: "", //营业时间
        minPrice: "" //起送价格
      },
      checkList: ["选中且禁用", "复选框 A"],
      num: 1,
      fileList: [], //存储图片路径
      pics:[],
    };
  },
  created() {
    //获取店铺详情
    this.shopInfo();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
        let index=file.url.lastIndexOf("/")
        let url=file.url.substr(index+1,file.url.length-1)
        this.pics.splice(this.pics.indexOf(url),1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //获取店铺详情
    shopInfo() {
      API_shop_info().then(res => {
        this.newImg=res.data.data.avatar
        this.form = res.data.data;
        //拼接后店铺头像
        this.form.avatar = this.imgs + this.form.avatar;
        // console.log(this.form)
        this.pics = res.data.data.pics;
        // this.pics.forEach(item => {
        //   let obj = {
        //     url: this.imgs + item
        //   };
        //   this.fileList.push(obj);
        // });
        this.fileList=this.pics.map(item=>{
          return {url: this.imgs + item}
        })
      });
    },
    // 商品图片上传图片成功后
    success(res) {
      console.log(res.imgUrl)
      this.pics.push(res.imgUrl);
      console.log(this.form.pics)
    },
    //店铺头像上传
    avatarSuccess(res, file) {
      this.newImg = res.imgUrl;
      console.log(this.imageUrl);
      this.form.avatar = URL.createObjectURL(file.raw);
    },
    //店铺修改
    shopEdit() {
      // console.log(this.form.supports);
      // console.log(this.form.date);
      console.log(this.form.pics);
      API_shop_edit(
        this.form.id, //店铺id
        this.form.name, //店铺名称
        this.form.bulletin, //店铺公告
        this.newImg, //店铺头像
        this.form.deliveryPrice, //起送价格
        this.form.deliveryTime, //送达时间
        this.form.description, //店铺描述
        this.form.score, //店铺好评率
        this.form.sellCount, //店铺销量
        JSON.stringify(this.form.supports), //活动支持
        JSON.stringify(this.form.date), //营业时间
        JSON.stringify(this.pics) //店铺图片
      ).then(res => {
        console.log(res);
        // console.log(this.pics)
        // console.log(this.imageUrl);
        // console.log(this.form.pics);
        //成功之后调用查询接口渲染
        this.shopInfo();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Product_box {
  background-color: #fff;
  padding: 10px;
  .product_name {
    margin-top: 20px;
    .product_input {
      width: 400px;
    }
  }
  .product_say {
    width: 400px;
  }
  .shopTop {
    display: flex;
    justify-content: space-between;
    .btn {
      margin-bottom: 5px;
      width: 70px;
      height: 40px;
    }
  }
  .shop_img {
    width: 150px;
    height: 150px;
    border-radius: 15px;
    border: 1px dashed #ccc;
  }
  .imgStyle {
    display: flex;
    justify-content: space-around;
  }
}
</style>