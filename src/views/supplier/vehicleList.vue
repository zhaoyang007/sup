<template>
  <div class="vehicle-list">
    <van-tabs type="card" class="tabs" :ellipsis="false" @click="tabClick">
      <van-tab title="全部"></van-tab>
      <van-tab title="已发车"></van-tab>
      <van-tab title="售卖中"></van-tab>
      <van-tab title="售完(欠款未收)"></van-tab>
      <van-tab title="完结"></van-tab>
    </van-tabs>
    <van-button class="add-vehicle" icon="plus" round type="info" size="small" @click="toVehicleDetail('')"> 添加车辆 </van-button>
    <div class="list">
      <van-cell
        v-for="(item, index) in vehicleList"
        :key="index"
        :title="`${item.Carlience}-${item.FruitType}-${item.AllNums}件-${item.SaleName}-${item.CarStateStr}`">
        <template #label>
          <van-button type="info" size="mini" @click.stop="toVehicleDetail(item.Id)">编辑</van-button>
          <van-button type="info" size="mini" @click.stop="deleteVehicle(item.Id)">删除</van-button>
          <van-button type="info" size="mini" @click.stop="toCategoryList(item.Id)">货品详情</van-button>
          <van-button type="info" size="mini" @click.stop="toSellList(item.Id)">售卖信息</van-button>
          <van-button type="info" size="mini" @click.stop="toPayforList(item.Id)">赔付信息</van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SupVehicleList',
  data () {
    return {
      vehicleList: [],
      CarState: 0
    }
  },
  created () {
    this.getVehicleList()
  },
  methods: {
    // 获取车辆列表
    getVehicleList () {
      const params = {
        SupId: this.$route.query.SupId,
        CarState: this.CarState
      }
      this.axios.post('/SupCar/Carlist', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.vehicleList = data.data || []
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
      this.CarState = name
      this.getVehicleList()
    },
    // 跳转新增/编辑车辆
    toVehicleDetail (Id) {
      this.$router.push({
        path: '/supplier/vehicleDetail',
        query: {
          SupId: this.$route.query.SupId,
          CarId: Id
        }
      })
    },
    // 删除车辆
    deleteVehicle (Id) {
      const params = {
        CarId: Id
      }
      this.axios.get('/SupCar/DeleteCar', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.getVehicleList()
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
    // 货品详情
    toCategoryList (Id) {
      this.$router.push({
        path: '/supplier/categoryList',
        query: {
          CarId: Id,
          SupId: this.$route.query.SupId
        }
      })
    },
    // 售卖信息
    toSellList (Id) {
      this.$router.push({
        path: '/supplier/sellList',
        query: {
          CarId: Id,
          SupId: this.$route.query.SupId
        }
      })
    },
    // 赔付信息
    toPayforList (Id) {
      this.$router.push({
        path: '/supplier/payforList',
        query: {
          CarId: Id,
          SupId: this.$route.query.SupId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vehicle-list {
  .tabs {
    margin: 20px 0;
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
    padding: 0 15px;
    margin-bottom: 20px;
  }
}
</style>
