<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="小名" v-model="name"></x-input>
      <popup-picker
        title="性别"
        placeholder="女"
        :data="listsex"
        v-model="sex"
        value-text-align="left"
      ></popup-picker>
      <datetime title="生&emsp;&emsp;&nbsp;日" v-model="time1" value-text-align="left"></datetime>
      <popup-picker title="期望身高" :data="list" v-model="shengao" value-text-align="left"></popup-picker>
      <x-address
        title="现居住地"
        v-model="address"
        raw-value
        @on-shadow-change="onShadowChange"
        :list="addressData"
        value-text-align="left"
      ></x-address>
    </group>
    <br />
    <group>
      <group-title slot="title">
        你与宝宝的关系（※通过你的身高判断遗传因素对宝宝的影响）
        <span style="float:right;"></span>
      </group-title>
      <popup-picker title="你与宝宝的关系" :data="arrRes_name" v-model="guanxi" value-text-align="right"></popup-picker>
      <popup-picker title="你的身高" :data="list" v-model="yoursg" value-text-align="right"></popup-picker>
    </group>
    <br />
    <x-button
      :gradients="['#16A085', '#1ABC9C']"
      type="primary"
      @click.native="handleNext(2,3,4)"
    >下一步</x-button>
  </div>
</template>

<script>
import {
  GroupTitle,
  Group,
  Cell,
  XInput,
  Selector,
  PopupPicker,
  Datetime,
  XNumber,
  ChinaAddressV4Data,
  XAddress,
  XTextarea,
  XSwitch,
  Actionsheet,
  XButton
} from "vux";
import { mapMutations } from "vuex";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import request from "../util/request";
import { get } from "http";

export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    XAddress,
    Datetime,
    XNumber,
    XTextarea,
    XSwitch,
    Actionsheet,
    XButton,
    ChinaAddressV4Data
  },

  data() {
    return {
      addressData: ChinaAddressV4Data,
      name: "",
      address: ["四川省", "成都市", "成华区"],
      address1: [],
      time1: "2013-06-01",
      shengao: ["175"],
      yoursg: ["160"],
      list: [
        [
          "140",
          "141",
          "142",
          "143",
          "144",
          "145",
          "146",
          "147",
          "148",
          "149",
          "150",
          "151",
          "152",
          "153",
          "154",
          "155",
          "156",
          "157",
          "158",
          "159",
          "160",
          "161",
          "162",
          "163",
          "164",
          "165",
          "166",
          "167",
          "168",
          "169",
          "170",
          "171",
          "172",
          "173",
          "174",
          "175",
          "176",
          "177",
          "178",
          "179",
          "180",
          "181",
          "182",
          "183",
          "184",
          "185",
          "186",
          "187",
          "188",
          "189"
        ]
      ],
      arrRes_name: [[]],
      guanxi: ["妈妈"],
      listsex: [["男", "女"]],
      sex: ["男"],
      numberValue: 0,
      inputVal: "",
      vcode: "",
      checkCode: {
        text: "获取验证码",
        TIME: 60,
        disabled: false
      },
      nickname: "",
      babyguanxi: ""
    };
  },

  methods: {
    onShadowChange(ids, names) {
      console.log(ids, names);
      this.address1 = names;
    },
    //获取验证码按钮
    handleDo() {
      const vm = this;
      this.checkCode.text = this.checkCode.TIME;
      this.checkCode.disabled = true;
      this.countDown();
      this.$axios
        .post("http://api.growbb.net:3010/api/user/code", {
          method: "get",
          params: "",
          user: vm.inputVal
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //验证码倒计时
    countDown() {
      console.log(this.checkCode.text);
      var _this = this;
      if (this.checkCode.text == 0) {
        this.checkCode.text = "获取验证码";
        this.checkCode.disabled = false;
        return false;
      }
      var time = setTimeout(function() {
        _this.checkCode.text--;
        _this.countDown();
      }, 1000);
    },

    //下一步按钮
    handleNext(x, y, z) {
      const vm = this;
      var iphone = this.inputVal;
      var yanzhengname = this.name;
      var nickname = this.$getCookie("nickname");
      var guanxiid = 0;
      console.log(nickname);

      for (let i in this.babyguanxi) {
        if (this.babyguanxi[i].res_name == this.guanxi[0]) {
          guanxiid = this.babyguanxi[i].res_id;
        }
      }

      //微信昵称解码
      nickname = unescape(nickname);
      console.log(guanxiid);

      var sexid = 0;
      if (
        guanxiid == "102" ||
        guanxiid == "104" ||
        guanxiid == "106" ||
        guanxiid == "108" ||
        guanxiid == "113" ||
        guanxiid == "114"
      ) {
        sexid = 1;
      }
      console.log(sexid);

      if (yanzhengname == "") {
        alert("小名不能为空");
      } else {
        //上传user信息
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "user",
            name: nickname,
            sex: sexid,
            height: vm.yoursg.join(),
            mobile: vm.inputVal,
            code: vm.vcode
          }
        });

        //上传baby信息
        request({
          url: "http://api.growbb.net:3010/api/user/data",
          method: "post",
          data: {
            method: "baby",
            baby_name: vm.name,
            baby_birthday: vm.time1,
            baby_sex: vm.sex.join(","),
            mother_expected_height: vm.shengao.join(","),
            address: vm.address1.join(","),
            res_id: guanxiid
          }
        }).then(res => {
          var yanzheng = res.data.status;
          if ((yanzheng = "success")) {
            Toast({
              message: "创建宝宝成功",
              iconClass: "icon icon-success"
            });
            this.$router.push({ name: "wode" });
          }
        });
      }
    }
  },

  mounted() {
    // //获取openid
    // var openid = this.$getQueryString("openid");
    // var token = this.$getQueryString("token");
    // var headimgurl = this.$getQueryString("headimgurl");
    // var nickname = this.$getQueryString("nickname");
    // var cookieOpenid = this.$getCookie("openid");

    // console.log(cookieOpenid);

    // if (openid == null) {
    //   window.location.href =
    //     "http://wx.wifixy.com/wxlogin?appid=wxa110a7049ad89923&scope=2&url=http%3a%2f%2fgrowbb.tddata.net%2fwx%2fdist%2f%23%2f";
    // } else {
    //   this.$setCookie("openid", this.$getQueryString("openid"));
    //   this.$setCookie("access_token", this.$getQueryString("token"));
    //   this.$setCookie("headimgurl", this.$getQueryString("headimgurl"));
    //   this.$setCookie("nickname", this.$getQueryString("nickname"));
    // }

    // // 获取baby 信息
    //   request({
    //     url: "http://api.growbb.net:3009/api/user/data",
    //     method: "post",
    //     data: {
    //       method: "query_baby"
    //     }
    //   }).then(res => {
    //     var yanzheng = res.data;
    //     console.log(yanzheng);
    //     if (yanzheng == "") {
    //       console.log(yanzheng);
    //     } else {
    //       this.$router.push({
    //         name: "jilu"
    //       });
    //     }
    //   });

    //查询baby 关系表
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "res_type"
      }
    }).then(res => {
      console.log(res.data);
      this.babyguanxi = res.data;
      for (let i in res.data) {
        this.arrRes_name[0].push(res.data[i].res_name);
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btn {
  width: 25%;
  background-color: red;
  height: 20px;
}
</style>
