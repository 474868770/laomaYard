import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloFromVux from '@/components/HelloFromVux'
import jilu from '@/components/jilu'
import wode from '@/components/wode'
import Loading from '@/components/Loading'
import login from '@/components/login'
import myinfo from '@/components/myinfo'
import phone from '@/components/phone'
import guanzhu from '@/components/guanzhu'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '老马的院子——添加宝宝'
      }
    },
    {
      path: '/HelloFromVux',
      name: 'HelloFromVux',
      component: HelloFromVux,
      meta: {
        title: '老马的院子——添加宝宝'
      }
    },
    {
      path: '/jilu',
      name: 'jilu',
      component: jilu,
      meta: {
        title: '老马的院子——日常记录'
      }
    },
    {
      path: '/wode',
      name: 'wode',
      component: wode,
      meta: {
        title: '老马的院子——我的'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '老马的院子——登录'
      }
    },
    {
      path: '/',
      name: 'Loading',
      component: Loading,
      meta: {
        title: '加载中...'
      }
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: myinfo,
      meta: {
        title: '老马的院子——我的信息'
      }
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone,
      meta: {
        title: '老马的院子——通讯录'
      }
    },
    {
      path: '/&yemian=1',
      name: 'Loading',
      component: Loading,
      meta: {
        title: '通讯录——加载中...'
      }
    },
    {
      path: '/&yemian=2',
      name: 'Loading',
      component: Loading,
      meta: {
        title: '加载中...'
      }
    },
    {
      path: '/guanzhu',
      name: 'guanzhu',
      component: guanzhu,
      meta: {
        title: '关注微信公众号'
      }
    }
  ]
})
