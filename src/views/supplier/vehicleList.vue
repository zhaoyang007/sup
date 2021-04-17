<template>
  <div class="vehicle-list">
    <van-tabs type="card" class="tabs" :ellipsis="false" @click="tabClick">
      <van-tab title="全部"></van-tab>
      <van-tab title="已发车"></van-tab>
      <van-tab title="售卖中"></van-tab>
      <van-tab title="完结"></van-tab>
      <van-tab title="售完(欠款未收)"></van-tab>
    </van-tabs>
    <div class="list">
      <van-cell 
        v-for="(item, index) in vehicleList" 
        :key="index"
        :title="`${item.Carlience}-${item.FruitType}-${item.AllNums}件-${item.SaleName}-${item.CarStateStr}`">
        <template>
          <van-button type="info" size="mini" @click.stop="toVehicleDetail(item.id, item.CarState)">编辑</van-button>
          <van-button type="info" size="mini" @click.stop="deleteVehicle(item.id)">删除</van-button>
          <van-button type="info" size="mini" @click.stop="toSellList(item.id)">售卖信息</van-button>
          <van-button type="info" size="mini" @click.stop="toPayforList(item.id)">赔付信息</van-button>
        </template>
      </van-cell>
    </div>
    <van-button class="add-vehicle" icon="plus" round type="info" size="normal" @click="toVehicleDetail('', '')" />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SupVehicleList',
  data () {
    return {
      vehicleListCopy: [],
      vehicleList: [],
      activeTab: 0
    }
  },
  created () {
    this.getVehicleList();
  },
  methods: {
    // 获取车辆列表
    getVehicleList () {
      const params = {
        SupId: this.$route.query.SupId
      }
      this.axios.post('http://115.28.106.108:8999/SupCar/Carlist', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.vehicleListCopy = data.data || []
            this.vehicleList = [].concat(this.vehicleListCopy)
          } else {
            Toast({
              message: data.msg,
              position: 'top'
            })
          }
        }).catch(() => {
          Toast({
            message: '请求失败',
            position: 'top'
          })
        })
    },
    // tab切换
    tabClick (name) {
      this.activeTab = name;
      name = name - 1
      if (name < 0) {
        this.vehicleList = [].concat(this.vehicleListCopy)
      } else {
        this.vehicleList = this.vehicleListCopy.filter(item => item.CarState === name)
      }
    },
    // 跳转新增/编辑车辆
    toVehicleDetail (id, CarState) {
      this.$router.push({ 
        path: '/supplier/vehicleDetail', 
        query: { 
          SupId: this.$route.query.SupId,
          CarId: id,
          CarState
        }
      })
    },
    // 删除车辆
    deleteVehicle (id) {
      const params = {
        CarId: id
      }
      this.axios.post('http://115.28.106.108:8999/SupCar/DeleteCar', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            const index = this.vehicleListCopy.findIndex(item => item.id === id)
            this.vehicleListCopy.splice(index, 1)
            this.tabClick(this.activeTab)
          }
          Toast({
            message: data.msg,
            position: 'top'
          })
        }).catch(() => {
          Toast({
            message: '请求失败',
            position: 'top'
          })
        })
    },
    // 售卖信息
    toSellList (id) {
      this.$router.push({ 
        path: '/supplier/sellList',
        query: { 
          CarId: id
        }
      })
    },
    // 赔付信息
    toPayforList (id) {
      this.$router.push({ 
        path: '/supplier/payforList',
        query: { 
          CarId: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vehicle-list {
  .tabs {
    margin-bottom: 20px;
  }
  /deep/ .van-tabs__nav--complete {
    padding: 0;
  }
  /deep/ .van-tabs__wrap--scrollable .van-tab {
    padding: 0 10px;
  }
  .list {
    .van-cell__title {
      text-align: left;
    }
  }
  .add-vehicle {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 28px;
  }
}
</style>
