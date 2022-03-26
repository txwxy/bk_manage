<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="nover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">admin</p>
            <p class="acess">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-02-24</span></p>
          <p>上次登录地点：<span>南京</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <!-- v-for循环对象的时候有三个参数，val,key,idex(索引)
                         v-for循环数组的时候有两个参数：val(item),index,
                         prop属性对应对象中的键名即可填入数据，用label属性来定义表格的列名
                     -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="(item, index) in countData"
          :key="index"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height:280px" ref="echarts"></div> -->
        <echart style="height:280px" :chartData="echartData.order" :isAxisChart="true"/>
        
      </el-card> 
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height:200px" ref="userEcharts"></div> -->
          <echart style="height:240px" :chartData="echartData.user" :isAxisChart="true"/>
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height:200px" ref="videoEcharts"></div> -->
          <echart style="height:240px" :chartData="echartData.video" :isAxisChart="false"/>
        </el-card>
      </div>
    </el-col> 
  </el-row>
</template>
<script>
import "../../assets/scss/home.scss";
import {getData} from "../../../api/data.js"
import * as echarts from 'echarts'
import Echart from '../../components/ECharts.vue'

export default {
  name: "home",
  components: {
      Echart
  },
  data() { 
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "手机",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 2345,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 2345,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
      echartData: {
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          xData:[],
          series:[]
        }
      }
    };
  },
  mounted() {
    getData().then(res=>{
      const{code,data}=res//解构赋值
      console.log(res)
      if(code==20000){
        this.tableData=data.tableData
        const order=data.orderData;
        const keyArray=Object.keys(order.data[0]);//获取对象的key值，里面全是key数组
        const series=[]
        const xData=order.date
        //foreach 箭头函数匿名函数function(item,index,input)
        //foreach没有返回值
        //map有返回值可以return，不改变原来的数组
        keyArray.forEach(key=>{
          series.push({
            name: key,
            data: order.data.map(item=>item[key]),
            type: 'line'
          })
        })
        this.echartData.order.xData=xData
        this.echartData.order.series=series
        
        this.echartData.user.xData=data.userData.map(item=>item.date)
        this.echartData.user.series=[
            {
              name:'新增用户',
              data: data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data: data.userData.map(item=>item.active),
              type:'bar'
            }
          ]
        this.echartData.video.series=[
            {
              data: data.videoData,
              type:'pie'
            }
          ]
    
      }
      console.log(res)
    })
  },
};
</script>
