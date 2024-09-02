import { post, put } from './api.service'
import { type RegistrationUserData, type AuthUser } from '../types/user.type'

export const login = async (username: string, password: string): Promise<AuthUser> => {
  const response = await post('api/auth/signin', { username, password })
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error during login process')
  }
}

export const register = async (data: RegistrationUserData) => {
  const response = await post('api/auth/signup', data)
  const body = await response.json()
  if (response.ok) {
    return body
  } else {
    throw new Error(body.message ?? 'Error during the registration process')
  }
}

export const logout = async () => {
  const response = await post('api/auth/signout')
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message ?? 'Error during logout process')
  }
}

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const response = await put('api/auth/updatepwd', { oldPassword, newPassword })
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? 'Error updating the password')
  }
}
