<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { Question } from '../types/QuizTypes'; // Import the types
import { RadioButton, Button } from 'primevue';


const props = defineProps<{
    question: Question;
    index: number;
}>();

const selectedAnswer = ref('');

const emit = defineEmits<{
    (e: 'submitAnswer', answer: string): void
}>();

const submitAnswer = () => {
    emit('submitAnswer', selectedAnswer.value);
}


</script>

<template>
    <h2 class="text-xl font-semibold mb-4">{{ props.question.question }}</h2>
    <p class="text-gray-700 mb-4">{{ props.question.text }}</p>
    <div class="flex flex-col gap-4">
        <div v-for="option in props.question.options" :key="option.id" class="flex items-center gap-2">
            <RadioButton v-model="selectedAnswer" :inputId="String(option.id)" name="dynamic" :value="option.optionText"
                class="w-6 h-6 border-2 border-gray-500 rounded-full cursor-pointer" />
            <label :for="String(option.id)" class="cursor-pointer text-lg select-none">
                {{ option.optionText }}
            </label>
        </div>
        <div class="text-center mt-6">
            <Button label="Submit" @click="submitAnswer" />
        </div>
    </div>
</template>

<style scoped></style>
