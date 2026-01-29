<script setup>
import { ref, onMounted } from 'vue'
import { getLocation } from '@/composables/useLocation'
import { getCity } from '@/composables/useCity'
import { getCityImage } from '@/composables/useCityImage'
import { getWeather } from '@/composables/useWeather'
import { DateTime } from 'luxon'

import WidgetWeather from '@/components/WidgetWeather.vue'

const isLoading = ref(true)

const position = ref(null)
const city = ref('')
const error = ref('')
const weather = ref({})

const imageSrc = ref('')

const date = DateTime.now().setLocale('en').toFormat('cccc, d MMMM')

onMounted(async () => {
  try {
    const coordinates = await getLocation()
    position.value = coordinates

    if (coordinates) {
      weather.value = getWeather(coordinates.latitude, coordinates.longitude)
      city.value = await getCity(coordinates.latitude, coordinates.longitude)
    }

    if (city.value) {
      imageSrc.value = await getCityImage(city.value)
    }
  } catch (err) {
    error.value = err
    console.error('Ошибка:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container">
    <span v-if="isLoading">Загрузка...</span>

    <template v-else>
      <span v-if="error">Ошибка: {{ error }}</span>
      <WidgetWeather
        v-else
        :imageSrc="imageSrc"
        :city="city"
        :weather="weather"
        :date="date"
      />
    </template>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  place-content: center;
  height: 100vh;
}
</style>
