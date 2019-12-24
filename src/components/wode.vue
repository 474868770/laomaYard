<template>
  <div>
    <div
      style="height:180px;
    background: url(./static/images/5.png) no-repeat;
    background-size:100% 100%;padding-top:10px "
    >
      <div @click="myInfo()">
        <div class="touxiang1" align="center" style="height:40px">
          <div style="z-index:100;position:relative;margin-left:170px;margin-top:10px">
            <img
              slot="icon"
              width="45"
              height="45"
              style="display:block; border-radius:50px;"
              :src="touxiang"
            />
          </div>
          <div style="z-index:90;position:relative;margin-left:170px;top:-52px;">
            <img
              slot="icon"
              width="50"
              height="50"
              style="display:block;"
              src="../../static/images/4.png"
            />
          </div>
        </div>
        <van-row style="margin-left:20px">
          <van-col span="12">
            <div class="touxiang1" style="color:#FFF;float:right">{{this.nickname}}</div>
          </van-col>
          <van-col span="12">
            <van-tag type="danger" size="medium" round color="#f4c21d" style="float:left">院子会员</van-tag>
          </van-col>
        </van-row>
      </div>
      <img src="../../static/images/3.png" style="max-width:92%;margin:10px" />
      <van-row>
        <van-col span="12">
          <img
            src="../../static/images/2.png"
            style="max-width:90%;margin-left:10px"
            @click="addbaby"
          />
        </van-col>
        <van-col span="12">
          <img
            src="../../static/images/1.png"
            style="max-width:90%;margin-right:10px"
          />
        </van-col>
      </van-row>
      <!-- <grid
        :show-lr-borders="false"
        :show-vertical-dividers="false"
        style="border-radius:10px;text-align:center;margin:10px;"
      >
        <grid-item link="/HelloWorld" :label="('添加宝宝')">
          <img slot="icon" src="../../static/images/tianjia.png" />
        </grid-item>
        <div @click="showPopup">
          <grid-item :label="('院子打卡')">
            <img slot="icon" src="../../static/images/daka.png" />
          </grid-item>
        </div>
        <grid-item link :label="('输入邀请码')">
          <img slot="icon" src="../../static/images/yaoqing.png" />
        </grid-item>
      </grid>-->
    </div>
    <br />
    <van-row>
      <van-col span="1">
        <div class="changfangti"></div>
      </van-col>
      <van-col span="23">
        <div class="biaoti">我添加的宝宝</div>
      </van-col>
    </van-row>
    <div v-for="(item,index) in list" :key="index" @click="details(index)" class="kapian1">
      <div class="kapianziti" style="color:#515151">{{item.title}}</div>
      <div class="kapianziti" style="color:#bababa">{{item.desc}}</div>
      <div class="kapianziti" style="color:#bababa">期望身高：{{item.hight}}</div>
      <div class="kapianziti" style="color:#FE9200">点击记录身高</div>
    </div>
    <br />
    <van-popup v-model="show" round position="bottom" :style="{ height: '80%' }">
      <daka v-bind:mlist="this.list"></daka>
    </van-popup>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  Divider,
  Card,
  Grid,
  GridItem,
  GroupTitle,
  Group,
  XTextarea,
  XInput,
  Cell,
  CellBox,
  Panel,
  Radio,
  Search
} from "vux";
import request from "../util/request";
import daka from "./daka";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Card,
    Grid,
    GridItem,
    GroupTitle,
    Group,
    XTextarea,
    XInput,
    Cell,
    CellBox,
    Panel,
    Radio,
    Search,
    daka
  },

  data() {
    return {
      username: "",
      touxiang: "",
      radio001: ["China", "Japan"],
      nickname: "",
      list: [],
      show: false
    };
  },

  methods: {
    details(i) {
      console.log(this.list[i].title);
      this.$setCookie("baby_id", this.list[i].babyId);
      this.$router.push({ name: "jilu" });
    },

    myInfo() {
      this.$router.push({
        name: "myinfo"
      });
    },

    showPopup() {
      this.show = true;
    },

    addbaby() {
      this.$router.push({ name: "HelloWorld" });
    }
  },

  mounted() {
    this.$RemoveCookie("yemian");
    var touxiang = this.$getCookie("headimgurl");
    touxiang = unescape(touxiang);
    this.touxiang = touxiang;
    var openid = this.$getCookie("openid");
    var nickname = this.$getCookie("nickname");
    this.nickname = unescape(nickname);
    console.log(this.list);

    //查询用户是否绑定openid
    request({
      url: "http://api.growbb.net:3010/api/user/code",
      method: "post",
      data: {
        method: "query_byopenid",
        openid: openid
      }
    }).then(res => {
      if (res.status !== "success") {
        //绑定用户openid
        request({
          url: "http://api.growbb.net:3010/api/user/code",
          method: "post",
          data: {
            method: "bindwx",
            openid: this.$getCookie("openid")
          }
        }).then();
      }
    });

    //查询用户信息
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_baby"
      }
    }).then(res => {
      var list = [];
      for (let i in res.data) {
        list.push({
          title: res.data[i].baby_name,
          desc: res.data[i].baby_birthday,
          src: res.data[i].baby_sex,
          babyId: res.data[i].baby_id,
          hight: res.data[i].mother_expected_height
        });
      }
      console.log(list);
      var list2 = [];
      for (let i in list) {
        if (list[i].src == "男") {
          list2.push({
            title: list[i].title,
            src: "man",
            desc:
              "年龄:" +
              [
                new Date().getFullYear() - new Date(list[i].desc).getFullYear()
              ] +
              "岁",
            babyId: list[i].babyId,
            hight: list[i].hight
          });
        } else {
          list2.push({
            title: list[i].title,
            src: "woman",
            desc:
              "年龄:" +
              [
                new Date().getFullYear() - new Date(list[i].desc).getFullYear()
              ] +
              "岁",
            babyId: list[i].babyId,
            hight: list[i].hight
          });
        }
      }
      console.log(list2);
      this.list = list2;
    });
  }
};
</script>

<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
.changfangti {
  width: 5px;
  height: 25px;
  background-color: #5c90cb;
  border-radius: 5px;
  margin: 10px;
}
.biaoti {
  font-size: 16px;
  margin: 10px;
  color: #515151;
}
.kapian1 {
  margin: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
}
.kapianziti {
  font-size: 14px;
  margin: 5px;
}
.touxiang1 {
  text-align: center;
  vertical-align: middle;
}
</style>