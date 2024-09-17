<script lang="ts" setup>
import type { ShopableImage } from '@/types/shopable-image.type'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { deleteShopableImage, getAllShopableImages } from '@/services/shopable-image.service'
import { useToast } from 'vue-toast-notification'
import ThumbImage from '@/components/image/ThumbImage.vue'
import ShopableImageUpload from '@/components/shopable-image/ShopableImageUpload.vue'
import { OnClickOutside } from '@vueuse/components'

const toast = useToast()
const key = ref(0)
const images = ref<ShopableImage[]>([])

const showUploadModal = ref(false)
const selectedShopableImage = ref<ShopableImage | undefined>(undefined)

const updateImage = (id: number) => {
  selectedShopableImage.value = images.value.find((image) => image.id === id)
  showUploadModal.value = true
}

const deleteImage = async (id: number) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Continue',
    cancelButtonText: 'Cancel'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteShopableImage(id)
      await loadAllShopableImages()
      toast.success('Image deleted successfully')
    }
  })
}

const onImageUpload = () => {
  loadAllShopableImages()
  showUploadModal.value = false
  selectedShopableImage.value = undefined
}

const uploadNewImage = () => {
  selectedShopableImage.value = undefined
  showUploadModal.value = true
}

const loadAllShopableImages = async () => {
  images.value = await getAllShopableImages()
  key.value++
}

onMounted(() => {
  loadAllShopableImages()
})
</script>
<template>
  <h2 class="mb-3 d-flex mt-4">
    Images
    <button class="btn btn-primary ms-auto" @click="uploadNewImage()" v-if="images.length > 0">
      <i class="bi bi-plus"></i>
    </button>
  </h2>
  <div :key="key" class="row mt-5">
    <div v-if="images.length > 0">
      <div v-for="shopable in images" :key="shopable.id" class="col-md-2 px-4">
        <div class="card">
          <ThumbImage :id="shopable.id" :label="shopable.label" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ shopable.label }} &euro; {{ shopable.price }}</h5>
            <button class="btn btn-primary mx-1" @click="updateImage(shopable.id)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger mx-1" @click="deleteImage(shopable.id)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex align-items-center flex-column pt-5">
      <i class="bi bi-images h1"></i>
      <h3>No images found</h3>
      <button class="btn btn-primary mt-3" @click="uploadNewImage()">
        Upload your first image
      </button>
    </div>
  </div>
  <div class="upload-modal" :class="{ 'd-none': !showUploadModal }">
    <OnClickOutside @trigger="showUploadModal = false">
      <div class="upload-modal-body">
        <ShopableImageUpload
          :shopable-image="selectedShopableImage"
          @image-uploaded="onImageUpload()"
        />
      </div>
    </OnClickOutside>
  </div>
</template>

<style scoped>
.upload-modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.upload-modal-body {
  background-color: white;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: default;
}
</style>
