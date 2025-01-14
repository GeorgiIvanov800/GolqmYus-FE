import { ref } from 'vue'

export function useTimer() {
  const timeLeft = ref<number>(0)
  const isTimeUp = ref<boolean>(false)
  const timePercentage = ref<number>(0)
  let timeInterval: ReturnType<typeof setInterval>

  const start = (initialTime: number) => {
    timeLeft.value = initialTime
    isTimeUp.value = false
    timePercentage.value = 100

    clearInterval(timeInterval)

    timeInterval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
        timePercentage.value = (timeLeft.value / initialTime) * 100
      } else {
        isTimeUp.value = true
        clearInterval(timeInterval)
      }
    }, 1000)
  }

  return { timeLeft, isTimeUp, start, timePercentage }
}
