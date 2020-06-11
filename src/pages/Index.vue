<template>
  <el-container class="index_page">
    <el-aside width="200px" class="left_nav">
      <p class="nav_icon">
        <img class="pot" :src="img.pot" alt />
        <span>外卖商家中心</span>
      </p>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        unique-opened
      >
        <div v-for="item in newTreelist" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child.index">
              <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="rightTop_nav">
        <p class="right_navTitle">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="item in titleSwitch" :key="item" :to="{ path: '/' }">{{item}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/' }">{{item}}</el-breadcrumb-item> -->
          </el-breadcrumb>
        </p>
        <p class="right_navImg">
          <span class="username" v-html="username"></span>
          <router-link to="/Index/Personal">
            <img class="baby_img" :src="personalImg" alt />
          </router-link>
        </p>
      </el-header>
      <el-main class="rightBottom_nav">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { API_token, API_Personal } from "@/api/apis";
export default {
  data() {
    return {
      img: {
        pot: require("../assets/imgs/锅 美食_wps图片.png")
        // house: require("../assets/imgs/房子_wps图片.png")
        // baby: require("../assets/imgs/timg.jpg")
      },
      personalImg: "", //导航栏头像图片
      role: "",
      //treelist动态数据,左边导航栏
      /* 
      index：要跳转的hash
      icls:图标
      title:导航标题名
      */
      treelist: [
        {
          index: "/Index/home",
          icls: "el-icon-s-home",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/Index/Order",
          icls: "el-icon-tickets",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "3",
          icls: "el-icon-goods",
          title: "商品管理",
          children: [
            { index: "/Index/Product-list", title: "商品列表" },
            { index: "/Index/Product-add", title: "商品添加" },
            { index: "/Index/Product-class", title: "商品分类" }
          ],
          role: ["super"]
        },
        {
          index: "/Index/Shop",
          icls: "el-icon-s-shop",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "5",
          icls: "el-icon-data-analysis",
          title: "账号管理",
          children: [
            { index: "/Index/account-list", title: "账号列表" },
            { index: "/Index/account-add", title: "添加账号" },
            { index: "/Index/change-pass", title: "修改密码" }
          ],
          role: ["super"]
        },
        {
          index: "6",
          icls: "el-icon-reading",
          title: "销售统计",
          children: [
            { index: "/Index/commodity-stati", title: "商品统计" },
            { index: "/Index/Order-stati", title: "订单统计" }
          ],
          role: ["super"]
        }
      ],
      titleSwitch: ["首页", "账号管理"],
      defaultActive: "",
      username: "小貂蝉"
    };
  },
  methods: {
    changeHashTitle(hash) {
      let arr = [];
      switch (hash) {
        case "/Index/home":
          arr = ["首页"];
          break;
        case "/Index/Order":
          arr = ["订单管理"];
          break;
        case "/Index/Product-list":
          arr = ["商品管理", "商品列表"];
          break;
        case "/Index/Product-add":
          arr = ["商品管理", "商品添加"];
          break;
        case "/Index/Product-class":
          arr = ["商品管理", "商品分类"];
          break;
        case "/Index/Shop":
          arr = [" 店铺管理"];
          break;
        case "/Index/account-list":
          arr = ["账号管理", "账号列表"];
          break;
        case "/Index/account-add":
          arr = ["账号管理", " 添加账号"];
          break;
        case "/Index/change-pass":
          arr = ["账号管理", " 修改密码"];
          break;
        case "/Index/commodity-stati":
          arr = ["销售统计", " 商品统计"];
          break;
        case "/Index/Order-stati":
          arr = ["销售统计", " 订单统计"];
          break;
        case "/Index/Personal":
          arr = ["首页", "账号管理", "添加账号"];
      }
      this.titleSwitch = arr;
    }
  },
  computed: {
    //筛选权限字段
    newTreelist() {
      console.log(this.role);
      return this.treelist.filter(i => i.role.includes(this.role));
    }
  },
  /* 
  hash值
    首页： /Index/home
    订单管理：/Index/Order
    商品管理 商品列表：/Index/Product-list
    商品管理 商品添加：/Index/Product-add
    商品管理 商品分类：/Index/Product-class
    店铺管理：/Index/Shop
    账号管理 账号列表：/Index/account-list
    账号管理 添加账号：/Index/account-add
    账号管理 修改密码：/Index/change-pass
    销售统计 商品统计：/Index/commodity-stati
    销售统计 订单统计：/Index/Order-stati
  
  */
  //监听hash值变化
  watch: {
    $route: {
      handler: val => {
        // console.log(val.path)
        window._that.changeHashTitle(val.path);
      },
      deep: true
    }
  },
  created() {
    // console.log(this.$route.path)
    let hash = this.$route.path;
    this.defaultActive = hash;
    this.changeHashTitle(hash);
    window._that = this;
    this.role = localStorage.getItem("role");

    /* token jie */
    let token = localStorage.token;
    let user = localStorage.user;

    //获取个人中心
    API_Personal(localStorage.getItem("userId")).then(res => {
      this.personalImg = res.data.accountInfo.imgUrl;
    });
    //token
    API_token(token).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        this.username = "欢迎您 " + user;
      } else {
        this.username = "<a href='#/'>账户过期，请重新登录</a>";
      }
    });
  }
};
</script>

<style lang="less" scoped>
.index_page {
  height: 100%;
  .left_nav {
    height: 100%;
    background-color: #2d3a4b;
  }
  .rightTop_nav {
    width: 100%;
    height: 100px;
    background-color: #fff;
  }
  .rightBottom_nav {
    height: 100%;
    width: 100%;
    background-color: #f0f2f5;
  }
  .el-menu {
    border: none;
  }
  .nav_icon {
    display: flex;
    justify-content: space-around;
    .pot {
      width: 80px;
      height: 80px;
    }
    span {
      color: #fff;
      margin-top: 30px;
    }
  }
}
.rightTop_nav {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  .right_navImg {
    display: flex;
    justify-content: space-between;
    .username {
      margin-right: 40px;
      margin-top: 6px;
    }
    .baby_img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 50px;
    }
  }
  .right_navTitle {
    margin-top: 22px;
  }
}
</style>