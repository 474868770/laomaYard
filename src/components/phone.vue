<template>
  <div>
    <div :class="{'class-b':isB}" style="z-index:50">
      <van-row>
        <van-col span="1">
          <div class="changfangti"></div>
        </van-col>
        <van-col span="23">
          <div class="biaoti">通讯录</div>
        </van-col>
      </van-row>
      <form action="/" style="z-index:1000">
        <search
          @on-change="onSearch"
          @on-cancel="onCancel"
          v-model="value"
          show-action
          placeholder="请输入宝宝或家长姓名搜索"
          shape="round"
          @on-focus="onFocus"
          @on-blur="onBlur"
          style="z-index:1000"
        />
      </form>
    </div>
    <x-dialog
      v-model="show"
      mask-z-index="500"
      :dialog-style="{'max-width': '100%', width: '100%', height: '90%', 'background-color': 'transparent'}"
    >
      <div v-for="(item,index) in list" :key="index">
        <van-cell
          :title="item.name+'('+item.baby_name+'的'+item.res_name+')'"
          :value="item.phone"
          style="z-index:1000"
          @click="shouPbone"
        />
      </div>
    </x-dialog>
    <!-- <div v-for="(item,index) in list" :key="index">
      <div>{{item.baby_name}}</div>
    </div>-->
    <div style="top:100px" :index-list="indexList">
      <van-index-bar :sticky="false">
        <van-index-anchor index="A" v-if="this.lista.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in lista"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="B" v-if="this.listb.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listb"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="C" v-if="this.listc.length !== 0" :sticky="false" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listc"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="D" v-if="this.listd.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listd"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="E" v-if="this.liste.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in liste"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="F" v-if="this.listf.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listf"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="G" v-if="this.listg.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listg"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="H" v-if="this.listh.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listh"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="I" v-if="this.listi.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listi"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="J" v-if="this.listj.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listj"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="K" v-if="this.listk.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listk"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="L" v-if="this.listl.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listl"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="M" v-if="this.listm.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listm"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="N" v-if="this.listn.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listn"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="O" v-if="this.listo.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listo"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="P" v-if="this.listp.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listp"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="Q" v-if="this.listq.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listq"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="R" v-if="this.listr.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listr"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="S" v-if="this.lists.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in lists"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="T" v-if="this.listt.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listt"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="U" v-if="this.listu.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listu"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="V" v-if="this.listv.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listv"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="W" v-if="this.listw.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listw"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="X" v-if="this.listx.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listx"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="Y" v-if="this.listy.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listy"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
        <van-index-anchor index="Z" v-if="this.listz.length !== 0" />
        <van-cell
          :title="item.name"
          icon="user-o"
          :label="item.baby_name+'的'+item.res_name"
          v-for="(item,index) in listz"
          :key="index"
        >
          <a :href="'tel:'+item.phone">{{item.phone}}</a>
        </van-cell>
      </van-index-bar>
      <loading :show="showloading"></loading>
    </div>
  </div>
</template>

<script>
import request from "../util/request";
import { Search, Loading, XDialog, XButton, Group, XSwitch } from "vux";

export default {
  components: {
    Search,
    Loading,
    XDialog,
    XButton,
    Group,
    XSwitch
  },

  data() {
    return {
      list: [],
      list1: [],
      lista: [],
      listb: [],
      listc: [],
      listd: [],
      liste: [],
      listf: [],
      listg: [],
      listh: [],
      listi: [],
      listj: [],
      listk: [],
      listl: [],
      listm: [],
      listn: [],
      listo: [],
      listp: [],
      listq: [],
      listr: [],
      lists: [],
      listt: [],
      listu: [],
      listv: [],
      listw: [],
      listk: [],
      listy: [],
      listx: [],
      listz: [],
      value: "",
      show: false,
      showloading: false,
      isA: false,
      isB: false,
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },

  computed: {
    reorder: function() {
      return this.list.sort(function(x, y) {
        return x["name"].localeCompare(y["name"]);
      });
      console.log(list);
    }
  },

  methods: {
    shouPbone() {
      console.log("搜索点击", 1);
    },

    onSearch(val) {
      console.log("on-change", val);
      var arr = [];
      console.log(this.list1);
      if (val == "") {
        this.list = [];
      } else {
        for (var i = 0; i < this.list1.length; i++) {
          if (
            this.list1[i].name.search(val) != -1 ||
            this.list1[i].baby_name.search(val) != -1
          ) {
            arr.push(this.list1[i]);
          }
        }
        console.log(arr);
        this.list = arr;
      }
    },

    onFocus() {
      this.show = true;
    },

    onBlur() {},

    onCancel() {
      this.show = false;
    },

    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      if (scrollTop != 0) {
        this.isB = true;
        this.isA = true;
      } else {
        this.isB = false;
      }
    }
  },

  beforeDestroy() {
    // //清空url信息
    // if (this.$getQueryString("openid") !== null) {
    //   window.location.href = "http://mayard.tddata.net/dist/#/phone";
    // }
        this.$RemoveCookie("yemian");
  },

  mounted() {
    //清空url信息
    //监听页面滚动
    window.addEventListener("scroll", this.scrollToTop);
    this.showloading = true;

    //判断是否为会员，不是跳转我的页面
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "is_member"
      }
    }).then(res => {
      if (res.status !== "success") {
        this.$router.push({ name: "wode" });
      }
    });

    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_member"
      }
    }).then(res => {
      var list = [];
      list = res.data;
      console.log(list);
      var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split("");
      var result = [];
      var lista = [];
      var listb = [];
      var listc = [];
      var listd = [];
      var liste = [];
      var listf = [];
      var listg = [];
      var listh = [];
      var listi = [];
      var listj = [];
      var listk = [];
      var listl = [];
      var listm = [];
      var listn = [];
      var listo = [];
      var listp = [];
      var listq = [];
      var listr = [];
      var lists = [];
      var listt = [];
      var listu = [];
      var listv = [];
      var listw = [];
      var listx = [];
      var listy = [];
      var listz = [];
      var pinyin = require("pinyin");
      for (var j = 0; j < list.length; j++) {
        var ccu = list[j].name.substr(0, 1);
        var paixu = pinyin(ccu, {
          style: pinyin.STYLE_FIRST_LETTER
        });
        result.push({
          zimu: paixu.toString(),
          baby_name: list[j].baby_name,
          name: list[j].name,
          res_name: list[j].res_name,
          phone: list[j].phone
        });
        // for (var i = 0; i < letters.length; i++) {
        //   if ((letters[i] = paixu)) {
        //     result.push({
        //       zimu: i,
        //       baby_name:list[j]
        //     });
        //   }
        // }
      }
      this.list1 = result;
      var map = [];
      var dest = [];

      for (var i = 0; i < result.length; i++) {
        var ai = result[i];
        if (!map[ai.phone]) {
          dest.push({
            phone: ai.phone,
            zimu: ai.zimu,
            name: ai.name,
            baby_name: ai.baby_name,
            res_name: ai.res_name
          });
          map[ai.phone] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.phone == ai.phone) {
              dj.baby_name = (dj.baby_name + "和" + ai.baby_name).toString();
              break;
            }
          }
        }
      }
      console.log(dest);
      result = dest;
      //a
      for (let i in result) {
        if (result[i].zimu == "a") {
          lista.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      console.log(lista);
      this.lista = lista;

      console.log("验证a的数据", lista.length);
      //b
      for (let i in result) {
        if (result[i].zimu == "b") {
          listb.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      console.log("验证B的数据", listb);
      this.listb = listb;
      //c
      for (let i in result) {
        if (result[i].zimu == "c") {
          listc.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      console.log("验证c的数据", listc);
      this.listc = listc;
      console.log("验证c后的数据", result);
      //d
      for (let i in result) {
        if (result[i].zimu == "d") {
          listd.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      console.log(listd);
      this.listd = listd;

      //e
      for (let i in result) {
        if (result[i].zimu === "e") {
          liste.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.liste = liste;
      console.log("验证e的数据", liste);
      //f
      for (let i in result) {
        if (result[i].zimu == "f") {
          listf.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listf = listf;

      //g
      for (let i in result) {
        if (result[i].zimu == "g") {
          listg.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listg = listg;

      //h
      for (let i in result) {
        if (result[i].zimu == "h") {
          listh.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listh = listh;

      //i
      for (let i in result) {
        if (result[i].zimu == "i") {
          listi.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }

      //j
      for (let i in result) {
        if (result[i].zimu == "j") {
          listj.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listj = listj;

      //k
      for (let i in result) {
        if (result[i].zimu == "k") {
          listk.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listk = listk;

      //l
      for (let i in result) {
        if (result[i].zimu == "l") {
          listl.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listl = listl;

      //m
      for (let i in result) {
        if (result[i].zimu == "m") {
          listm.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listm = listm;

      //n
      for (let i in result) {
        if (result[i].zimu == "n") {
          listn.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listn = listn;

      //o
      for (let i in result) {
        if (result[i].zimu == "o") {
          listo.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listo = listo;

      //p
      for (let i in result) {
        if (result[i].zimu == "p") {
          listp.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listp = listp;

      //q
      for (let i in result) {
        if (result[i].zimu == "q") {
          listq.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listq = listq;

      //r
      for (let i in result) {
        if (result[i].zimu == "r") {
          listr.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listr = listr;

      //s
      for (let i in result) {
        if (result[i].zimu == "s") {
          lists.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.lists = lists;
      //t
      for (let i in result) {
        if (result[i].zimu == "t") {
          listt.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listt = listt;

      //u
      for (let i in result) {
        if (result[i].zimu == "u") {
          listu.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listu = listu;

      //v
      for (let i in result) {
        if (result[i].zimu == "v") {
          listv.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listv = listv;

      //w
      for (let i in result) {
        if (result[i].zimu == "w") {
          listw.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listw = listw;

      //x
      for (let i in result) {
        if (result[i].zimu == "x") {
          listx.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listx = listx;

      //y
      for (let i in result) {
        if (result[i].zimu == "y") {
          listy.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listy = listy;

      //z
      for (let i in result) {
        if (result[i].zimu == "z") {
          listz.push({
            zimu: result[i].zimu,
            baby_name: result[i].baby_name,
            name: result[i].name,
            res_name: result[i].res_name,
            phone: result[i].phone
          });
        }
      }
      this.listz = listz;
      //   const data = pinyin("中心", { style: pinyin.STYLE_FIRST_LETTER });
      //   console.log(data);
      this.showloading = false;
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
.kapian {
  margin: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
}
.kapianziti {
  font-size: 14px;
  margin: 5px;
}
.touxiang {
  text-align: center;
  vertical-align: middle;
}
.class-b {
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: #ffffff;
}
.class-a {
  height: 64px !important;
}
</style>