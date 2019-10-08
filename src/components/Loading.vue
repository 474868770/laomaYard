<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <load-more :tip="('正在加载')"></load-more>
  </div>
</template>

<script>
import { LoadMore } from "vux";
import request from "../util/request";
import { get } from "http";

export default {
  components: {
    LoadMore
  },

  methods: {
    loadMe() {}
  },

  mounted() {},

  created() {
    //记录跳转页面
    if (this.$getQueryString("yemian") !== null) {
      this.$setCookie("yemian", this.$getQueryString("yemian"));
    }

    //判断链接参数为空跳转微信
    if (
      this.$getQueryString("openid") == "" ||
      this.$getQueryString("openid") == "null" ||
      this.$getQueryString("openid") == null
    ) {
      //跳转微信链接获取openid
      window.location.href = unescape(
        "http://wx.wifixy.com/wxlogin?appid=wxd09214d54b1dd6c1&scope=2&url=" +
          encodeURIComponent(window.location)
      );
    } else {
      //将openid保存至cookie里
      this.$setCookie("openid", this.$getQueryString("openid"));
      this.$setCookie("headimgurl", this.$getQueryString("headimgurl"));
      this.$setCookie("nickname", this.$getQueryString("nickname"));
      this.$setCookie("code", this.$getQueryString("code"));

      //判断登录状态
      if (this.$getQueryString("is_login") == "1") {
        request({
          url: "http://api.growbb.net:3010/api/user/code",
          method: "post",
          data: {
            method: "auth",
            openid: this.$getCookie("openid"),
            code: this.$getCookie("code")
          }
        }).then(res => {
          this.$setCookie("access_token", res.access_token);
          if (this.$getCookie("yemian") == "1") {
            this.$router.push({
              name: "phone",
              query: {}
            });
          } else {
            //查询用户信息判断娃娃是否只有一个
            request({
              url: "http://api.growbb.net:3010/api/user/data",
              method: "post",
              data: {
                method: "query_baby"
              }
            }).then(res => {
              var list = [];
              console.log(res.data[1]);
              if (res.data[1] == undefined) {
                this.$setCookie("baby_id", res.data[0].baby_id);
                this.$router.push({
                  name: "jilu",
                  query: {}
                });
              } else {
                this.$router.push({
                  name: "wode",
                  query: {}
                });
              }
            });
          }
        });
      } else {
        //获取关注状态
        request({
          url:
            "http://wx.wifixy.com/get_gz_user?appid=wxd09214d54b1dd6c1&openid=" +
            this.$getCookie("openid"),
          method: "get",
          data: {}
        }).then(res => {
          console.log(res);
          if (res.subscribe == "1") {
            if (this.$getCookie("access_token") == "") {
              this.$router.push({
                name: "login",
                query: {}
              });
            } else if (this.$getCookie("yemian") == "1") {
              this.$router.push({
                name: "phone",
                query: {}
              });
            } else {
              this.$router.push({
                name: "wode",
                query: {}
              });
            }
          } else {
            this.$router.push({
              name: "guanzhu",
              query: {}
            });
          }
        });
      }
    }
  }
};
</script>