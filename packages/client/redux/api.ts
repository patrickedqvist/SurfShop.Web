import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/v1',
  timeout: 1000,
  withCredentials: true,
})
