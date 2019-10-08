// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import axios from 'axios'
import {
  AlertPlugin,
  ToastPlugin
} from 'vux'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import http from './util/http'
import vuex from 'vuex'
import check from './util/check'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(router)
Vue.prototype.$check = check;

//添加标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })

// const router = [{
//   path: '/index/:openid',
//   component: HelloWorld
// }]


// const router = new VueRouter({
//   routes
// })
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
Vue.use(Mint);
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$setCookie = function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//获取openid
Vue.config.productionTip = false
Vue.prototype.$getQueryString = function (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

Vue.config.productionTip = false
Vue.prototype.$getCookie = function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

//清除所有cookie
Vue.prototype.$clearAllCookie = function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  console.log("需要删除的cookie名字：" + keys);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + "=null; expire=" + date.toGMTString() + "; path=/";
  }
}

//用javascript删除某一个cookie的方法，该方法传入要删除cookie的名称
Vue.prototype.$RemoveCookie = function RemoveCookie(cookieName) {
  var cookies = document.cookie.split(";"); //将所有cookie键值对通过分号分割为数组

  //循环遍历所有cookie键值对
  for (var i = 0; i < cookies.length; i++) {
    //有些cookie键值对前面会莫名其妙产生一个空格，将空格去掉
    if (cookies[i].indexOf(" ") == 0) {
      cookies[i] = cookies[i].substring(1);
    }

    //比较每个cookie的名称，找到要删除的那个cookie键值对
    if (cookies[i].indexOf(cookieName) == 0) {
      var exp = new Date(); //获取客户端本地当前系统时间
      exp.setTime(exp.getTime() - 60 * 1000); //将exp设置为客户端本地时间1分钟以前，将exp赋值给cookie作为过期时间后，就表示该cookie已经过期了, 那么浏览器就会将其立刻删除掉

      document.cookie = cookies[i] + ";expires=" + exp.toUTCString(); //设置要删除的cookie的过期时间，即在该cookie的键值对后面再添加一个expires键值对，并将上面的exp赋给expires作为值(注意expires的值必须为UTC或者GMT时间，不能用本地时间），那么浏览器就会将该cookie立刻删除掉
      //注意document.cookie的用法很巧妙，在对其进行赋值的时候是设置单个cookie的信息，但是获取document.cookie的值的时候是返回所有cookie的信息

      break; //要删除的cookie已经在客户端被删除掉，跳出循环
    }
  }
}

//26个字母排序
Vue.prototype.$pySegSort = function pySegSort(arr) {
  if (!String.prototype.localeCompare) return null;
  var letters = "*abcdefghjklmnopqrstwxyz".split('');
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  var segs = [];
  var curr;
  letters.forEach(function (item, i) {
    curr = {
      letter: item,
      data: []
    };
    arr.forEach(function (item2) {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(item2) <= 0) && item2.localeCompare(zh[i]) == -1) {
        curr.data.push(item2);
      }
    });
    if (curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return a.localeCompare(b);
      });
    }
  });
  return segs;
}


Vue.prototype.$delQueStr = function delQueStr(url, ref) {
  var str = "";
  if (url.indexOf('?') != -1) {
    str = url.substr(url.indexOf('?') + 1);
  } else {
    return url;
  }
  var arr = "";
  var returnurl = "";
  var setparam = "";
  if (str.indexOf('&') != -1) {
    arr = str.split('&');
    for (i in arr) {
      if (arr[i].split('=')[0] != ref) {
        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
      }
    }
    return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
  } else {
    arr = str.split('=');
    if (arr[0] == ref) {
      return url.substr(0, url.indexOf('?'));
    } else {
      return url;
    }
  }
}

//封装axios
Vue.prototype.$axios = axios;
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
