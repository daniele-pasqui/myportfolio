<script lang="ts" setup>
import { getAllShopableImages } from '@/services/shopable-image.service'
import type { ShopableImage } from '@/types/shopable-image.type'
import { onMounted, ref } from 'vue'
import ShopableThumbImage from '@/components/image/ThumbImage.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { addImageToCart } from '@/services/cart.service'
import { useToast } from 'vue-toast-notification'
import { RouterLink } from 'vue-router'

const images = ref<ShopableImage[]>([])

const toast = useToast()
const cartStore = useCartStore()

const { cartItems, cartItemsCount } = storeToRefs(cartStore)
const { addCartItem } = cartStore

onMounted(async () => {
  images.value = await getAllShopableImages()
})

const addToCart = async (shopable: ShopableImage) => {
  try {
    await addImageToCart(shopable.id)
    addCartItem(shopable)
  } catch (error: any) {
    toast.error(error.message)
  }
}

const cartContainsImage = (shopable: ShopableImage) => {
  return cartItems.value.map((i) => i.id).includes(shopable.id)
}
</script>
<template>
  <div class="mb-5 d-flex align-items-center justify-content-between">
    <h1>Shop</h1>
    <RouterLink to="/cart" v-if="cartItemsCount > 0">
      <button class="btn btn-primary mt-5">Your cart</button>
    </RouterLink>
  </div>
  <div v-if="images.length > 0">
    <div v-for="shopable in images" :key="shopable.id" class="col-md-2 px-4">
      <div class="card">
        <ShopableThumbImage :id="shopable.id" :label="shopable.label" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ shopable.label }} &euro; {{ shopable.price }}</h5>
          <button
            class="btn btn-primary mx-1"
            @click="addToCart(shopable)"
            :disabled="cartContainsImage(shopable)"
          >
            <i class="bi bi-cart-plus-fill"></i> Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex align-items-center flex-column pt-5">
    <i class="bi bi-images h1"></i>
    <h3>No images found</h3>
  </div>
</template>
