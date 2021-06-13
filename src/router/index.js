import Vue from 'vue'
import VueRouter from 'vue-router'
import SupplierLogin from '../views/supplier/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/supplier/login'
  },
  // 供应商
  {
    path: '/supplier/login',
    name: 'SupplierLogin',
    component: SupplierLogin
  },
  {
    path: '/supplier/vehicleList',
    name: 'supplierVehicleList',
    component: () => import(/* webpackChunkName: "supplierVehicleList" */ '../views/supplier/vehicleList.vue')
  },
  {
    path: '/supplier/vehicleDetail',
    name: 'supplierVehicleDetail',
    component: () => import(/* webpackChunkName: "supplierVehicleDetail" */ '../views/supplier/vehicleDetail.vue')
  },
  {
    path: '/supplier/categoryList',
    name: 'supplierCategoryList',
    component: () => import(/* webpackChunkName: "supplierCategoryList" */ '../views/supplier/categoryList.vue')
  },
  {
    path: '/supplier/categoryDetail',
    name: 'supplierCategoryDetail',
    component: () => import(/* webpackChunkName: "supplierCategoryDetail" */ '../views/supplier/categoryDetail.vue')
  },
  {
    path: '/supplier/sellList',
    name: 'supplierSellList',
    component: () => import(/* webpackChunkName: "supplierSellList" */ '../views/supplier/sellList.vue')
  },
  {
    path: '/supplier/payforList',
    name: 'supplierPayforList',
    component: () => import(/* webpackChunkName: "supplierPayforList" */ '../views/supplier/payforList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
