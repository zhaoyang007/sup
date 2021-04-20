<template>
  <div class="payfor-list">
    <div class="title">
      赔付金额：{{ payforMoney }}
    </div>
    <van-button type="info" size="small" @click="toPayforDetail('')" style="margin-bottom: 20px;">添加赔付信息</van-button>
    <van-cell
      center
      v-for="(item, index) in payforList"
      :key="index"
      :title="`${item.PayOutMoney}元 - ${item.PayOutReason} - ${item.PayOutTimeStr} - ${item.Customer}`">
      <template>
        <van-button type="info" size="mini" @click.stop="toPayforDetail(item)">编辑</van-button>
        <van-button type="info" size="mini" @click.stop="deletePayfor(item.id)">删除</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalPayforList',
  data () {
    return {
      payforMoney: 0,
      SaleId: 0,
      payforList: []
    }
  },
  created () {
    this.getPayforList()
  },
  methods: {
    getPayforList () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.post('/SaleCar/PayOutList', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.payforMoney = data.PayOutMoney
            this.SaleId = data.SaleId
            this.payforList = data.data || []
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
    toPayforDetail (item) {
      let payforInfo
      if (item) {
        payforInfo = {
          id: item.id,
          PayOutMoney: item.PayOutMoney,
          PayOutReason: item.PayOutReason,
          Customer: item.Customer
        }
      }
      this.$router.push({
        path: '/seller/payforDetail',
        query: {
          CarId: this.$route.query.CarId,
          SaleId: this.SaleId,
          payforInfo
        }
      })
    },
    deletePayfor (id) {
      const params = {
        id
      }
      this.axios.post('/SaleCar/DeletePayOut', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.getPayforList()
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
.payfor-list {
  .title {
    padding: 30px;
  }
}
.van-cell__title {
  text-align: left;
}
</style>
