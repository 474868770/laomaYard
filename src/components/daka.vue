<template>
  <div>
    <!-- <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in mlist"
          clickable
          :key="item"
          :title="`复选框 ${item.title}`"
          @click="toggle(index)"
        >
          <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>-->
    <van-collapse
      v-model="activeNames"
      @change="onChange($event,index)"
      v-for="(item, index) in mlist"
      :key="index"
    >
      <div>
        <van-collapse-item :title="item.title" @click="zhankai(index)" :name="index">
          <div slot="right-icon">
            <van-checkbox-group>
              <van-cell clickable>
                <van-checkbox slot="right-icon" />
              </van-cell>
            </van-checkbox-group>
          </div>
          <div>
            <van-row>
              <van-col span="8">身高</van-col>
              <van-col span="8">
                <van-stepper v-model="item.hight" input-width="50px" step="0.1" />
              </van-col>
              <van-col span="8">cm</van-col>
            </van-row>
          </div>
          <div style="margin-top:20px">
            <van-row>
              <van-col span="8">体重</van-col>
              <van-col span="8">
                <van-stepper v-model="item.weight" input-width="50px" step="0.1" />
              </van-col>
              <van-col span="8">kg</van-col>
            </van-row>
          </div>
        </van-collapse-item>
      </div>
    </van-collapse>
    <van-button type="primary" size="large" style="margin-top:20px">院子打卡</van-button>
  </div>
</template>

<script>
import request from "../util/request";
export default {
  name: "daka",
  components: {},
  data() {
    return {
      activeNames: ["1"],
      hight: [""]
    };
  },

  props: ["mlist"],

  mounted() {
    console.log(this.mlist);
    //获取宝贝用户关系
    request({
      url: "http://api.growbb.net:3010/api/user/data",
      method: "post",
      data: {
        method: "query_txl_babyid",
        baby_id: this.mlist.babyId
      }
    }).then(res => {});
  },

  methods: {
    onChange(event, index) {
      console.log(event, index);
      //获取身高记录信息
      request({
        url: "http://api.growbb.net:3010/api/user/data",
        method: "post",
        data: {
          method: "query_growp_record",
          baby_id: this.mlist[index].babyId,
          value_type_id: 100
        }
      }).then(res => {
        this.mlist[index].hight = res.data[0].value_content;
      });

      //获取体重记录信息
      request({
        url: "http://api.growbb.net:3010/api/user/data",
        method: "post",
        data: {
          method: "query_growp_record",
          baby_id: this.mlist[index].babyId,
          value_type_id: 101
        }
      }).then(res => {
        this.mlist[index].weight = res.data[0].value_content;
      });
    },

    zhankai(i) {
      console.log(i);
    }
  }
};
</script>