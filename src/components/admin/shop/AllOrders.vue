<script lang="ts" setup>
import OrdersList from '@/components/order/OrdersList.vue'
import { getAllOrders } from '@/services/shop.service'
import type { Order } from '@/types/order.type'
import { onMounted, ref } from 'vue'

const orders = ref<Order[]>([])

const loadOrders = async () => {
  orders.value = await getAllOrders()
}
1
onMounted(() => {
  loadOrders()
})
</script>
<template>
  <div class="mt-4">
    <div v-if="orders.length > 0">
      <h2 class="mb-5">Orders</h2>
      <OrdersList :orders="orders" :show-hash="true" />
    </div>
    <div v-else class="d-flex align-items-center flex-column pt-5">
      <i class="bi bi-shop h1"></i>
      <h3>No orders found</h3>
    </div>
  </div>
  <div>
    Tastino vedi dettagli: GET /api/shop/orderdetail?id=id<br />
    e mostro tutti i dettagli dell'ordine (immagini)<br />
  </div>
</template>
