<template>
  <div>
    <div style="text-align:center;margin:10px">
      <img src="../../static/images/logo.png" style="max-width:30%" />
    </div>
    <group>
      <group-title slot="title">
        *必填
        <span style="float:right;"></span>
      </group-title>
      <x-input
        v-if="this.panduan != '1'"
        title="手机号码"
        name="mobile"
        v-model="inputVal"
        placeholder="请输入手机号码"
        keyboard="number"
        disabled
      ></x-input>
      <x-input
        v-if="this.panduan = '1'"
        title="手机号码"
        name="mobile"
        v-model="inputVal"
        placeholder="请输入手机号码"
        keyboard="number"
      ></x-input>
      <van-cell-group>
        <van-field
          label="短信验证码"
          v-model="vcode"
          placeholder="请输入短信验证码"
          placeholder-style-color="#rgb(196, 108, 108)"
          use-button-slot
          style="font-size:16px;placeholder-style-color:rgb(196, 108, 108)"
          v-focus="ture"
          type="text"
          ref="inp"
          autofocus
        >
          <van-button
            :disabled="checkCode.disabled"
            slot="button"
            size="small"
            type="primary"
            mini
            @click.native="handleDo"
            style="background-color:#077fd5"
          >{{checkCode.text}}</van-button>
        </van-field>
      </van-cell-group>
    </group>
    <br />
    <x-button
      :gradients="['#1D62F0', '#19D5FD']"
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
      inputVal: "",
      vcode: "",
      checkCode: {
        text: "获取验证码",
        TIME: 60,
        disabled: false
      },
      panduan: ""
    };
  },

  directives: {
    focus: {
      inserted: function(el, { value }) {
        console.log(el, { value });
        if (value) {
          el.focus();
        }
      }
    }
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
      if ((this.panduan = 1)) {
        this.$axios
          .post("http://api.growbb.net:3010/api/user/code", {
            method: "get",
            params: "",
            openid: this.$getCookie("openid")
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
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
      }
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
      var nickname = this.$getCookie("nickname");
      console.log(this.vcode);

      if (iphone == "") {
        alert("请填写电话号码");
      } else if (this.vcode == "") {
        alert("请填写验证码");
      } else if (this.panduan !== 1) {
        //openid登录获取access_token
        request({
          url: "http://api.growbb.net:3010/api/user/code",
          method: "post",
          data: {
            method: "auth",
            openid: this.$getCookie("openid"),
            code: this.vcode
          }
        }).then(res => {
          this.$setCookie("access_token", res.access_token);
          this.$router.push({ name: "phone" });
        });
      } else {
        //手机登录获取access_token
        request({
          url: "http://api.growbb.net:3010/api/user/code",
          method: "post",
          data: {
            method: "auth",
            user: iphone,
            code: this.vcode
          }
        }).then(res => {
          this.$setCookie("access_token", res.access_token);
          this.$router.push({ name: "phone" });
        });
      }
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.$refs.inp.focus();
    });
    var openid = this.$getCookie("openid");
    //查询用户是否绑定openid
    request({
      url: "http://api.growbb.net:3010/api/user/code",
      method: "post",
      data: {
        method: "query_byopenid",
        openid: openid
      }
    }).then(res => {
      if (res.status == "success") {
        this.inputVal = res.mobile;
        this.panduan = 1;
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

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(196, 108, 108) !important;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(196, 108, 108) !important;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(196, 108, 108) !important;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgb(196, 108, 108) !important;
}
</style>