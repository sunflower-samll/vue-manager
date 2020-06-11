<template>
  <div class="account_box">
    <div class="account_top">
      <p>账号列表</p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" width="120" prop="account"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button  @click="edit(scope.row)">编辑</el-button>
        <el-button
          type="danger"
          @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="scopReow.account" autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="用户组" :label-width="formLabelWidth">
      <el-select v-model="scopReow.userGroup" placeholder="请选择用户组">
        <el-option label="高级管理员" value="高级管理员"></el-option>
        <el-option label="普通管理员" value="普通管理员"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="accountEdit()">确 定</el-button>
  </div>
</el-dialog>

    <!-- 分页 -->
    <div style="margin-top:20px" class="block">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination><!-- currentPage 改变时触发的事件-->
    </div>

    <div class="account_bottom">
      <el-button type="danger" @click="accountListChange">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection">取消选择</el-button>
    </div>
  </div>
</template>

<script>
//引入接口文件
import { API_accountList } from "@/api/apis";
import { API_accountDel  } from "@/api/apis";
import { API_accountEdit  } from "@/api/apis";
import {API_accountBatchDel} from "@/api/apis"
export default {
  data() {
    return {
      tableData: [],//数据
      currentPage: 1,//当前页
      pageSize: 2,//每页条数
      total: 0,//总条数
      id:0,
      scopReow:{},//编辑数据
      arr:[],
      // dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  created() {
    this.handleUserList();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //当选项发生变化时,监听事件
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      // console.log(val)
      //批量删除id追加进数组
      let arr=[]
      for(let i=0;i<val.length;i++){
        // console.log(val[i].id)
        arr.push(val[i].id)
      }
      // console.log(arr)
      this.arr=arr

    },
    //当前页页数发生变化时的接口调用
    handleCurrentChange: function(currentPage) {
      API_accountList(currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(element => {
          // console.log(element.orderTime)
          element.ctime=new Date(element.ctime).toJSON().substr(0, 19).replace("T", " ")
        });
      });
    },
    //初始化调用接口
    handleUserList() {
      API_accountList(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        //时间转换格式
        this.tableData.forEach(element => {
          element.ctime=new Date(element.ctime).toJSON().substr(0, 19).replace("T", " ")
        });
      });
    },
    //删除接口
    del(id){
      console.log(id)
      API_accountDel(id).then(res=>{
          console.log(this.handleUserList)
          this.handleUserList()
        console.log(res)
        console.log("删除成功")
          this.$message({
          message: '删除成功',
          type: 'success'
        });
      })
    },
    //编辑按钮
    edit(scopReow){
      this.dialogFormVisible =true
      // console.log(scopReow)
      this.scopReow=scopReow
    },
    //编辑确认编辑接口
    accountEdit(){
      // console.log(this.scopReow)
      // console.log(this.scopReow.id,this.scopReow.account,this.scopReow.userGroup)
      API_accountEdit(this.scopReow.id,this.scopReow.account,this.scopReow.userGroup).then(res=>{
        console.log(res)
         this.dialogFormVisible =false
      })
    },
    //批量删除
    accountListChange(){
      // console.log(this.arr)
      let arr=JSON.stringify(this.arr)
      // console.log(arr)
      API_accountBatchDel(arr).then(res=>{
        console.log(res)
        this.handleUserList()
         this.$message({
          message: '删除成功',
          type: 'success'
        });
      })
    }
  },
  handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
  },
  handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
  }
};
</script>

<style lang="less" scoped>
.account_box {
  background-color: #fff;
  .account_top {
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .account_bottom {
    margin-top: 20px;
  }
}
</style>