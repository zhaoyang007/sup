<template>
  <div class="sell-list">
    <div class="title">
      <van-row gutter="10">
        <van-col span="12">售卖总金额:{{ saleInfo.Total_Amount }}</van-col>
        <van-col span="12">到账金额:{{ saleInfo.Paid_Amount }}</van-col>
      </van-row>
      <van-row gutter="10">
        <van-col span="12">欠款金额:{{ saleInfo.Balance_Amount }}</van-col>
        <van-col span="12">赔付金额:{{ saleInfo.PaidOut_Amoubt }}</van-col>
      </van-row>
      <van-row gutter="10">
        <van-col span="12">售卖总件数:{{ saleInfo.Total_Nums }}</van-col>
        <van-col span="12">售卖总重量:{{ saleInfo.Totla_Weight }}</van-col>
      </van-row>
      <van-row gutter="10">
        <van-col span="12">售卖均价:{{ saleInfo.Rang_Amount }}</van-col>
        <van-col span="12"></van-col>
      </van-row>
    </div>
    <van-cell>
      <van-row gutter="10">
        <van-col span="8">货号分类</van-col>
        <van-col span="8">剩余数量</van-col>
        <van-col span="8">总量</van-col>
      </van-row>
    </van-cell>
    <van-cell v-for="(item, index) in saleInfo.categoryList" :key="index">
      <van-row gutter="10">
        <van-col span="8">{{ item.FruitCategory }}</van-col>
        <van-col span="8">{{ item.SaleNumCount }}</van-col>
        <van-col span="8">{{ item.AllNumCount }}</van-col>
      </van-row>
    </van-cell>
    <van-button type="info" size="small" class="frush" @click="getSaleInfo">刷 新</van-button>
    <van-button size="small" class="back" @click="goBack">返 回</van-button>
    <van-cell
      v-for="(item, index) in saleInfo.accountLists"
      :key="index"
      center
      :title="`件数:${item.ProductCount} 重量:${item.ProductWeight} 总价:${item.TotalPriceNum} 单价:${item.UnitPriceNum} 分类:${item.FruitDetail}`"
      :label="`${item.IsPayStr} - ${item.CreateTimeStr}`" />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SupSellList',
  data () {
    return {
      saleInfo: {
        Total_Amount: '',
        Paid_Amount: '',
        Balance_Amount: '',
        PaidOut_Amoubt: '',
        Total_Nums: '',
        Totla_Weight: '',
        accountLists: [],
        categoryList: []
      }
    }
  },
  created () {
    this.getSaleInfo()
  },
  methods: {
    getSaleInfo () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.get('/SupCar/SaleList', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.saleInfo = data
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
    // 返回
    goBack () {
      this.$router.push({
        path: '/supplier/vehicleList',
        query: {
          SupId: this.$route.query.SupId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sell-list {
  .title {
    padding: 20px 25px;
    /deep/ .van-col {
      text-align: left;
      margin-bottom: 3px;
    }
  }
}
.van-cell__title {
  text-align: left;
}
.frush {
  margin: 20px 0;
  padding: 0 30px;
}
.back {
  margin-left: 20px;
  padding: 0 30px;
}
</style>
