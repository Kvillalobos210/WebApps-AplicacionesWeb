import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../components/Customers.vue'
import Employees from '../components/Employees.vue'
import Cities from '../components/Cities.vue'
import Specialties from '../components/Specialties.vue'
import Districts from '../components/Districts.vue'
import Appointments from '../components/Appointments.vue'
import Register from '../components/Register.vue'
import RegisterCustomer from '../components/RegisterCustomer.vue'
import RegisterEmployee from '../components/RegisterEmployee.vue'
import Login from '../components/Login.vue'
import HomeLogueado from '../components/HomeLogueado.vue'
import HomeEmployee from '../components/HomeEmployee.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customers',
    name: 'customers', 
    component: Customers 
  },
  {
    path: '/employees',
    name: 'employees', 
    component: Employees 
  },
  {
    path: '/cities',
    name: 'cities', 
    component: Cities 
  },
  {
    path: '/specialties',
    name: 'specialties', 
    component: Specialties 
  },
  {
    path: '/districts',
    name: 'districts', 
    component: Districts 
  },
  {
    path: '/appointments',
    name: 'appointments', 
    component: Appointments 
  },
  {
    path: '/registers',
    name: 'registers', 
    component: Register 
  },
  {
    path: '/login',
    name: 'login', 
    component: Login 
  },
  {
    path: '/registerEmployees',
    name: 'registerEmployees', 
    component: RegisterEmployee 
  },
  {
    path: '/registerCustomers',
    name: 'registerCustomers', 
    component: RegisterCustomer 
  },
  {
    path: '/homeLogueado',
    name: 'homeLogueado', 
    component: HomeLogueado
  },
  {
    path: '/homeEmployee',
    name: 'homeEmployee', 
    component: HomeEmployee
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
