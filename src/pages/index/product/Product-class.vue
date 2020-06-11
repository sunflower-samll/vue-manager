<template>
  <div class="product_box">
    <template>
      <div class="productTop_box">
        <span>商品分类</span>

        <!-- 添加分类 -->
        <el-button type="primary" class="btn" @click="dialogFormVisible = true">添加分类</el-button>

        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="form">
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch
                @change="ischange"
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addcate">确 定</el-button>
          </div>
        </el-dialog>
        <!-- <el-button class="btn" type="primary">添加分类</el-button> -->
      </div>
      <!-- 分类表格 -->
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.cateName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <template>
              <!-- 添加分类 -->
              <el-button
                size="mini"
                @click="openEdit(scope.row.id,scope.row.cateName,scope.row.state)"
              >编辑</el-button>

              <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
                <el-form>
                  <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="product_name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form>
                  <el-form-item label="分类状态" :label-width="formLabelWidth">
                    <el-switch
                      @change="ischange"
                      v-model="product_state"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editcate">确 定</el-button>
                </div>
              </el-dialog>

              <!-- <el-button size="mini">编辑</el-button> -->
              <el-button size="mini" type="danger" @click="product(scope.row.id)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
//商品分类获取
import { API_productClass } from "@/api/apis";
//商品删除
import { API_productDel } from "@/api/apis";
//添加分类
import { API_addcate } from "@/api/apis";
//修改分类
import { API_editcate } from "@/api/apis";
export default {
  data() {
    return {
      value: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // istrue:true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      tableData: [], //商品分类数据
      total: 0, //总条数,
      id: 0, //id
      product_name: "", //商品名称
      product_state: "" //商品状态
    };
  },
  created() {
    this.productClassChange(this.currentPage, this.pageSize);
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //当前页页数发生变化时的接口调用
    handleCurrentChange: function(currentPage) {
      this.productClassChange(currentPage, this.pageSize);
    },
    //访问商品分类接口
    productClassChange(pageNum, pageSize) {
      API_productClass(pageNum, pageSize).then(res => {
        var resultData = res.data.data;
        for (let i = 0; i < resultData.length; i++) {
          if (resultData[i].state == 0) {
            resultData[i].state = false;
          } else {
            resultData[i].state = true;
          }
        }
        this.total = res.data.total; //总条数
        this.tableData = resultData; //商品分类得到的数据数组
      });
    },
    //删除接口
    product(id) {
      this.id;
      API_productDel(id).then(res => {
        console.log(res);
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.productClassChange(this.currentPage, this.pageSize);
      });
    },
    //添加分类接口
    addcate() {
      API_addcate(this.form.name, JSON.stringify(this.value)).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.form.name = "";
          this.$message({
            message: "商品添加成功",
            type: "success"
          });
          this.productClassChange(this.currentPage, this.pageSize);
        }
      });
    },
    ischange(bool) {
      this.value = bool;
      console.log(this.value);
    },
    //修改分类
    openEdit(id, name, state) {
      this.id = id;
      this.product_name = name;
      this.product_state = state;
      this.dialogFormVisible = true;
      console.log(id, name, state);
    },
    //修改类名
    editcate() {
      API_editcate(this.id, this.product_name, this.product_state).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "修改类名成功",
            type: "success"
          });
          this.productClassChange(this.currentPage, this.pageSize);
        }
          this.dialogFormVisible = false;
      });
    }

    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // }
  }
};
</script>

<style lang="less" scoped>
.product_box {
  padding: 10px;
  background-color: #fff;
  .productTop_box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .btn {
      margin-bottom: 5px;
      width: 90px;
      height: 40px;
    }
    span {
      margin-top: 5px;
    }
  }
}
</style>