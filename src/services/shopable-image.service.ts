import type { ShopableImage } from '@/types/shopable-image.type'
import { destroy, get, post, put } from './api.service'

export const getShopableThumbURL = (id: number) => {
  return import.meta.env.VITE_API_URL + '/api/shopableimage/thumb?id=' + id
}

export const getShopableURL = (id: number) => {
  return import.meta.env.VITE_API_URL + '/api/shopableimage?id=' + id
}

export const getAllShopableImages = async (): Promise<ShopableImage[]> => {
  const response = await get('api/shopableimage/all')
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error retrieving the images')
  }
}

export const createShopableImage = async (
  label: string,
  url: string,
  thumbnailURL: string,
  price: number
): Promise<ShopableImage> => {
  const response = await post('api/shopableimage', { label, price, url, thumbnailURL })
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error creating the image')
  }
}

export const updateShopableImage = async (
  id: number,
  label: string,
  url: string,
  thumbnailURL: string,
  price: number
): Promise<ShopableImage> => {
  const response = await put('api/shopableimage?id=' + id, { label, price, url, thumbnailURL })
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error updating the image')
  }
}

export const deleteShopableImage = async (id: number) => {
  const response = await destroy('api/shopableimage?id=' + id)
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error deleting the image')
  }
}

export const generateShopableImageThumb = async () => {
  const response = await post('api/thumbnail?id=1')
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error during the thumbnail generation')
  }
}
