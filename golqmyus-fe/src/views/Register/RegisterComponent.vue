<script setup lang="ts">
import { useToast } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { reactive, ref } from 'vue';
import { InputText, Message, Button } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms';
import Password from 'primevue/password';
import type { UserRegister } from './Types/UserRegister';
import { checkUsername, registerUser } from '@/services/userService';

const toast = useToast();
const isUsernameAvailable = ref<boolean | null>(null);
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
            email: z.string().email("Invalid email address."),
            firstName: z.string().min(1, "First Name is required."),
            lastName: z.string().min(1, "Last Name is required."),
            username: z.string().min(1, "Username is required."),
            password: z.string().min(6, "Password must be at least 6 characters."),
            confirmPassword: z.string().min(6, "Confirm Password is required."),
            imageUrl: z.string().url("Invalid URL for profile picture.").optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords must match.",
            path: ["confirmPassword"], // Highlight confirmPassword on mismatch
        })
);

const onFormSubmit = async (event: FormSubmitEvent) => {
    const values = event.values as UserRegister;
    const { confirmPassword, ...userData } = values;
    try {
        await registerUser(userData);
        toast.add({
            severity: "success",
            summary: "Success",
            detail: "User registered successfully!",
        });
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to register user.",
        });
    }
};
//TODO: Check the Email too
const onCheckUsername = async () => {

    const username: string = initialValues.username;

    if (!username) return;

    try {
        const isAvailable = await checkUsername(username);
        if (isAvailable) {
            isUsernameAvailable.value = false;
            console.log(isUsernameAvailable.value)
        } else {
            isUsernameAvailable.value = true;
            console.log(isUsernameAvailable.value)
        }
    } catch (error: unknown) {
        console.log("UserName Validation Check FAILED!!!")
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="flex flex-col px-6 py-4 gap-4 rounded-xl w-full max-w-lg bg-[#047857]">
            <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
                class="flex flex-col gap-3">
                <!-- Email -->
                <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
                    <label for="email" class="text-[#000000] font-semibold">Email</label>
                    <InputText id="email" type="email" placeholder="Enter your email" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- First Name -->
                <FormField v-slot="$field" name="firstName" class="flex flex-col gap-1">
                    <label for="firstName" class="text-[#000000] font-semibold">First Name</label>
                    <InputText id="firstName" type="text" placeholder="Enter your first name" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Last Name -->
                <FormField v-slot="$field" name="lastName" class="flex flex-col gap-1">
                    <label for="lastName" class="text-[#000000] font-semibold">Last Name</label>
                    <InputText id="lastName" type="text" placeholder="Enter your last name" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Username -->
                <FormField v-slot="$field" name="username" class="flex flex-col gap-1">
                    <label for="username" class="text-[#000000] font-semibold" @blur="onCheckUsername">Username</label>
                    <InputText id="userName" type="text" placeholder="Enter your username" v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>
                <!-- ImageUrl -->
                <FormField v-slot="$field" name="imageUrl" class="flex flex-col gap-1">
                    <label for="imageUrl" class="text-[#000000] font-semibold">Profile Picture (Optional) </label>
                    <InputText id="imageUrl" type="text" placeholder="Enter the URL path " v-model="$field.value"
                        class="!bg-white/80 !border-0 !p-3 !text-primary-50 w-full" />
                </FormField>

                <!-- Password -->
                <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
                    <label for="password" class="text-[#000000] font-semibold">Password</label>
                    <Password id="password" placeholder="Enter your password" v-model="$field.value" toggleMask
                        :inputStyle="{ width: '100%' }" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Confirm Password -->
                <FormField v-slot="$field" name="confirmPassword" class="flex flex-col gap-1">
                    <label for="confirmPassword" class="text-[#000000] font-semibold">Confirm Password</label>
                    <Password id="confirmPassword" placeholder="Confirm your password" v-model="$field.value" toggleMask
                        :inputStyle="{ width: '100%' }" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Submit Button -->
                <Button type="submit" label="Register"
                    class="!p-3 w-full !text-[#000000] !border !border-white/30 hover:!bg-white/10" />
            </Form>

            <div class="text-center mt-2">
                <p class="text-primary-50 text-base">
                    Already have an account?
                    <router-link to="/" class="text-blue-400 underline hover:text-blue-200">
                        Login here
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
