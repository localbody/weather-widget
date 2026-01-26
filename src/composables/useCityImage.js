import { apiFetch } from '@/utils/apiFetch'
const API_KEY_UNSPLASH = import.meta.env.VITE_API_KEY_UNSPLASH

export const getCityImage = async (cityName) => {
  const data = await apiFetch(
    `https://api.unsplash.com/search/photos?query=city+${cityName}&per_page=1&client_id=${API_KEY_UNSPLASH}`
  )

  return data?.results?.[0]?.urls?.small || null
}
