export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Геолокация не поддерживается')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        const messages = {
          1: 'Разрешение на получение геолокации отклонено',
          2: 'Ошибка позиционирования',
          3: 'Таймаут получения геолокации',
        }
        reject(messages[error.code] || error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      }
    )
  })
}
