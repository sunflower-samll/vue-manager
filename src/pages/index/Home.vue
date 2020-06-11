<template>
  <div>
    <div class="top_box">
      <div class="top_icon1">
        <p>
          <img :src="Home_img.icon1" alt />
        </p>
        <div>
          <p>总订单</p>
          <p>{{totalOrder}}</p>
        </div>
      </div>
      <div class="top_icon1">
        <p>
          <img :src="Home_img.icon2" alt />
        </p>
        <div>
          <p>总销售额</p>
          <p>{{totalAmount}}</p>
        </div>
      </div>
      <div class="top_icon1">
        <p>
          <img :src="Home_img.icon3" alt />
        </p>

        <div>
          <p>今日订单数</p>
          <p>{{todayOrder}}</p>
        </div>
      </div>
      <div class="top_icon1">
        <p>
          <img :src="Home_img.icon4" alt />
        </p>
        <div>
          <p>今日销售额</p>
          <p>{{totayAmount}}</p>
        </div>
      </div>
    </div>
    <div id="myecharts" style="height:500px;width:100%"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import { API_totaldata } from "@/api/apis"; //首页报表
export default {
  data() {
    return {
      todayOrder: 0, //今日订单
      totalAmount: 0, //总销售额
      totalOrder: 0, //总订单
      totayAmount: 0, //今日销售额
      Home_img: {
        icon1: require("../../assets/imgs/首页图标1.png"),
        icon2: require("../../assets/imgs/首页图标2.png"),
        icon3: require("../../assets/imgs/首页图标3.png"),
        icon4: require("../../assets/imgs/首页图标4.png")
      }
    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("myecharts")); //初始化DOM容器
    myecharts.showLoading()//开启加载中动画特效
    setTimeout(() => {
      API_totaldata().then(res => {
        console.log(res);
        let {
          xData,
          amountData,
          orderData,
          todayOrder,
          totalAmount,
          totalOrder,
          totayAmount
        } = res.data; //解构
        this.todayOrder = todayOrder;
        this.totalAmount = totalAmount + "￥";
        this.totalOrder = totalOrder;
        this.totayAmount = totayAmount + "￥";
        var option = {
          title: {
            text: "数据统计"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["金额", "订单"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "金额",
              type: "line",
              stack: "总量",
              data: amountData
            },
            {
              name: "订单",
              type: "line",
              stack: "总量",
              data: orderData
            }
          ]
        };
        myecharts.setOption(option); //配置表格对象
        myecharts.hideLoading()//关闭loading加载echarts
      });
    },3000);
  }
};
</script>

<style lang="less" scoped>
.top_box {
  display: flex;
  justify-content: space-around;
  .top_icon1 {
    width: 300px;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    line-height: 25px;
    div > :first-child {
      color: #ccc;
      margin-top: 10px;
    }
  }
}
</style>