import { apiFetch } from '@/utils/apiFetch'
const API_KEY_OPENWEATHERMAP = import.meta.env.VITE_API_KEY_OPENWEATHERMAP

export const getWeather = async (latitude, longitude) => {
  const data = await apiFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OPENWEATHERMAP}&units=metric`
  )

  if (data?.weather?.[0] && data?.main) {
    return {
      main: data.weather[0].main,
      description: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      temperatureMin: Math.round(data.main.temp_min),
      temperatureMax: Math.round(data.main.temp_max),
      temperatureFeelsLike: data.main.feels_like,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    }
  }
  return null
}
