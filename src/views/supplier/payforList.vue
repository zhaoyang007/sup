<template>
  <div class="payfor-list">
    <div class="title">
      赔付金额：{{ payforMoney }} 元
    </div>
    <van-cell
      center
      v-for="(item, index) in payforList"
      :key="index"
      :title="`赔付金额:${item.PayOutMoney}元 - 赔付时间:${item.PayOutTimeStr}`"
      :label="`客户:${item.Customer} - 赔付原因:${item.PayOutReason}`" />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SupPayforList',
  data () {
    return {
      payforMoney: 0,
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
      this.axios.get('/SupCar/PayOutList', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.payforMoney = data.PayOutMoney
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
