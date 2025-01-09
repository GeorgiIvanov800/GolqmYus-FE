<script setup lang="ts">

</script>

<template>
    <div class="spinner-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="logo-svg" width="100" height="100">

            <circle cx="50" cy="50" r="48" stroke="#34d399" stroke-width="3" fill="white" />

            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, serif"
                font-size="50" fill="black">
                Ѫ
            </text>
        </svg>
    </div>
</template>

<style scoped>
.spinner-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: transparent;
}

.logo-svg {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>