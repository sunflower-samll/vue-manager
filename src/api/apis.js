import axios from 'axios'//引入axios

axios.defaults.baseURL = "http://localhost:5000"//配置端口+ip

//1.登录接口
//account    用户名
// password   密码
export const API_login = (account, password) => axios.post("/users/checkLogin", { account, password })

//2.添加账号
export const API_accountAdd = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })
//3.获取账号列表
export const API_accountList = (currentPage, pageSize) => axios.get("/users/list", {params :{ currentPage, pageSize} })
//4.账号列表删除
export const API_accountDel = (id) => axios.get("users/del", {params :{ id} })
//5.编辑接口
export const API_accountEdit = (id,account,userGroup) => axios.post("/users/edit", {id,account,userGroup} )
//6this.$route.fullPath批量删除
export const API_accountBatchDel = (ids) => axios.get("/users/batchdel", {params :{ids}} )
//7.检查密码是否正确
export const API_checkPassword = (oldPwd,id) => axios.get("/users/checkoldpwd", {params :{oldPwd,id}} )
//8.修改密码
export const API_updatePassword = (newPwd,id) => axios.post("/users/editpwd", {newPwd,id})
//9.获取账号（个人中心）
export const API_Personal = (id) => axios.get("/users/accountinfo", {params :{ id} })


// //10.账户头像上传
// export const API_uploadAvatar= (file) => axios.post("/users/avatar_upload", file,{  headers: {
//     "Content-type": "multipart/form-data"
//   }})
//11.验证token是否过期
export const API_token = (token) => axios.get("/users/checktoken", {params :{token}} )
//12.添加分类
export const API_addcate = (cateName,state) => axios.post("/goods/addcate", {cateName,state} )
//13.获取分类
export const API_productClass = (currentPage,pageSize) => axios.get("/goods/catelist", {params :{currentPage,pageSize}} )
//14.删除分类
export const API_productDel = (id) => axios.get("/goods/delcate", {params :{id}} )
//15.修改分类
export const API_editcate = (id,cateName,state) => axios.post("/goods/editcate", {id,cateName,state} )
//16.商品分类,查询所有分类名称
export const API_product_cate = () => axios.get("/goods/categories")
//18.添加商品
export const API_product_add = (name,category,price,imgUrl,goodsDesc) => axios.post("/goods/add", {name,category,price,imgUrl,goodsDesc} )
//19.获取商品列表
export const API_product_list = (currentPage,pageSize) => axios.get("/goods/list", {params :{currentPage,pageSize}} )
//20.删除商品接口
export const API_product_del = (id) => axios.get("/goods/del", {params :{id}} )
//21.修改商品
export const API_product_edit = (name,category,price,imgUrl,goodsDesc,id) => axios.post("/goods/edit", {name,category,price,imgUrl,goodsDesc,id} )
//22.获取订单列表
export const API_order_list = (currentPage,pageSize,orderNo,consignee,phone,orderState,date) => axios.get("/order/list", {params :{currentPage,pageSize,orderNo,consignee,phone,orderState,date}} )
//25.删除订单
export const API_order_edit = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState) => axios.post("/order/edit", {id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState} )
//26.获取店铺详情
export const API_shop_info= () => axios.get("/shop/info")

//28.店铺内容修改
export const API_shop_edit = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics) => 
    axios.post("/shop/edit", {id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics} )


//29.首页报表
export const API_totaldata= () => axios.get("/order/totaldata")
//30.订单报表
export const API_ordertotal= (date) => axios.get("/order/ordertotal", {params :{date}})

