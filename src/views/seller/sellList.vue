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
    <van-button type="info" size="small" @click="toSellDetail('')" style="margin-left: 20px;">添加售卖信息</van-button>
    <van-cell 
      v-for="(item, index) in saleInfo.accountLists"
      :key="index"
      center 
      :title="`件数:${item.ProductCount} 重量:${item.ProductWeight} 总价:${item.TotalPriceNum} 单价:${item.UnitPriceNum}`" 
      :label="`${item.IsPayStr} - ${item.CreateTimeStr}`">
      <template>
        <van-button type="info" size="mini" v-if="item.IsPay === 0" @click.stop="changePayState(item.id, item.IsPay)">已付</van-button>
        <van-button type="info" size="mini" @click.stop="toSellDetail(item)">编辑</van-button>
        <van-button type="info" size="mini" @click.stop="deleteSaleInfo(item.id)">删除</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalSellList',
  data () {
    return {
      saleInfo: {
        Total_Amount: '',
        Paid_Amount: '',
        Balance_Amount: '',
        PaidOut_Amoubt: '',
        Total_Nums: '', 
        Total_Weight: '',
        SaleId: 1,
        accountLists: []
      }
    }
  },
  created () {
    this.getSaleInfo()
  },
  methods: {
    // 获取销售信息
    getSaleInfo () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.post('http://115.28.106.108:8999/SaleCar/SaleList', params)
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
    },
    // 跳转售卖信息详情
    toSellDetail (item) {
      let saleInfo
      if (item) {
        saleInfo = {
          id: item.id,
          ProductCount: item.ProductCount,
          ProductWeight: item.ProductWeight,
          UnitPrice: item.UnitPrice,
          TotalPrice: item.TotalPrice,
          Customer: item.Customer,
          CustomerPhone: item.CustomerPhone,
          IsPay: item.IsPay,
          FlagType: item.FlagType
        }
      }
      this.$router.push({ 
        path: '/seller/sellDetail',
        query: {
          CarId: this.$route.query.CarId,
          SaleId: this.saleInfo.SaleId,
          saleInfo
        }
      })
    },
    // 修改付款状态
    changePayState (id, state) {
      const params = {
        Id: id,
        State: state
      }
      this.axios.post('http://115.28.106.108:8999/SaleCar/UpdatePay', params)
        .then(res => {
          if (data.code === 0) {
            this.getSaleInfo();
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
    // 删除销售信息
    deleteSaleInfo (id) {
      const params = {
        id
      }
      this.axios.post('http://115.28.106.108:8999/SaleCar/DeleteSale', params)
        .then(res => {
          if (data.code === 0) {
            this.getSaleInfo();
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
