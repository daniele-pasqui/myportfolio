import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedLoadedGeneric
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoleEnum } from '@/types/role.type'
import { useAuthStore } from '@/stores/auth'

const beforeEnterIsAdmin = (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) => {
  const { isLoggedIn, hasRole } = useAuthStore()
  isLoggedIn && hasRole(RoleEnum.admin) ? next() : next('/')
}

const beforeEnterIsLoggedIn = (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) => {
  const { isLoggedIn } = useAuthStore()
  isLoggedIn ? next() : next('/')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
      beforeEnter: beforeEnterIsLoggedIn
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      beforeEnter: beforeEnterIsLoggedIn
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      beforeEnter: beforeEnterIsLoggedIn
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: beforeEnterIsLoggedIn
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrderView.vue'),
      beforeEnter: beforeEnterIsLoggedIn
    },
    {
      path: '/admin',
      beforeEnter: beforeEnterIsAdmin,
      children: [
        {
          path: 'panel',
          name: 'admin.panel',
          component: () => import('../views/admin/PanelView.vue')
        },
        {
          path: 'shop',
          name: 'admin.shop',
          component: () => import('../views/admin/ShopView.vue')
        }
      ]
    }
  ]
})

export default router
