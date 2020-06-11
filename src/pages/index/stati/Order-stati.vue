<template>
  <div>
    <div class="block">
      <span style="margin-right:20px">时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button type="primary" @click="inquire" style="margin-left:20px">查询</el-button>
    </div>
    <div id="myecharts" style="height:500px;width:100%"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import { API_ordertotal } from "@/api/apis";
export default {
  data() {
    return {
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
      date: [], //查询时间
      orderTime: [], //下单时间
      orderAmount: [], //订单金额
      newTime:["2020-06-04 17:30:09","2020-06-08 19:30:09"]/*  */
    };
  },
  methods: {
    inquire() {
      // console.log(this.date)
      var myecharts = echarts.init(document.getElementById("myecharts")); //初始化DOM容器
      API_ordertotal(JSON.stringify(this.date)).then(res => {
        // console.log(res)
        // console.log(res.data.data)
        let ordertotal = res.data.data;
        for (let i = 0; i < ordertotal.length; i++) {
          this.orderTime.push(new Date(ordertotal[i].orderTime).toJSON().substr(0,19).replace("T"," "));
          this.orderAmount.push(ordertotal[i].orderAmount);
          console.log(this.orderTime)
        }
        console.log(this.orderTime);
        console.log(this.orderAmount);
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ["订单金额", "降水量", "平均温度"]
          },
          xAxis: [
            {
              type: "category",
              data:this.orderTime, //下单时间
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "金额",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value} ￥"
              }
            },
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: this.orderAmount
            }
          ]
        };
        myecharts.setOption(option);
      });
    }
  },
  mounted() {
      var myecharts = echarts.init(document.getElementById("myecharts")); //初始化DOM容器
      API_ordertotal(JSON.stringify(this.newTime)).then(res => {
        // console.log(res)
        // console.log(res.data.data)
        let ordertotal = res.data.data;
        for (let i = 0; i < ordertotal.length; i++) {
          this.orderTime.push(new Date(ordertotal[i].orderTime).toJSON().substr(0,19).replace("T"," "));
          this.orderAmount.push(ordertotal[i].orderAmount);
          console.log(this.orderTime)
        }
        console.log(this.orderTime);
        console.log(this.orderAmount);
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ["订单金额", "降水量", "平均温度"]
          },
          xAxis: [
            {
              type: "category",
              data:this.orderTime, //下单时间
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "金额",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value} ￥"
              }
            },
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: this.orderAmount
            }
          ]
        };
        myecharts.setOption(option);
      });
    }
};
</script>

<style lang="less" scoped>
</style>