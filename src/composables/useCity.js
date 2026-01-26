import { apiFetch } from '@/utils/apiFetch'

export const getCity = async (lat, lon) => {
  const data = await apiFetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
  )

  if (data?.address?.city) return data.address.city
  if (data?.display_name) return data.display_name
  return ''
}
