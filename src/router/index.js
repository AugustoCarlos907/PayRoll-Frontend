import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/landingPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/dashboard/DashboardView.vue') },
      { path: 'employees',   name: 'employees',       component: () => import('@/views/employees/EmployeeListView.vue') },
      { path: 'employees/create', name: 'employees.create', component: () => import('@/views/employees/EmployeeCreateView.vue') },
      { path: 'employees/:id',    name: 'employees.detail', component: () => import('@/views/employees/EmployeeDetailView.vue') },
      { path: 'departments', name: 'departments',     component: () => import('@/views/departments/DepartmentListView.vue') },
      { path: 'positions',   name: 'positions',       component: () => import('@/views/positions/PositionListView.vue') },
      { path: 'payroll',     name: 'payroll',         component: () => import('@/views/payroll/PayrollListView.vue') },
      { path: 'payroll/process', name: 'payroll.process', component: () => import('@/views/payroll/PayrollProcessView.vue') },
      { path: 'payroll/:id',     name: 'payroll.detail',  component: () => import('@/views/payroll/PayrollDetailView.vue') },
      { path: 'attendance',  name: 'attendance',      component: () => import('@/views/attendance/AttendanceView.vue') },
      { path: 'benefits',    name: 'benefits',        component: () => import('@/views/benefits/BenefitListView.vue') },
      { path: 'deductions',  name: 'deductions',      component: () => import('@/views/deductions/DeductionListView.vue') },
      { path: 'payments',    name: 'payments',        component: () => import('@/views/payments/PaymentListView.vue') },
      { path: 'reports',     name: 'reports',         component: () => import('@/views/reports/ReportView.vue') },
      { path: 'users',       name: 'users',           component: () => import('@/views/users/UserListView.vue') },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router