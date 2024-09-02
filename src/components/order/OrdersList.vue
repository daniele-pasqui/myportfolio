<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import type { Order } from '@/types/order.type'
import moment from 'moment'
import { toRefs } from 'vue'

const props = defineProps<{
  orders: Order[]
  showHash?: boolean
}>()

const { orders, showHash = false } = toRefs(props)
</script>

<template>
  <div class="row">
    <div v-for="order in orders" :key="order.id" class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Order #{{ order.id }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">&euro;{{ order.price }}</h6>
          <p class="card-text">
            {{ moment(order.timestamp).format('DD/MM/YYYY HH:mm') }}
          </p>
          <p v-if="showHash">{{ order.hash }}</p>
          <a href="#" class="card-link">Show detail</a>
        </div>
      </div>
    </div>
  </div>
</template>
