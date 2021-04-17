<template>
  <div class="payfor-list">
    <div class="title">
      赔付金额：{{ payforMoney }}
    </div>
    <van-cell 
      center 
      v-for="(item, index) in payforList"
      :key="index"
      :title="`${item.PayOutMoney}元 - ${item.PayOutReason} - ${item.PayOutTimeStr} - ${item.Customer}`" />
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
      this.axios.post('http://115.28.106.108:8999/SupCar/PayOutList', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.payforMoney = data.PayOutMoney
            this.payforList = data.data || [];
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
