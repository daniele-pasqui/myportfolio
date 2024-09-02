<script setup lang="ts">
import ManageShopableImages from '@/components/admin/shop/ManageShopableImages.vue'
import AllOrders from '@/components/admin/shop/AllOrders.vue'
import CheckHash from '@/components/admin/shop/CheckHash.vue'
</script>
<template>
  <h1>Shop Management</h1>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="manage-shopable-images-tab"
        data-bs-toggle="tab"
        data-bs-target="#manage-shopable-images"
        type="button"
        role="tab"
        aria-controls="manage-shopable-images"
        aria-selected="true"
      >
        Manage shopable images
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="all-orders-tab"
        data-bs-toggle="tab"
        data-bs-target="#all-orders"
        type="button"
        role="tab"
        aria-controls="all-orders"
        aria-selected="true"
      >
        All orders
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="check-hash-tab"
        data-bs-toggle="tab"
        data-bs-target="#check-hash"
        type="button"
        role="tab"
        aria-controls="check-hash"
        aria-selected="true"
      >
        Check hash
      </button>
    </li>
  </ul>
  <div class="tab-content">
    <div
      class="tab-pane active"
      id="manage-shopable-images"
      role="tabpanel"
      aria-labelledby="manage-shopable-images-tab"
    >
      <ManageShopableImages />
    </div>
    <div class="tab-pane" id="all-orders" role="tabpanel" aria-labelledby="all-orders-tab">
      <AllOrders />
    </div>
    <div class="tab-pane" id="check-hash" role="tabpanel" aria-labelledby="check-hash-tab">
      <CheckHash />
    </div>
  </div>
</template>
