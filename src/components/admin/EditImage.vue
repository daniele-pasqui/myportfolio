<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import { updateImage } from '@/services/image.service'

const props = defineProps<{
  imageId: number
}>()

const { imageId } = toRefs(props)

const emit = defineEmits(['imageUploaded'])

const imagesPath = import.meta.env.VITE_IMAGES_BASE_PATH
const imagesThumbPath = imagesPath + 'thumb/'

const toast = useToast()

const label = ref('')
const image = ref<string | null>(null)

const onFileChanged = (event: any) => {
  const target = event.target as HTMLInputElement
  if (target && target.files && target.files.length > 0) {
    image.value = target.files[0].name
  } else {
    image.value = null
  }
}

watch(imageId, () => {
  image.value = null
  label.value = ''
})

const onSubmit = async () => {
  if (!image.value || !label.value) {
    return
  }
  try {
    await updateImage(
      imageId.value,
      label.value,
      imagesPath + image.value,
      imagesThumbPath + image.value
    )
    toast.success('Image uploaded successfully')
    emit('imageUploaded')
    image.value = null
    label.value = ''
  } catch (error: any) {
    toast.error(error.message)
  }
}
</script>
<template>
  <div>
    <h2>Update the image data</h2>
    <form @submit.prevent="onSubmit" class="centered-form mt-5">
      <label for="label" class="form-label">Label</label>
      <div class="input-group mb-3">
        <input
          v-model="label"
          required
          type="text"
          class="form-control"
          id="label"
          aria-describedby="label"
        />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">
          Image
          <span v-if="image"> ({{ image }}) </span>
        </label>
        <input class="form-control" type="file" id="image" @change="onFileChanged($event)" />
      </div>
      <div class="text-center mt-5">
        <button type="submit" class="btn btn-primary">Salva</button>
      </div>
    </form>
  </div>
</template>
