<template>
  <div class="sell-detail">
    <van-form>
      <van-field v-model="formData.ProductCount" type="number" label="数量" placeholder="请输入" />
      <van-field v-model="formData.ProductWeight" type="number" label="重量" placeholder="请输入" />
      <van-field v-model="formData.UnitPrice" type="number" label="单价" placeholder="请输入" />
      <van-field v-model="formData.TotalPrice" type="number" label="总价" placeholder="请输入" />
      <van-field v-model="formData.Customer" label="客户" placeholder="请输入" />
      <van-field v-model="formData.CustomerPhone" type="tel" label="客户电话" placeholder="请输入" />
      <van-field name="radio" label="付款情况">
        <template #input>
          <van-radio-group v-model="formData.IsPay" direction="horizontal">
            <van-radio :name="1">已付款</van-radio>
            <van-radio :name="0">未付款</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formData.FlagType"
        rows="1"
        autosize
        label="备注"
        type="textarea"
        placeholder="请输入"
      />
    </van-form>
    <div style="margin-top: 100px;">
      <van-button type="info" class="save" @click="editSaleInfo">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalSellDetail',
  data () {
    return {
      formData: {
        ProductCount: '',
        ProductWeight: '',
        UnitPrice: '',
        TotalPrice: '',
        Customer: '',
        CustomerPhone: '',
        IsPay: '',
        FlagType: ''
      }
    }
  },
  created () {
    const saleInfo = this.$route.query.saleInfo
    if (saleInfo) {
      this.formData = saleInfo
    }
  },
  methods: {
    editSaleInfo () {
      let src = '';
      if (this.$route.query.saleInfo) {
        src = 'http://115.28.106.108:8999/SaleCar/UpdateSale'
      } else {
        src = 'http://115.28.106.108:8999/SaleCar/AddSale'
      }
      let params = {
        CarId: this.$route.query.CarId,
        SaleId: this.$route.query.SaleId,
        ...this.formData
      }
      this.axios.post(src, params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$route.push({
              path: '/seller/sellList',
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
.sell-detail {
  .van-button {
    height: 38px;
  }
  .save {
    padding: 0 29px;
    margin-right: 20px;
  }
}
</style>
