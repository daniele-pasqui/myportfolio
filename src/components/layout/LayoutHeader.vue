<script setup lang="ts">
import { logout } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { RoleEnum } from '@/types/role.type'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const authStore = useAuthStore()
const { resetAuth, hasRole } = authStore
const { user, isLoggedIn } = storeToRefs(authStore)

const cartStore = useCartStore()
const { cartItemsCount } = storeToRefs(cartStore)

const toast = useToast()
const router = useRouter()
const route = useRoute()

const closeNavbar = () => {
  document.getElementsByClassName('navbar-toggler')[0].classList.add('collapsed')
  document.getElementById('navbarSupportedContent')?.classList.add('collapse')
  document.getElementById('navbarSupportedContent')?.classList.remove('show')
}

watch(route, (to) => {
  closeNavbar()
})

const onLogout = async () => {
  try {
    await logout()
    resetAuth()
    closeNavbar()
    router.push('/login')
  } catch (error: any) {
    toast.error(error.message)
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <img src="@/assets/logo.png" alt="logo" style="max-height: 30px" />
      <RouterLink to="/"> MyPortfolio </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="background-color: transparent"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink to="/gallery" class="nav-link"> Gallery </RouterLink>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink to="/shop" class="nav-link"> Shop </RouterLink>
          </li>
          <li class="nav-item" v-if="hasRole(RoleEnum.admin)">
            <RouterLink to="/admin/panel" class="nav-link"> ADMIN </RouterLink>
          </li>
          <li class="nav-item" v-if="hasRole(RoleEnum.admin)">
            <RouterLink to="/admin/shop" class="nav-link"> ADMIN SHOP </RouterLink>
          </li>
          <div v-if="isLoggedIn">
            <li class="nav-item mt-4 d-block d-md-none border-top">
              <RouterLink to="/profile" class="nav-link"> Profile </RouterLink>
            </li>
            <li class="nav-item d-block d-md-none">
              <RouterLink to="/orders" class="nav-link"> My Orders </RouterLink>
            </li>
            <li class="nav-item d-block d-md-none">
              <button class="btn btn-outlined-primary nav-link" @click="onLogout" type="button">
                Logout <i class="bi bi-box-arrow-left h5"></i>
              </button>
            </li>
          </div>
          <div v-else>
            <li class="nav-item d-block d-md-none">
              <RouterLink to="/login" class="nav-link"> Accedi </RouterLink>
            </li>
            <li class="nav-item d-block d-md-none">
              <RouterLink to="/registration" class="nav-link"> Registrati </RouterLink>
            </li>
          </div>
        </ul>
        <div v-if="!isLoggedIn" class="d-none d-md-block">
          <RouterLink to="/login">
            <button class="btn btn-primary" type="button">Accedi</button>
          </RouterLink>
          <RouterLink to="/registration">
            <button class="btn btn-outelined-primary" type="button">Registrati</button>
          </RouterLink>
        </div>
        <div v-else class="align-items-center d-none d-md-flex">
          <div class="me-5">
            <RouterLink to="/cart" class="nav-link">
              <div>
                <i class="bi bi-cart-fill h5"></i>
                <span class="badge text-bg-secondary">{{ cartItemsCount }}</span>
              </div>
            </RouterLink>
          </div>
          <div class="dropdown d-none d-md-block">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ciao {{ user?.name }} <i class="bi bi-person-circle h5"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li class="dropdown-item">
                <RouterLink
                  to="/profile"
                  class="d-flex justify-content-center text-decoration-none"
                >
                  <button class="btn btn-outlined-primary" type="button">Profile</button>
                </RouterLink>
              </li>
              <li class="dropdown-item">
                <RouterLink to="/orders" class="d-flex justify-content-center text-decoration-none">
                  <button class="btn btn-outlined-primary" type="button">My Orders</button>
                </RouterLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li class="dropdown-item d-flex justify-content-center text-decoration-none">
                <button class="btn btn-outlined-primary" @click="onLogout" type="button">
                  Logout <i class="bi bi-box-arrow-left h5"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
