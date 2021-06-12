import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../components/Customers.vue'
import Employees from '../components/Employees.vue'
import Cities from '../components/Cities.vue'
import Specialties from '../components/Specialties.vue'
import Districts from '../components/Districts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customers',
    name: 'customers', //esto va en el list-components-item
    component: Customers //Es igual al componente que hemos puesto (Category.vue)
    //De aquí nos vamos a App.vue
  },
  {
    path: '/employees',
    name: 'employees', //esto va en el list-components-item
    component: Employees //Es igual al componente que hemos puesto (Category.vue)
    //De aquí nos vamos a App.vue
  },
  {
    path: '/cities',
    name: 'cities', //esto va en el list-components-item
    component: Cities //Es igual al componente que hemos puesto (Category.vue)
    //De aquí nos vamos a App.vue
  },
  {
    path: '/specialties',
    name: 'specialties', //esto va en el list-components-item
    component: Specialties //Es igual al componente que hemos puesto (Category.vue)
    //De aquí nos vamos a App.vue
  },
  {
    path: '/districts',
    name: 'districts', //esto va en el list-components-item
    component: Districts //Es igual al componente que hemos puesto (Category.vue)
    //De aquí nos vamos a App.vue
  },
  {
    path: '/about',
    name: 'About',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
