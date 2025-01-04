<script setup lang="ts">
import { ref } from 'vue';
import { Button, Dialog, InputText } from 'primevue';

const visible = ref(false);
</script>

<template>
    <div class="card flex justify-center">
        <Button label="Login/Register" icon="pi pi-user" @click="visible = true" />

        <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm"
            closeOnEscape :dismissableMask="true" :modal="true">
            <template #container="{ closeCallback }">
                <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
                    style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                    <img src="../assets/icons/logo2.jpg" alt="logo" width="50" height="100" class="block mx-auto">
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="text-primary-50 font-semibold">Username</label>
                        <InputText id="username" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80"></InputText>
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="password" class="text-primary-50 font-semibold">Password</label>
                        <InputText id="password" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80"
                            type="password"></InputText>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button label="Cancel" @click="closeCallback" text
                            class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
                        <Button label="Sign-In" @click="closeCallback" text
                            class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-primary-50 text-lg">
                            Don't have an account?
                            <a href="#" class="text-blue-400 underline hover:text-blue-200" @click="toggleRegister">
                                Create one
                            </a>
                        </p>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>