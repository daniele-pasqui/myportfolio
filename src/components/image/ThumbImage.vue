<script setup lang="ts">
import { getImageThumbURL, getImageURL } from '@/services/image.service'
import { getShopableThumbURL, getShopableURL } from '@/services/shopable-image.service'
import Swal from 'sweetalert2'

const {
  id,
  label,
  shopable = true
} = defineProps<{
  id: number
  label?: string
  shopable?: boolean
}>()

const showImage = () => {
  Swal.fire({
    imageUrl: shopable ? getShopableURL(id) : getImageURL(id),
    imageAlt: label,
    showCloseButton: true,
    showConfirmButton: false
  })
}
</script>
<template>
  <img
    :src="shopable ? getShopableThumbURL(id) : getImageThumbURL(id)"
    :alt="label"
    @click="showImage()"
  />
</template>

<style scoped>
img {
  cursor: pointer;
}
</style>
