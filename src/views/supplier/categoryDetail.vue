<template>
  <div class="category-detail">
    <van-form>
      <van-field
        required
        readonly
        clickable
        name="picker"
        label="货号"
        placeholder="请选择"
        :value="categoryName"
        @click="categoryShowPicker = true"
      />
      <van-field v-model="formData.CategoryCount" required label="数量" placeholder="请输入" />
      <van-popup v-model="categoryShowPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="Text"
          :columns="categoryColumns"
          :default-index="categoryDefaultValue"
          @confirm="categoryOnConfirm"
          @cancel="categoryShowPicker = false"
        />
      </van-popup>
    </van-form>
    <div style="margin-top: 100px;">
      <van-button type="info" class="save" @click="editCategory">保存</van-button>
      <van-button class="back" @click="goBack">返 回</van-button>
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
        FruitCategory: '',
        CategoryCount: ''
      },
      categoryColumns: [],
      categoryDefaultValue: 0,
      categoryName: '',
      categoryShowPicker: false
    }
  },
  created () {
    const categoryInfo = this.$route.query.categoryInfo
    this.getFruitCategory()
    if (categoryInfo) {
      this.formData = categoryInfo
    } else {
      this.formData = {
        FruitCategory: '',
        CategoryCount: ''
      }
    }
  },
  methods: {
    editCategory () {
      let url = ''
      if (this.$route.query.categoryInfo) {
        url = '/SupCar/UpdateCategory'
      } else {
        url = '/SupCar/AddCategory'
      }
      const params = {
        CarId: this.$route.query.CarId,
        ...this.formData
      }
      this.axios.post(url, params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.goBack()
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
    // 返回
    goBack () {
      this.$router.push({
        path: '/supplier/categoryList',
        query: {
          CarId: this.$route.query.CarId,
          SupId: this.$route.query.SupId
        }
      })
    },
    // 货号分类选择器
    categoryOnConfirm (value) {
      this.categoryName = value.Text
      this.formData.FruitCategory = value.Value
      this.categoryShowPicker = false
    },
    // 获取货号分类下拉列表
    getFruitCategory () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.get('/SupCar/GetFruitDetail', { params })
        .then(res => {
          const data = res.data
          this.categoryColumns = data || []
          if (this.$route.query.categoryInfo) {
            // 获取下拉选择默认值
            const categoryIndex = this.categoryColumns.findIndex(item => item.Value === this.formData.FruitCategory)
            if (categoryIndex !== -1) {
              this.categoryDefaultValue = categoryIndex
              this.categoryName = this.categoryColumns[categoryIndex].Text
            }
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
.category-detail {
  .save {
    padding: 0 30px;
    margin-right: 20px;
  }
  .back {
    padding: 0 30px;
  }
}
</style>
