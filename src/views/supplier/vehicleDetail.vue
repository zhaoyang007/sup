<template>
  <div class="vehicle-detail">
    <van-form>
      <van-field v-model="formData.Carlience" label="车牌号" placeholder="请输入" />
      <van-field v-model="formData.DriverName" label="司机姓名" placeholder="请输入" />
      <van-field v-model="formData.DriverPhone" type="tel" label="司机电话" placeholder="请输入" />
      <van-field v-model="formData.CarCost" type="number" label="车辆成本" placeholder="请输入" />
      <van-field v-model="formData.AllNums" type="number" label="总件数" placeholder="请输入" />
      <van-field v-model="formData.AllWeight" type="number" label="总重量" placeholder="请输入" />
      <van-field
        readonly
        clickable
        name="picker"
        label="水果"
        placeholder="请选择"
        :value="FruitName"
        @click="fruitShowPicker = true"
      />
      <van-field
        readonly
        clickable
        name="picker"
        label="销售商"
        placeholder="请选择"
        :value="SalerName"
        @click="sellerShowPicker = true"
      />
      <van-field
        readonly
        clickable
        name="picker"
        label="计价方式"
        placeholder="请选择"
        :value="ChargeName"
        @click="chargeShowPicker = true"
      />
      <van-popup v-model="fruitShowPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="FruitType"
          :columns="fruitColumns"
          :default-index="fruitDefaultValue"
          @confirm="fruitOnConfirm"
          @cancel="fruitShowPicker = false"
        />
      </van-popup>
      <van-popup v-model="sellerShowPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="UserName"
          :columns="sellerColumns"
          :default-index="salerDefaultValue"
          @confirm="sellerOnConfirm"
          @cancel="sellerShowPicker = false"
        />
      </van-popup>
      <van-popup v-model="chargeShowPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="ChargeName"
          :columns="chargeColumns"
          :default-index="chargeDefaultValue"
          @confirm="chargeOnConfirm"
          @cancel="chargeShowPicker = false"
        />
      </van-popup>
    </van-form>
    <div style="margin-top: 100px;">
      <van-button type="info" class="save" @click="editVehicle">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SupVehicleDetail',
  data () {
    return {
      // 选择器
      fruitColumns: [],
      sellerColumns: [],
      chargeColumns: [
        { ChargeId: 2, ChargeName: '按斤量计费' },
        { ChargeId: 1, ChargeName: '按件数计费' }
      ],
      fruitShowPicker: false,
      sellerShowPicker: false,
      chargeShowPicker: false,
      fruitDefaultValue: 0,
      salerDefaultValue: 0,
      chargeDefaultValue: 0,
      // 表单
      formData: {
        Carlience: '',
        DriverName: '',
        DriverPhone: '',
        CarCost: '',
        AllNums: '',
        AllWeight: '',
        FruitTypeId: '',
        SaleId: '',
        ChargType: ''
      },
      FruitName: '',
      SalerName: '',
      ChargeName: ''
    }
  },
  created () {
    // 获取下拉列表
    this.getSaleList()
    this.getFruitList()
    // 获取编辑信息
    if (this.$route.query.CarId) {
      this.getCarDetail()
    }
  },
  methods: {
    // 选择确认
    fruitOnConfirm (value) {
      this.FruitName = value.FruitType
      this.formData.FruitTypeId = value.Id
      this.fruitShowPicker = false
    },
    sellerOnConfirm (value) {
      this.SalerName = value.UserName
      this.formData.SaleId = value.SalerId
      this.sellerShowPicker = false
    },
    chargeOnConfirm (value) {
      this.ChargeName = value.ChargeName
      this.formData.ChargType = value.ChargeId
      this.chargeShowPicker = false
    },
    // 获取编辑信息
    getCarDetail () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.get('/SupCar/GetEditCar', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            // 获取表单值
            this.formData.Id = data.data.Id
            this.formData.Carlience = data.data.Carlience
            this.formData.DriverName = data.data.DriverName
            this.formData.DriverPhone = data.data.DirverPhone
            this.formData.CarCost = data.data.CarCost
            this.formData.AllNums = data.data.AllNums
            this.formData.AllWeight = data.data.AllWeight
            this.formData.FruitTypeId = data.data.FruitTypeId
            this.formData.SaleId = data.data.SaleId
            this.formData.ChargType = data.data.ChargType
            // 获取下拉选择默认值
            const fruitIndex = this.fruitColumns.findIndex(item => item.Id === this.formData.FruitTypeId)
            this.fruitDefaultValue = fruitIndex
            this.FruitName = this.fruitColumns[fruitIndex].FruitType
            const salerIndex = this.sellerColumns.findIndex(item => item.SalerId === this.formData.SaleId)
            this.salerDefaultValue = salerIndex
            this.SalerName = this.sellerColumns[fruitIndex].UserName
            const chargeIndex = this.chargeColumns.findIndex(item => item.ChargeId === this.formData.ChargType)
            this.chargeDefaultValue = chargeIndex
            this.ChargeName = this.chargeColumns[chargeIndex].ChargeName
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
    // 添加/编辑保存
    editVehicle () {
      let url = ''
      if (this.$route.query.CarId) {
        url = '/SupCar/UpdateCar'
      } else {
        url = '/SupCar/AddCar'
      }
      const params = {
        ...this.formData,
        SupId: this.$route.query.SupId
      }
      this.axios.post(url, params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({
              path: '/supplier/vehicleList',
              query: {
                SupId: this.$route.query.SupId
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
    },
    // 获取供应商下拉列表
    getSaleList () {
      const params = {
        SupId: this.$route.query.SupId
      }
      this.axios.get('/SupCar/GetSales', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.sellerColumns = data.data || []
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
    // 获取水果下拉列表
    getFruitList () {
      this.axios.get('/SupCar/GetFruit')
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.fruitColumns = data.data || []
            console.log(this.fruitColumns)
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
.vehicle-detail {
  .van-button {
    height: 38px;
  }
  .save {
    padding: 0 29px;
    margin-right: 20px;
  }
}
</style>
