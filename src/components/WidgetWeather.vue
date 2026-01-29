<script setup>
import placeholder from '@/assets/images/placeholder.png'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  weather: {
    type: Object,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
})

const getCardGradient = () => {
  const prefix = 'card__top--'
  let value = 'cold'
  const temperature = props.weather.temperature
  if (temperature > -10 && temperature <= 10) {
    value = 'cool'
  } else if (temperature > 10 && temperature <= 20) {
    value = 'warm'
  } else if (temperature > 20) {
    value = 'hot'
  }

  return prefix + value
}
</script>

<template>
  <div class="card">
    <div class="card__top" :class="getCardGradient()">
      <img class="card__top-image" :src="imageSrc || placeholder" alt="" />
      <div class="card__top-info">
        <span class="temperature">{{ weather.temperature || '??' }}</span>
        <span class="city">{{ city || 'Gotham' }}</span>
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__wrapper">
        <span class="date">{{ date }}</span>
        <span class="description">{{ weather.description || '??' }}</span>
        <span class="temperatures">
          {{ weather.temperatureMin || '??' }}&deg;&nbsp;/&nbsp;{{
            weather.temperatureMax || '??'
          }}&deg;</span
        >
      </div>
      <div class="icon">
        <img :src="weather.icon" alt="weather icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-rows: 239px 93px;
  width: 243px;
  height: 332px;
  box-shadow: 0px 8px 16px rgba(24, 19, 6, 0.25);
  border-radius: 16px;
  overflow: hidden;
}

.card__top {
  position: relative;
  color: white;
}

.card__top::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Холодно */
.card__top--cold::before {
  background: linear-gradient(
    to bottom right,
    rgba(0, 128, 255, 0.7),
    rgba(173, 216, 230, 0.7)
  );
}

/* Прохладно */
.card__top--cool::before {
  background: linear-gradient(
    to bottom right,
    rgba(173, 216, 230, 0.7),
    rgba(102, 205, 170, 0.7)
  );
}

/* Тепло */
.card__top--warm::before {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 153, 0.7),
    rgba(255, 182, 119, 0.7)
  );
}

/* Жарко */
.card__top--hot::before {
  background: linear-gradient(
    to bottom right,
    rgba(255, 140, 0, 0.7),
    rgba(255, 69, 0, 0.7)
  );
}

.card__top-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__top-info {
  position: absolute;
  top: 25px;
  left: 25px;
  display: grid;
  place-items: center;
  gap: 8px;
  max-width: calc(100% - 50px);
}

.temperature {
  font-size: 40px;
  font-weight: 600;
  position: relative;
}

.city {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
}

.temperature::after {
  content: '°';
  position: absolute;
  top: -10px;
  right: -20px;
}

.card__bottom {
  background-color: white;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 50px;
}

.date {
  color: #191919;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  opacity: 0.3;
}

.description,
.temperatures {
  color: #6b6b6b;
  font-size: 12px;
  font-weight: 700;
  opacity: 0.4;
}

.icon {
  align-self: flex-end;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card__wrapper {
  display: grid;
}
</style>
