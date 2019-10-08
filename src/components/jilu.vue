<template>
  <div class="ex">
    <van-nav-bar title="日常记录" left-text="返回首页" left-arrow @click-left="onClickLeft" />
    <div class="zhezhao">
      <div class="beijing"></div>
    </div>
    <img slot="icon" src="../../static/images/image_1.png" width="40" height="40" class="touxiang" />
    <div style="margin:-85px 10px 40px 80px;font-size:22px;color:#fff">{{baby_name}}</div>
    <van-tabs v-model="active" animated title-active-color="#1ab9c9" color="#1ab9c9">
      <van-tab title="日常记录">
        <div class="dangqian">
          <div style="margin:10px;color:#1ab9c9">当前水平</div>
          <x-input
            title="身高（cm）"
            v-model="shengao"
            placeholder="请输入身高"
            :min="2"
            :max="6"
            text-align="right"
          ></x-input>
          <x-input
            title="体重（kg）"
            v-model="tizhong"
            placeholder="请输入体重"
            :min="2"
            :max="6"
            text-align="right"
          ></x-input>
          <datetime
            title="记录时间"
            v-model="time1"
            placeholder="请选择记录时间"
            value-text-align="right"
            format="YYYY-MM-DD HH:mm"
          ></datetime>
        </div>
        <!-- <group :title="value[0] + ' ' + value[1] + ':' + value[2]">
      <datetime-range
        :title="$t('Choose')"
        start-date="2019-05-16"
        end-date="2025-12-31"
        :format="$t('daterange-format')"
        v-model="time"
        @on-change="onChange"
      ></datetime-range>
        </group>-->
        <x-button
          :gradients="['#1ab9c9', '#1ab9c9']"
          type="primary"
          @click.native="shangchuan(2,3,4)"
          style="border-radius: 20px;margin:20px 10px 20px 10px;width:95%"
        >新增</x-button>
        <van-row>
          <van-col span="4">
            <div align="center">
              <div class="kongxinyuan"></div>
              <div class="xian"></div>
            </div>
          </van-col>
          <van-col span="16">
            <div style="font-size:16px;color:#515151">{{jilutime}}</div>
            <div class="kapian">
              <van-row>
                <van-col span="12">
                  <div class="shuju">{{hAverage}}</div>
                </van-col>
                <van-col span="12">
                  <div class="shuju">{{wAverage}}</div>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <div align="center">
              <div class="kongxinyuan"></div>
              <div class="xian"></div>
            </div>
          </van-col>
          <van-col span="16">
            <div style="font-size:16px;color:#515151">{{jilutime2}}</div>
            <div class="kapian">
              <van-row>
                <van-col span="12">
                  <div class="shuju">{{hAverage2}}</div>
                </van-col>
                <van-col span="12">
                  <div class="shuju">{{wAverage2}}</div>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <div align="center">
              <div class="kongxinyuan"></div>
              <div class="xian"></div>
            </div>
          </van-col>
          <van-col span="16">
            <div style="font-size:16px;color:#515151">{{jilutime3}}</div>
            <div class="kapian">
              <van-row>
                <van-col span="12">
                  <div class="shuju">{{hAverage3}}</div>
                </van-col>
                <van-col span="12">
                  <div class="shuju">{{wAverage3}}</div>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="成长曲线">
        <v-chart :data="data">
          <v-scale x :tick-count="5" :max="2020" />
          <v-line shape="smooth" :colors="gradient" />
          <v-guide type="tag" :options="tag" />
          <v-area shape="smooth" :colors="gradient" />
        </v-chart>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Group,
  GroupTitle,
  XNumber,
  XButton,
  Timeline,
  TimelineItem,
  DatetimeRange,
  DatetimeView,
  Datetime,
  XInput,
  Alert,
  VChart,
  VGuide,
  VArea,
  VLine,
  VScale
} from "vux";
import { MessageBox } from "mint-ui";
import request from "../util/request";
import { userInfo } from "os";
import { Cell } from "mint-ui";

// Vue.component(Cell.name, Cell)

export default {
  components: {
    Group,
    GroupTitle,
    XNumber,
    XButton,
    Timeline,
    TimelineItem,
    DatetimeRange,
    DatetimeView,
    Datetime,
    XInput,
    Alert,
    VChart,
    VGuide,
    VArea,
    VLine,
    VScale
  },
  data() {
    return {
      active: 2,
      shengao: "",
      tizhong: "",
      count: 5,
      time: ["2017-01-15", "03", "05"],
      time1: "",
      hAverage: "",
      wAverage: "",
      myDate: "",
      baby_name: "",
      jilu_baby_id: "",
      jilutime: "",
      jilutime2: "",
      jilutime3: "",
      hAverage2: "",
      wAverage2: "",
      hAverage3: "",
      wAverage3: "",
      gradient: [[0, "#F2C587"], [0.5, "#ED7973"], [1, "#8659AF"]],
      tag: {
        position: [2017, 30.12],
        content: "30.12",
        direct: "tl",
        offsetY: -5,
        background: {
          fill: "#8659AF"
        },
        pointStyle: {
          fill: "#8659AF"
        }
      },
      data: [
        { year: 2000, age: 27.2 },
        { year: 2001, age: 27.5 },
        { year: 2002, age: 27.8 },
        { year: 2003, age: 28 },
        { year: 2004, age: 28.2 },
        { year: 2005, age: 28.4 },
        { year: 2006, age: 28.8 },
        { year: 2007, age: 28.8 },
        { year: 2008, age: 28.8 },
        { year: 2009, age: 28.8 },
        { year: 2010, age: 28.9 },
        { year: 2011, age: 29 },
        { year: 2012, age: 29.3 },
        { year: 2013, age: 29.4 },
        { year: 2014, age: 29.5 },
        { year: 2015, age: 29.7 },
        { year: 2016, age: 30 },
        { year: 2017, age: 30.12 }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "wode",
        query: {}
      });
    },

    shangchuan(x, y, z) {
      const vm = this;
      var jilushijian = this.time1;
      var jilushengao = this.shengao;
      var jilutizhong = this.tizhong;
      if (jilushijian == "") {
        alert("请选选择记录时间");
      } else if (jilushengao == "" && jilutizhong == "") {
        alert("请选选择记录身高或体重");
      } else if (jilutizhong == "") {
        //记录身高
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "growp_record",
            baby_id: vm.jilu_baby_id,
            // user_id: "18980801801",
            value_content: this.shengao,
            value_type_id: "100",
            // add_time:'2019-5-15',
            gauged_time: vm.time1
          }
        });

        //记录成功
        MessageBox({
          title: "提示",
          message: "记录成功",
          confirmButtonText: "完成"
        }).then(action => {
          location.reload();
        });
      } else if (jilushengao == "") {
        //记录体重
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "growp_record",
            baby_id: vm.jilu_baby_id,
            // user_id: "18980801801",
            value_content: this.tizhong,
            value_type_id: "101",
            // add_time:'2019-5-15',
            gauged_time: vm.time1
          }
        });
        //记录成功
        MessageBox({
          title: "提示",
          message: "记录成功",
          confirmButtonText: "完成"
        }).then(res => {
          location.reload();
        });
      } else {
        //记录身高
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "growp_record",
            baby_id: vm.jilu_baby_id,
            // user_id: "18980801801",
            value_content: this.shengao,
            value_type_id: "100",
            // add_time:'2019-5-15',
            gauged_time: vm.time1
          }
        });

        //记录体重
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "growp_record",
            baby_id: vm.jilu_baby_id,
            // user_id: "18980801801",
            value_content: this.tizhong,
            value_type_id: "101",
            // add_time:'2019-5-15',
            gauged_time: vm.time1
          }
        });

        //记录成功
        MessageBox({
          title: "提示",
          message: "记录成功",
          confirmButtonText: "完成"
        }).then(action => {
          location.reload();
        });
      }
    }
  },
  mounted() {
    const vm = this;
    var baby_id = this.$getCookie("baby_id");

    //获取身高记录信息统计图
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_growp_record",
        baby_id: baby_id,
        value_type_id: 100
      }
    }).then(res => {
      var list = [];
      for (let i in res.data) {
        list.push({
          gauged_time: res.data[i].gauged_time.substring(0, 16),
          value_content: res.data[i].value_content
        });
        this.data = list;
      }
    });

    //绑定baby id
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_baby",
        baby_id: baby_id
      }
    }).then(res => {
      vm.baby_name = res.data[0].baby_name;
      vm.jilu_baby_id = baby_id;

      //获取记录信息
      request({
        url: "http://api.growbb.net:3010/api/user/data",
        method: "post",
        data: {
          method: "query_growp_record",
          baby_id: baby_id
        }
      }).then(res => {
        console.log(res.data);
        //记录第一栏信息（时间，平均体重，平均身高）
        vm.time1 = res.data[0].gauged_time.substring(0, 16);
        console.log(vm.time1);

        let arrHeight = [];
        let arrWeight = [];
        let arrtime = [];
        for (let i in res.data) {
          arrtime.push(res.data[i].gauged_time.substring(0, 10));
        }

        let qcArrtime = new Set(arrtime);
        vm.jilutime = [...qcArrtime][0];
        vm.jilutime2 = [...qcArrtime][1];
        vm.jilutime3 = [...qcArrtime][2];

        console.log(vm.jilutime);

        for (let i in res.data) {
          if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime &&
            res.data[i].value_type_id == "100"
          ) {
            arrHeight.push(res.data[i].value_content);
            console.log(arrHeight);
          } else if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime &&
            res.data[i].value_type_id == "101"
          ) {
            arrWeight.push(res.data[i].value_content);
            console.log(arrWeight);
          }
          // switch (res.data[i].value_type_id) {
          //   case '100':
          //     arrHeight.push(res.data[i])
          //     break;

          //   default:
          //     break;
          // }
        }

        console.log(arrHeight, arrWeight, [...qcArrtime]);

        let hAverage = 0;
        let wAverage = 0;
        for (let i in arrHeight) {
          hAverage += arrHeight[i];
        }
        hAverage = hAverage / arrHeight.length;
        for (let i in arrWeight) {
          wAverage += arrWeight[i];
        }
        wAverage = wAverage / arrWeight.length;
        console.log(hAverage, wAverage);
        var xianshiHigh = parseFloat(hAverage);
        var xianshiWigh = parseFloat(wAverage);
        console.log(isNaN(hAverage), isNaN(wAverage));
        if (isNaN(hAverage) && isNaN(wAverage)) {
          this.hAverage = "身高：" + "未填写";
          this.wAverage = "体重：" + "未填写";
        } else if (isNaN(wAverage)) {
          this.hAverage = "身高：" + xianshiHigh.toFixed(2) + "cm";
        } else if (isNaN(hAverage)) {
          this.wAverage = "体重：" + xianshiWigh.toFixed(2) + "kg";
        } else {
          this.hAverage = "身高：" + xianshiHigh.toFixed(2) + "cm";
          this.wAverage = "体重：" + xianshiWigh.toFixed(2) + "kg";
        }

        //记录第二栏信息（身高平均，体重平均，时间）
        var arrHeight2 = [];
        var arrWeight2 = [];

        for (let i in res.data) {
          if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime2 &&
            res.data[i].value_type_id == "100"
          ) {
            arrHeight2.push(res.data[i].value_content);
            console.log(arrHeight2);
          } else if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime2 &&
            res.data[i].value_type_id == "101"
          ) {
            arrWeight2.push(res.data[i].value_content);
            console.log(arrWeight2);
          }
        }

        var hAverage2 = 0;
        var wAverage2 = 0;
        for (let i in arrHeight2) {
          hAverage2 += arrHeight2[i];
        }
        hAverage2 = hAverage2 / arrHeight2.length;
        for (let i in arrWeight2) {
          wAverage2 += arrWeight2[i];
        }
        wAverage2 = wAverage2 / arrWeight2.length;
        console.log(hAverage2, wAverage2);
        var xianshiHigh2 = parseFloat(hAverage2);
        var xianshiWigh2 = parseFloat(wAverage2);
        if (isNaN(hAverage2) && isNaN(wAverage2)) {
          this.hAverage2 = "身高：" + "未填写";
          this.wAverage2 = "体重：" + "未填写";
        } else if (isNaN(wAverage2)) {
          this.hAverage2 = "身高：" + xianshiHigh2.toFixed(2) + "cm";
        } else if (isNaN(hAverage2)) {
          this.wAverage2 = "体重：" + xianshiWigh2.toFixed(2) + "kg";
        } else {
          this.hAverage2 = "身高：" + xianshiHigh2.toFixed(2) + "cm";
          this.wAverage2 = "体重：" + xianshiWigh2.toFixed(2) + "kg";
        }

        //记录第三栏信息（身高平均，体重平均，时间）
        let arrHeight3 = [];
        let arrWeight3 = [];

        for (let i in res.data) {
          if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime3 &&
            res.data[i].value_type_id == "100"
          ) {
            arrHeight3.push(res.data[i].value_content);
            console.log(arrHeight3);
          } else if (
            res.data[i].gauged_time.substring(0, 10) == vm.jilutime3 &&
            res.data[i].value_type_id == "101"
          ) {
            arrWeight3.push(res.data[i].value_content);
            console.log(arrWeight3);
          }
        }

        var hAverage3 = 0;
        var wAverage3 = 0;
        for (let i in arrHeight3) {
          hAverage3 += arrHeight3[i];
        }
        hAverage3 = hAverage3 / arrHeight3.length;
        for (let i in arrWeight3) {
          wAverage3 += arrWeight3[i];
        }
        wAverage3 = wAverage3 / arrWeight3.length;
        var xianshiHigh3 = parseFloat(hAverage3);
        var xianshiWigh3 = parseFloat(wAverage3);
        if (isNaN(hAverage3) && isNaN(wAverage3)) {
          this.hAverage3 = "身高：" + "未填写";
          this.wAverage3 = "体重：" + "未填写";
        } else if (isNaN(wAverage3)) {
          this.hAverage3 = "身高：" + xianshiHigh3.toFixed(2) + "cm";
        } else if (isNaN(hAverage3)) {
          this.wAverage3 = "体重：" + xianshiWigh3.toFixed(2) + "kg";
        } else {
          this.hAverage3 = "身高：" + xianshiHigh3.toFixed(2) + "cm";
          this.wAverage3 = "体重：" + xianshiWigh3.toFixed(2) + "kg";
        }
      });
    });
  }
};
</script>

<style>
.ex {
  color: black;
}
.kongxinyuan {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #ffc107;
}
.xian {
  width: 0px;
  height: 90px;
  border-left: solid #bababa 1px;
}
.kapian {
  margin-top: 10px;
  height: 50px;
  width: 300px;
  border-radius: 5px;
  background-color: #ffffff;
}
.shuju {
  font-size: 14px;
  margin: 10px;
  color: #515151;
}
.van-row {
  margin-top: 10px;
}
.dangqian {
  background-color: #ffffff;
  margin: 10px;
  border-radius: 5px;
  padding-top: 5px;
}
.button {
  border-radius: 20px;
}
.beijing {
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-image: url(../../static/images/beijing.jpeg);
  height: 150px;
  -webkit-mask: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}
.zhezhao {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.touxiang {
  margin: -30px 10px 10px 10px;
  height: 60px;
  width: 60px;
}
</style>
