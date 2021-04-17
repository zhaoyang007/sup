import Vue from 'vue'
import VueRouter from 'vue-router'
import SupplierLogin from '../views/supplier/login.vue'
import SellerLogin from '../views/seller/login.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: SupplierLogin
  // },
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
    path: '/supplier/sellList',
    name: 'supplierSellList',
    component: () => import(/* webpackChunkName: "supplierSellList" */ '../views/supplier/sellList.vue')
  },
  {
    path: '/supplier/payforList',
    name: 'supplierPayforList',
    component: () => import(/* webpackChunkName: "supplierPayforList" */ '../views/supplier/payforList.vue')
  },
  // 销售商
  {
    path: '/seller/login',
    name: 'SellerLogin',
    component: SellerLogin
  },
  {
    path: '/seller/vehicleList',
    name: 'sellerVehicleList',
    component: () => import(/* webpackChunkName: "sellerVehicleList" */ '../views/seller/vehicleList.vue')
  },
  {
    path: '/seller/sellList',
    name: 'sellerSellList',
    component: () => import(/* webpackChunkName: "sellerSellList" */ '../views/seller/sellList.vue')
  },
  {
    path: '/seller/sellDetail',
    name: 'sellerSellDetail',
    component: () => import(/* webpackChunkName: "sellerSellDetail" */ '../views/seller/sellDetail.vue')
  },
  {
    path: '/seller/payforList',
    name: 'sellerPayforList',
    component: () => import(/* webpackChunkName: "sellerPayforList" */ '../views/seller/payforList.vue')
  },
  {
    path: '/seller/payforDetail',
    name: 'sellerPayforDetail',
    component: () => import(/* webpackChunkName: "sellerPayforDetail" */ '../views/seller/payforDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
