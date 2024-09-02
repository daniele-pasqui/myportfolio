<script setup lang="ts">
import FullScreenLoadingSpinner from '@/components/FullScreenLoadingSpinner.vue'
import ThumbImage from '@/components/image/ThumbImage.vue'
import { getMyWorks, getWork } from '@/services/work.service'
import type { Work } from '@/types/work.type'
import { onMounted, ref, watch } from 'vue'

const works = ref<Work[]>([])
const loading = ref<boolean>(true)
const selectedWork = ref<number | null>(null)
const images = ref<number[]>([])

onMounted(async () => {
  try {
    works.value = await getMyWorks()
  } catch (err) {
    console.error(err)
  }
  loading.value = false
})

watch(selectedWork, async (newWork) => {
  if (newWork) {
    images.value = (await getWork(newWork)).images
  }
})
</script>
<template>
  <FullScreenLoadingSpinner v-if="loading" />
  <div v-else>
    <div v-if="works.length > 0">
      <select v-model="selectedWork" class="form-select" aria-label="Default select example">
        <option v-for="work in works" :value="work.id" v-bind:key="work.id">
          {{ work.title }}
        </option>
      </select>
      <div v-if="images">
        <div v-for="image in images" :key="image" class="col-md-2 px-4">
          <div class="card">
            <ThumbImage :id="image" :shopable="false" class="card-img-top" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex align-items-center flex-column pt-5">
      <i class="bi bi-images h1"></i>
      <h3>No works found</h3>
      Contact the administrator
    </div>
  </div>
</template>
