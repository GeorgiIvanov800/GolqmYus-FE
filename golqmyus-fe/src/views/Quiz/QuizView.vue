<script setup lang="ts">
import type { Answer, Question } from './types/QuizTypes';
import { computed, onMounted, ref } from 'vue';
import { getQuestions } from '@/services/quizService'
import QuestionComponent from './components/QuestionComponent.vue';
import { checkAnswer } from './composables/checkAnswer';

const questions = ref<Question[]>([]);
const currentQuestionIndex = ref(0);
const timeLeft = ref(0);
let timeInterval: ReturnType<typeof setInterval>;
let score: number = 0;

onMounted(async () => {
    const data = await getQuestions();
    questions.value = data;
    timeLeft.value = questions.value[0].timeLimit;

});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const handleAnswer = (answer: string) => {

    const correctAnswer: Answer = currentQuestion.value.correctOption;

    if (checkAnswer(answer, correctAnswer)) {
        score++;
    }
    currentQuestionIndex.value++;

    console.log('Score: ', score);
}

</script>

<template>
    <div class="quiz-view max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-6">Quiz Time</h1>
        <!-- Questions Section -->
        <div v-if="currentQuestion">
            <QuestionComponent :question="currentQuestion" :index="currentQuestionIndex" @submitAnswer="handleAnswer" />
        </div>
        <div v-else>
            <h1>Completed</h1>
        </div>
    </div>
</template>