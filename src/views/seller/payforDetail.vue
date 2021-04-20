<template>
  <div class="payfor-detail">
    <van-form>
      <van-field v-model="formData.PayOutMoney" type="number" label="赔付金额" placeholder="请输入" />
      <van-field v-model="formData.PayOutReason" label="赔付原因" placeholder="请输入" />
      <van-field v-model="formData.Customer" label="客户" placeholder="请输入" />
    </van-form>
    <div style="margin-top: 100px;">
      <van-button type="info" class="save" @click="editPayfor">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalPayforDetail',
  data () {
    return {
      formData: {
        PayOutMoney: '',
        PayOutReason: '',
        Customer: ''
      }
    }
  },
  created () {
    const payforInfo = this.$route.query.payforInfo
    if (payforInfo) {
      this.formData = payforInfo
    }
  },
  methods: {
    editPayfor () {
      let src = ''
      if (this.$route.query.payforInfo) {
        src = '/SaleCar/UpdatePayOut'
      } else {
        src = '/SaleCar/AddPayOut'
      }
      const params = {
        CarId: this.$route.query.CarId,
        SaleId: this.$route.query.SaleId,
        ...this.formData
      }
      this.axios.post(src, params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$route.push({
              path: '/seller/payforList',
              query: {
                CarId: this.$route.query.CarId
              }
            })
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
.payfor-detail {
  .van-button {
    height: 38px;
  }
  .save {
    padding: 0 29px;
    margin-right: 20px;
  }
}
</style>
