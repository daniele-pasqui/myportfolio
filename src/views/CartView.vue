<script lang="ts" setup>
import { getCart, resetCart } from '@/services/cart.service'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import ShopableThumbImage from '@/components/image/ThumbImage.vue'
import { useToast } from 'vue-toast-notification'
import { makeOrder } from '@/services/shop.service'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()
const toast = useToast()

const { cartItems: images } = storeToRefs(cartStore)
const { setCartItems, resetCart: localResetCart } = cartStore

onMounted(async () => {
  setCartItems((await getCart()).images)
})

const buy = async () => {
  try {
    await makeOrder()
    localResetCart()
  } catch (error: any) {
    toast.error(error.message)
  }
}

const reset = async () => {
  try {
    await resetCart()
    localResetCart()
  } catch (error: any) {
    toast.error(error.message)
  }
}
</script>
<template>
  <div v-if="images.length > 0">
    <div class="row">
      <div v-for="shopable in images" :key="shopable.id" class="col-md-2 px-4">
        <div class="card">
          <ShopableThumbImage :id="shopable.id" :label="shopable.label" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ shopable.label }} &euro; {{ shopable.price }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-primary mx-1" @click="buy()">Acquista</button>
      <button class="btn btn-secondary mx-1" @click="reset()">Reset</button>
    </div>
  </div>
  <div v-else class="d-flex align-items-center flex-column pt-5">
    <i class="bi bi-cart-x-fill h1"></i>
    <h3>Your cart is empty</h3>
    <RouterLink to="/orders">
      <button class="btn btn-primary mt-5">My Orders</button>
    </RouterLink>
  </div>
</template>
