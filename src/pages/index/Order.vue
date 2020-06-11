<template>
  <div class="Order-box">
    <el-form ref="form" label-width="80px" size="mini" class="input-box">
      <span>
        <el-form-item label="订单号">
          <el-input v-model="orderNo" placeholder="订单号" clearable></el-input>
        </el-form-item>
      </span>
      <span>
        <el-form-item label="收货人">
          <el-input v-model="consignee" placeholder="收货人" clearable></el-input>
        </el-form-item>
      </span>
      <span>
        <el-form-item label="手机号">
          <el-input v-model="phone" placeholder="手机号" clearable></el-input>
        </el-form-item>
      </span>
      <span>
        <el-form-item label="订单状态">
          <el-select v-model="orderState" placeholder="订单状态">
            <el-option value="已受理"></el-option>
            <el-option value="派送中"></el-option>
            <el-option value="已完成"></el-option>
          </el-select>
        </el-form-item>
      </span>
    </el-form>

    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="time"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button class="btn" type="primary" @click="inquire">查询</el-button>
    </div>
    <div class="Order_deteils">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="edit(scope.row,scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看框 -->
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.orderTime"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.consignee"></el-input>
          </el-form-item>
          <el-form-item label="配送地址" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="用户备注" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input autocomplete="off" :value="orderDetails.orderState"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑框 -->
      <el-dialog title="编辑订单信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.orderNo" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="form.orderTime" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="form.deliveryTime" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="form.orderState" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//       查询订单详情     编辑订单
import { API_order_list, API_order_edit } from "@/api/apis";
export default {
  data() {
    return {
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //手机号
      currentPage: 1, //当前页
      pageSize: 4, //每页条数
      total: 0, //总条数
      tableData: [], //订单列表数据
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderState: [], //订单状态
      time: [], //查询时间
      dialogFormVisible: false,
      formLabelWidth: "120px",
      orderDetails: {}, //订单详情
      form: {
        orderNo: "", //订单号
        orderTime: "", //下单时间
        phone: "", //联系电话
        consignee: "", //收货人
        deliverAddress: "", //送货地址
        deliveryTime: "", //送达时间
        remarks: "", //备注
        orderAmount: "", //订单金额
        orderState: "" //订单状态
      },
      id: 0
    };
  },
  created() {
    this.order_list();
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.orderDetails = row;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前页页数发生变化时的接口调用
    handleCurrentChange: function(currentPage) {
      API_order_list(currentPage, this.pageSize).then(res=>{
           this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(element => {
          // console.log(element.orderTime)
          element.orderTime=new Date(element.orderTime).toJSON().substr(0, 19).replace("T", " ")
          element.deliveryTime=new Date(element.deliveryTime).toJSON().substr(0, 19).replace("T", " ")

        });
      });
    },
    //获取商品订单列表
    order_list() {
      //获取订单列表
      let time = JSON.stringify(this.time);
      API_order_list(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        time
      ).then(res => {
        console.log(res);
        this.tableData = res.data.data; //订单列表数据
        this.tableData.forEach(element => {
          // console.log(element.orderTime)
          element.orderTime=new Date(element.orderTime).toJSON().substr(0, 19).replace("T", " ")
          element.deliveryTime=new Date(element.deliveryTime).toJSON().substr(0, 19).replace("T", " ")
        });
        this.total = res.data.total; //订单总条数
        // console.log(this.tableData);
      });
    },
    //查询订单
    inquire() {
      // console.log(this.orderNo,this.consignee,this.phone,this.orderState,this.time)
      // API_order_list(this.currentPage, this.pageSize,this.orderNo,this.consignee,this.phone,this.orderState,this.time).then(res => {
      //   console.log(res);
      // });
      this.order_list();
    },
    //编辑按钮
    edit(row, id) {
      this.dialogFormVisible = true;
      // console.log(row)
      this.form = row;
      // console.log(id)
      this.id = id;
    },
    //编辑接口
    confirmEdit() {
      this.dialogFormVisible = false;
      API_order_edit(
        this.id,
        this.form.orderNo,
        this.form.orderTime,
        this.form.phone,
        this.form.consignee,
        this.form.deliverAddress,
        this.form.deliveryTime,
        this.form.remarks,
        this.form.orderAmount,
        this.form.orderState
      ).then(res=>{
        console.log(res)
        if(res.data.code==0){
           this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'success'
        });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Order-box {
  background-color: #fff;
  padding-top: 20px;
  height: 600px;
  .input-box {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    margin-left: 20px;
    width: 70px;
    height: 40px;
  }
  .Order_deteils {
    margin-top: 30px;
  }
}
</style>