<script setup lang="ts">
import { useToast } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { reactive } from 'vue';
import { InputText, Message, Button } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms';
import Password from 'primevue/password';
import type { UserRegister } from './Types/UserRegister';
import { checkEmail, checkUsername, loginUser, registerUser } from '@/services/userService';
import { useRouter } from 'vue-router';
import type { LoginRequest } from '@/types/auth';
import { useLoaderStore } from '@/stores/loaderStore';
import { useUserStore } from '@/stores/userStore';

const toast = useToast();
const router = useRouter();
const loaderStore = useLoaderStore();
const userStore = useUserStore();
const initialValues = reactive<UserRegister>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    imageUrl: "",
});

const resolver = zodResolver(
    z
        .object({
            email: z
                .string()
                .email("Невалиден имейл адрес")
                .refine(async (email) => {
                    try {
                        const isAvailable = await checkEmail(email);
                        return !isAvailable;
                    } catch (error) {
                        console.log("Email Validation Check FAILED!!!");
                        return false;
                    }
                }, "Имейлът вече съществува."),
            firstName: z.string().min(1, "Име е задължително поле."),
            lastName: z.string().min(1, "Фамилия е задължително поле."),
            username: z.string().min(4, "Потребителско име е задължително поле минмум 4 символа.")
                .refine(async (username) => {
                    try {
                        const isAvailable = await checkUsername(username);
                        return !isAvailable;
                    } catch (error) {
                        console.log("UserName Validation Check FAILED!!!");
                        return false;
                    }
                }, "Потребителското Име вече е заето."),
            password: z.string().min(6, "Паролата трябва да е минимум от 6 символа."),
            confirmPassword: z.string().min(6, "Паролата трябва да е минимум 6 символа."),
            imageUrl: z.string().url("Invalid URL for profile picture.").optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Паролите не съвпадат.",
            path: ["confirmPassword"],
        })
);




const onFormSubmit = async (event: FormSubmitEvent) => {
    loaderStore.showLoader();


    const values = event.values as UserRegister;
    const { confirmPassword, ...userData } = values;


    try {
        await registerUser(userData);
        toast.add({
            severity: "success",
            summary: "Успешно",
            detail: "Успешна регистрация",
        });

        // Login the user after succseful register
        const user: LoginRequest = {
            username: values.username,
            password: values.password

        };

        const response = await loginUser(user);
        userStore.login(response.token, response.username, response.imgUrl);
        if (response) {
            loaderStore.hideLoader();
            router.push('/');
        }

    } catch (error) {
        loaderStore.hideLoader();
        toast.add({
            severity: "error",
            summary: "Грешка",
            detail: "Нещо се прецака опитайте отново",
        });
    }
};

</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="flex flex-col px-6 py-4 gap-4 rounded-xl w-full max-w-lg bg-[#047857]">
            <Form :resolver="resolver" @submit="onFormSubmit" :validateOnValueUpdate="false"
                class="flex flex-col gap-3">

                <FormField v-slot="$field" name="email" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="email" class="text-[#000000] font-semibold">Емейл</label>
                    <InputText id="email" type="email" placeholder="Емейл" v-model="initialValues.email"
                        class="!bg-white/80 !border-0 !p-3" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>


                <FormField v-slot="$field" name="firstName" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="firstName" class="text-[#000000] font-semibold">Име</label>
                    <InputText id="firstName" type="text" placeholder="Име" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>


                <FormField v-slot="$field" name="lastName" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="lastName" class="text-[#000000] font-semibold">Фамилия</label>
                    <InputText id="lastName" type="text" placeholder="Фамилия" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>


                <FormField v-slot="$field" name="username" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="username" class="text-[#000000] font-semibold">Потребителско
                        Име</label>
                    <InputText id="userName" type="text" placeholder="Потребителско Име" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <FormField v-slot="$field" name="imageUrl" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="imageUrl" class="text-[#000000] font-semibold">Профилна снимка 'линк' </label>
                    <InputText id="imageUrl" type="text" placeholder="Линк към снимка" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                </FormField>


                <FormField v-slot="$field" name="password" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="password" class="text-[#000000] font-semibold">Парола</label>
                    <Password id="password" placeholder="Парола" v-model="$field.value" toggleMask
                        :inputStyle="{ width: '100%' }" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>


                <FormField v-slot="$field" name="confirmPassword" class="flex flex-col gap-1" :validateOnBlur="true">
                    <label for="confirmPassword" class="text-[#000000] font-semibold">Потвърди Парола</label>
                    <Password id="confirmPassword" placeholder="Потвърди Парола" v-model="$field.value" toggleMask
                        :inputStyle="{ width: '100%' }" />
                    <Message v-if="$field?.invalid" severity="error" variant="outlined">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>


                <Button type="submit" label="Регистрация"
                    class="!p-3 w-full !text-[#000000] !border !border-white/30 hover:!bg-white/10" />
            </Form>

            <div class="text-center mt-2">
                <p class="text-primary-50 text-base">
                    Вече си регистриран ?
                    <router-link to="/" class="text-blue-400 underline hover:text-blue-200">
                        Влезни от тук
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
::v-deep(.p-password-input) {
    background-color: rgba(255, 255, 255, 0.8) !important;
    border: none !important;
    padding: 0.79rem !important;
    color: var(--p-primary-50) !important;
    width: 100%;
}

::v-deep(.p-inputtext::placeholder) {
    color: rgb(21, 21, 27);
}
</style>
