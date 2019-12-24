<template>
  <div>
    <van-cell title="姓名" icon="user-o" :value="this.name" @click="xiuGai()" is-link />
    <van-cell title="电话" icon="phone-o" :value="this.phone" is-link />
    <van-cell title="身高" icon="upgrade" :value="this.height" @click="xiuGai2()" is-link />
    <br />
    <van-button type="primary" size="large" @click="clearCookie()">退出</van-button>
    <confirm
      v-model="show"
      show-input
      :title="('修改您的姓名')"
      @on-cancel="onCancel()"
      @on-confirm="onConfirm"
    ></confirm>
    <confirm
      v-model="show2"
      show-input
      :title="('修改您的身高')"
      @on-cancel="onCancel()"
      @on-confirm="onConfirm2"
    ></confirm>
  </div>
</template>

<script>
import {
  GroupTitle,
  Group,
  Cell,
  Confirm,
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
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import request from "../util/request";
import { get } from "http";

export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    Confirm,
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
      name: "",
      phone: "",
      height: "",
      show: false,
      show2: false
    };
  },

  methods: {
    clearCookie() {
      // 用户退出
      request({
        url: "http://api.growbb.net:3010/api/user/code",
        method: "post",
        data: {
          method: "logout"
        }
      }).then(res => {
        this.$RemoveCookie("access_token");
        this.$RemoveCookie("yemian");
        this.$RemoveCookie("openid");
        location.reload();
      });
    },
    xiuGai() {
      this.show = true;
    },
    xiuGai2() {
      this.show2 = true;
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(value) {
      console.log(value);
      //查询用户自己的信息
      request({
        url: "http://api.growbb.net:3010/api/user/data",
        method: "post",
        data: {
          method: "user",
          name: value
        }
      }).then(res => {
        //修改成功
        MessageBox({
          title: "提示",
          message: "修改成功",
          confirmButtonText: "完成"
        }).then(res => {
          location.reload();
        });
      });
    },

    onConfirm2(value) {
      console.log(value);
      //查询用户自己的信息
      request({
        url: "http://api.growbb.net:3010/api/user/data",
        method: "post",
        data: {
          method: "user",
          name: this.name,
          height: value
        }
      }).then(res => {
        //修改成功
        MessageBox({
          title: "提示",
          message: "修改成功",
          confirmButtonText: "完成"
        }).then(res => {
          location.reload();
        });
      });
    }
  },

  mounted() {
    //查询用户自己的信息
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_user"
      }
    }).then(res => {
      this.name = res.data[0].name;
      this.phone = res.data[0].mobile;
      this.height = res.data[0].height;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>