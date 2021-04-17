<template>
  <div class="sell-list">
    <div class="title">
      <van-row type="flex" justify="space-around" style="margin-bottom: 10px;">
        <van-col span="6">售卖总金额:{{ saleInfo.Total_Amount }}</van-col>
        <van-col span="6">到账金额:{{ saleInfo.Paid_Amount }}</van-col>
        <van-col span="6">欠款金额:{{ saleInfo.Balance_Amount }}</van-col>
        <van-col span="6">赔付金额:{{ saleInfo.PaidOut_Amoubt }}</van-col>
      </van-row>
      <van-row type="flex" justify="space-around" style="margin-bottom: 10px;">
        <van-col span="8">售卖总件数:{{ saleInfo.Total_Nums }}</van-col>
        <van-col span="8">售卖总重量:{{ saleInfo.Total_Weight }}</van-col>
        <van-col span="8">售卖均价:{{ saleInfo.Total_Amount }}</van-col>
      </van-row>
    </div>
    <van-button type="info" size="small" class="frush" @click="getSaleInfo">刷 新</van-button>
    <van-cell 
      v-for="(item, index) in saleInfo.accountLists"
      :key="index"
      center 
      :title="`件数:${item.ProductCount} 重量:${item.ProductWeight} 总价:${item.TotalPriceNum} 单价:${item.UnitPriceNum}`" 
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
        Total_Weight: '',
        accountLists: []
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
      this.axios.post('http://115.28.106.108:8999/SupCar/SaleList', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.saleInfo = data;
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sell-list {
  .title {
    padding: 5px;
  }
}
.van-cell__title {
  text-align: left;
}
.frush {
  margin-bottom: 20px;
  padding: 0 30px;
}
</style>
