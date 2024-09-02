import type { Work, WorkDetail } from '@/types/work.type'
import { destroy, get, patch, post, put } from './api.service'

export const getAllWorks = async (): Promise<Work[]> => {
  const response = await get('api/work/all')
  return response.json()
}

export const getMyWorks = async (): Promise<Work[]> => {
  const response = await get('api/work/mywork')
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error retrieving the works')
  }
}

export const createWork = async (
  title: string,
  company: string,
  completionDate: string
): Promise<Work> => {
  const response = await post('api/work', { title, company, completionDate })
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error creating the work')
  }
}

export const updateWork = async (
  id: number,
  title: string,
  company: string,
  completionDate: string
) => {
  const response = await put('api/work?id=' + id, { title, company, completionDate })
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error updating the work')
  }
}

export const deleteWork = async (id: number) => {
  const response = await destroy('api/work?id=' + id)
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error deleting the work')
  }
}

export const getWork = async (id: number): Promise<WorkDetail> => {
  const response = await get('api/work?id=' + id)
  return response.json()
}

export const saveVisibleWorks = async (userId: number, works: number[]): Promise<void> => {
  const response = await patch('api/work/visible-works?userId=' + userId, works)
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error saving visible works')
  }
}
