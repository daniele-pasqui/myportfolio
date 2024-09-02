import type { Cart } from '@/types/cart.type'
import { destroy, get, post } from './api.service'

export const addImageToCart = async (imageId: number): Promise<Cart> => {
  const response = await post('api/cart?shopableImageId=' + imageId)
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error adding the image to the cart')
  }
}

export const getCart = async (): Promise<Cart> => {
  const response = await get('api/cart')
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error retrieving the cart')
  }
}

export const resetCart = async () => {
  const response = await destroy('api/cart/empty')
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error retrieving the cart')
  }
}
