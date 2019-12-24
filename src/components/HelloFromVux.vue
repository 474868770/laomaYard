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
      <popup-picker
        title="期望身高"
        :data="list"
        v-model="shengao"
        value-text-align="left"
      ></popup-picker>
      <x-address
        title="现居住地"
        v-model="addressValue"
        @on-shadow-change="onShadowChange"
        :list="addressData"
        value-text-align="left"
      ></x-address>
    </group>
    <br>
    <group>
      <popup-picker title="你与宝宝的关系" :data="long" v-model="guanxi" value-text-align="right"></popup-picker>
      <popup-picker title="你的身高" :data="list" v-model="yoursg" value-text-align="right"></popup-picker>
    </group>
    <br>
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

import request from "../util/request";
import { userInfo } from "os";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";

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
    XButton
  },
  data() {
    return {
      addressData: ChinaAddressV4Data,
      addressValue: ["四川省", "成都市", "成华区"],
      name: "",
      time1: "2010-06-01",
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
      long: [["爸爸", "妈妈", "其他"]],
      guanxi: ["妈妈"],
      listsex: [["男", "女"]],
      sex: ["男"],
    };
  },
  
  methods: {
    
    onShadowChange(ids,names) {
      console.log(ids,names) 
    this.addressValue =names[0]+names[1]+names[2];
},

    //下一步按钮
    handleNext(x, y, z) {
      const vm = this;
      var yanzhengname = this.name;
      var address = vm.addressValue
      console.log(address);
      if (yanzhengname == "") {
        alert("小名不能为空");
      } else {
        request({
          url: "http://api.growbb.net:3009/api/user/data",
          method: "post",
          data: {
            method: "baby",
            // baby_id:'',
            baby_name: vm.name,
            baby_birthday: vm.time1,
            baby_sex: vm.sex.join(","),
            // user_id:'13981907098',
            // created_time: "",
            code_id: "1",
            mother_expected_height: vm.shengao.join(","),
            address: 1
          }
        }).then(res => {
          var yanzheng = res.data.status;
          if ((yanzheng = "success")) {
            Toast({
              message: "创建宝宝成功",
              iconClass: "icon icon-success"
            });
            this.$router.push({ name: "jilu" });
          }
          console.log(response);
          Indicator.close();
        });
      }
    }
  },
  mounted() {

  this.getLocation()
  console.log(onHide)

    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_user"
      }
    }).then(res => {
      console.log(res.data);
      var yanzheng = res.data;
      if (yanzheng == "") {
        vm.$router.push({
          name: "HelloFromVux"
        });
      }
    });
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
