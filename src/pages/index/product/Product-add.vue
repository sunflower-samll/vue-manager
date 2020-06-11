<template>
  <div class="Product_box">
    <p style="font-size:15px;margin-bottom:10px">商品添加</p>
    <hr />
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" class="product_name">
        <el-input class="product_input" placeholder="商品名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择商品分类">
          <el-option :value="item.cateName" v-for="(item) in categories" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <template>
          <el-input-number v-model="num" :min="1" :max="100"></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="success"
          :show-file-list='flag'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="product_say" class="product_say" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="product_add">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//1.商品分类      2.商品添加
import {API_product_cate,API_product_add} from "@/api/apis"
export default {
  data() {
    return {
      flag:true,//默认图片显示
      dialogImageUrl: "",
      dialogVisible: false,
      categories:"",//商品所有分类名称
      form: {
        name: "",//商品名称
        region: "",//商品分类
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      product_img:"",//商品图片
      num: 1,//商品价格
        product_say:""

    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //商品图片上传
    success(res){
      console.log(res.imgUrl)
      this.product_img=res.imgUrl
    },
    //商品添加
    product_add(){
      API_product_add(this.form.name,this.form.region,this.num,this.product_img,this.product_say).then(res=>{
        console.log(res)
        if(res.data.code==0){
          this.$message({
          message: '商品添加成功',
          type: 'success'
          });
          //清空列表
          this.form.name="",
          this.form.region="",
          this.num="",
          this.product_say="",
          this.flag=false
        }else{
           this.$message.error('商品添加失败');
        }
      })
    }
  },
  created () {
    //查询所有商品分类名称
      API_product_cate().then(res=>{
        // console.log(res.data.categories)
        // console.log(res11111.data.categories)
        // console.log(res.data.categories)
        // console.log(res.data.categories)
        this.categories=res.data.categories
      })
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
}
</style>