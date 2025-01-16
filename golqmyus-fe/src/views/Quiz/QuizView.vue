<script setup lang="ts">
import type { Answer, Question } from './types/QuizTypes';
import { computed, onMounted, ref, watch } from 'vue';
import { getQuestions } from '@/services/quizService'
import QuestionComponent from './components/QuestionComponent.vue';
import ProgersBarComponents from "./components/ProgressBarComponent.vue"
import { checkAnswer } from './composables/checkAnswer';
import { Button } from 'primevue';
import { useTimer } from './composables/useTimer';
import { useLoaderStore } from '@/stores/loaderStore';

const TIME_FOR_ANSWER: number = 7;

const { isTimeUp, start, timePercentage } = useTimer();
const loader = useLoaderStore();
const quizStarted = ref<boolean>(false);
const questions = ref<Question[]>([]);
const currentQuestionIndex = ref<number>(0);
let score: number = 0;


onMounted(async () => {
    loader.showLoader();
    const data = await getQuestions();
    questions.value = data;
    loader.hideLoader();
});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const startTimer = () => {
    start(TIME_FOR_ANSWER);
}

const handleAnswer = (answer: string) => {
    if (currentQuestionIndex.value === questions.value.length) {
        return;
    }
    const correctAnswer: Answer = currentQuestion.value.correctOption;

    if (checkAnswer(answer, correctAnswer)) {
        score++;
    }

    currentQuestionIndex.value++;

    if (currentQuestionIndex.value < questions.value.length) {
        start(TIME_FOR_ANSWER);
    }
    console.log('Score: ', score);
}

watch(isTimeUp, (newVal) => {
    if (newVal) {
        handleAnswer('');
    }
})

</script>

<template>
    <div class="quiz-view max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 v-if="!quizStarted" class="text-3xl font-bold text-center mb-6">Провери колко ти е голям ЮСА</h1>

        <div v-if="!quizStarted" class="text-center mt-6">
            <Button label="Започни" @click="quizStarted = true; startTimer()" />
        </div>

        <div v-if="currentQuestion && quizStarted">
            <ProgersBarComponents :progress="timePercentage" />
            <QuestionComponent :question="currentQuestion" :index="currentQuestionIndex" @submitAnswer="handleAnswer" />
        </div>
        <div v-if="quizStarted && currentQuestionIndex >= questions.length">
            <h1 class="text-xl font-semibold text-center mt-6">Верни отговори</h1>
            <p class="text-center mt-4">{{ score }}</p>
            <router-link to="/" class="text-blue-400 underline hover:text-blue-200">
                Върни се в началото
            </router-link>
        </div>
    </div>
</template>