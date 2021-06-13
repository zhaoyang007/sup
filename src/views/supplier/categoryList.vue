<template>
  <div class="category-list">
    <van-button class="add-category" type="info" size="small" @click="toCategoryDetail('')"> 添加货品 </van-button>
    <van-button size="small" class="back" @click="goBack">返 回</van-button>
    <div class="list">
      <van-cell
        v-for="(item, index) in categoryList"
        :key="index"
        :title="`货号：${item.FruitCategory}  数量：${item.CategoryCount}`">
        <template>
          <van-button type="info" size="mini" @click.stop="toCategoryDetail(item)">编辑</van-button>
          <van-button type="info" size="mini" @click.stop="deleteCategory(item.Id)">删除</van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'CategoryList',
  data () {
    return {
      categoryList: [{}]
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 列表
    getCategoryList () {
      console.log(this.$route.query.CarId)
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.get('/SupCar/DetailList', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.categoryList = data.data || []
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
    // 跳转新增/编辑
    toCategoryDetail (item) {
      this.$router.push({
        path: '/supplier/categoryDetail',
        query: {
          SupId: this.$route.query.SupId,
          CarId: this.$route.query.CarId,
          categoryInfo: item
        }
      })
    },
    // 删除
    deleteCategory (Id) {
      const params = {
        Id
      }
      this.axios.get('/SupCar/DeleteCategory', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.getCategoryList()
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
.category-list {
  padding-top: 20px;
  .add-category {
    margin-bottom: 20px;
    padding: 0 20px;
  }
  .back {
    margin-left: 20px;
    padding: 0 30px;
  }
}
.van-cell__title {
  text-align: left;
}
.van-cell__value {
  flex: 0 0 80px;
}
</style>
