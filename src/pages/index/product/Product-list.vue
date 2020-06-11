<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img :src="props.row.imgUrl" alt />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <!-- 图片渲染 -->
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="product_del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 编辑框 -->
      <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option :value="item.cateName" v-for="(item) in categories" :key="item.cateName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片地址" :label-width="formLabelWidth">
            <el-upload action="http://127.0.0.1:5000/goods/goods_img_upload" 
            list-type="picture-card"
            :on-success="success">
              <img :src="form.imgUrl" />
            </el-upload>
            <el-dialog>
              <img width="100%" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.goodsDesc" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="product_edit">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>


<script>
//获取删除列表       删除商品
import {
  API_product_list,
  API_product_del,
  API_product_cate,
  API_product_edit
} from "@/api/apis";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 4, //每页条数
      total: 4, //总条数
      tableData: [], //商品列表数组
      imgs: "http://127.0.0.1:5000/upload/imgs/goods_img/", //服务器地址
      dialogFormVisible: false, //弹出编辑框后的确认按钮
      form: {},//储存每个数据对象
      formLabelWidth: "120px",
      categories: []//储存商品分类
    };
  },
  created() {
    this.product_list(this.currentPage, this.pageSize); //调用商品列表渲染，传入当前页、每页条数的实参
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除商品
    product_del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_product_del(id).then(res => {
          console.log(res);
        });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        //删除成功刷新页面
        this.product_list(this.currentPage, this.pageSize);
      });
    },
    //当页发生变化时的调用商品列表函数，并传入当前页，每页条数
    handleCurrentChange: function(currentPage) {
      this.product_list(currentPage, this.pageSize);
    },
    //商品列表
    product_list(pageNum, pageSize) {
      API_product_list(pageNum, pageSize).then(res => {
        // console.log(res)
        // console.log(res.data.total)
        this.total = res.data.total; //总条数
        this.tableData = res.data.data; //总数据
        for (var item of this.tableData) {
          item.imgUrl = this.imgs + item.imgUrl; //拼接图片路径
        }
      });
    },
    //打开编辑框
    edit(form) {
      this.dialogFormVisible = true;
      this.form = form;//将传入进来的对象赋给data数据里的form
      //查询所有商品分类名称
      API_product_cate().then(res => {
        this.categories = res.data.categories;
      });
    },
    //编辑商品
    product_edit() {
      this.dialogFormVisible = false;
      API_product_edit(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl.substring(this.form.imgUrl.lastIndexOf("/")+1),//将传进去的地址截取/前部分
        this.form.goodsDesc,
        this.form.id
      ).then(res => {
        if(res.data.code === 0){
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
        }else{
          this.$message({
            type: "error",
            message: "编辑失败!"
          });
        }
        //删除成功刷新页面
        this.product_list(this.currentPage, this.pageSize);
      });
    },
    //上传图片成功后将图片地址赋给form对象里的图片地址
    success(res){
      console.log(res.imgUrl)
      this.form.imgUrl=res.imgUrl
    },
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>