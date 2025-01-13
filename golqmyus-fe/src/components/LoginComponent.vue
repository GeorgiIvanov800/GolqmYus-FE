<script setup lang="ts">
import { ref } from 'vue';
import { Button, Dialog, InputText, useToast } from 'primevue';
import { useUserStore } from '@/stores/userStore';
import type { LoginRequest } from '@/types/auth';
import { loginUser } from '@/services/userService';
import LoaderComponent from './LoaderComponent.vue';
import { useLoaderStore } from '@/stores/loaderStore';

const visible = ref(true);
const loader = useLoaderStore();

const loginValues = ref<LoginRequest>({
    username: '',
    password: '',
});

const toast = useToast();
const userStore = useUserStore();

const onLogin = async () => {
    loader.showLoader();
    try {
        const response = await loginUser(loginValues.value);

        userStore.login(response.token, response.username);

        toast.add({
            severity: "success",
            summary: "Успешно Влизане",
            detail: `Добре Дошъл ${response.username}`,
        });

        visible.value = false;
        loader.hideLoader();
    } catch (error: unknown) {

        toast.add({
            severity: "error",
            summary: "Грешка",
            detail: "Грешно име или парола",
        });

        loginValues.value.username = '';
        loginValues.value.password = '';
        loader.hideLoader();
    };
};
</script>

<template>
    <div class="card flex justify-center">
        <Button label="Влез/Регистрация" icon="pi pi-user" @click="visible = true" />
        <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm"
            closeOnEscape :dismissableMask="true" :modal="true">
            <template #container="{ closeCallback }">
                <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
                    style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                    <img src="../assets/icons/logo2.jpg" alt="logo" width="50" height="100" class="block mx-auto">
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="text-primary-50 font-semibold">Потребителско Име</label>
                        <InputText id="username" v-model="loginValues.username"
                            class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80">
                        </InputText>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="password" class="text-primary-50 font-semibold">Парола</label>
                        <InputText id="password" v-model="loginValues.password"
                            class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" type="password"></InputText>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button label="Отказ" @click="closeCallback" text
                            class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
                        <Button label="Влез" @click="onLogin" text
                            class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-primary-50 text-lg">
                            Нямаш акаунт
                            <router-link to="/register" class="text-blue-400 underline hover:text-blue-200"
                                @click="visible = false">
                                Създай от тук
                            </router-link>
                        </p>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<style scoped></style>