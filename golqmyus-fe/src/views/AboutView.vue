<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-16 py-12">
        <section class="text-center mb-12">
            <h1 class="text-4xl font-bold text-[#34d399] mb-4">За Нас</h1>
            <p class="text-lg text-gray-300">
                Добре дошли в <span class="text-[#34d399]">Уебсайта На Големия ЮС </span> – вашата крайна дестинация за
                всичко, свързано с
                <span class="text-[#34d399]">Ѫ Голям ЮС Ѫ</span>.
            </p>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-bold text-[#34d399] mb-4">Кои сме ние?</h2>
            <p class="text-gray-300 leading-relaxed">
                <span class="text-[#34d399]">Голям ЮС</span> е българско хип-хоп трио, обичана заради
                уникалния си стил и силни текстове.
                От създаването си през <span class="font-semibold">2016</span> те вдъхновяват феновете с хитове като
                <span class="italic">Глава Първа</span> и <span class="italic">Братски Нож</span>. Музиката им
                съчетава
                елементи от <span class="italic">рап</span> и често използвайки реплики от най-обичаните<span
                    class="italic">Бълграски Филми</span>, създавайки
                незабравимо
                преживяване.
            </p>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-bold text-[#34d399] mb-4">Какво можете да намерите тук?</h2>
            <ul class="text-gray-300 space-y-3 list-disc list-inside">
                <li>
                    <span class="text-[#34d399] font-semibold">Разгледайте албуми:</span> Открийте всяка песен и албум
                    на групата.
                </li>
                <li>
                    <span class="text-[#34d399] font-semibold">Научете повече за артистите:</span> Запознайте се с
                    талантливите
                    личности зад музиката.
                </li>
                <li>
                    <span class="text-[#34d399] font-semibold">Тествайте знанията си:</span> Участвайте във забавен и
                    интерактивен
                    тест, за да видите колко добре познавате групата.
                </li>
            </ul>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-bold text-[#34d399] mb-4">Интересни факти</h2>
            <p class="text-gray-300 leading-relaxed">
                Знаете ли, че? <span class="italic">Голям юс, или голяма носовка, е наименованието, давано на специфична
                    фонема, съществувала в старобългарския език и съответстващите ѝ букви (Ѫ, ѫ) в кирилицата и
                    глаголицата. Буквата изразява носовия гласен звук (он, ън).</span>.
            </p>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-bold text-[#34d399] mb-4">Включете се</h2>
            <p class="text-gray-300 leading-relaxed mb-4">
                Разгледайте нашия раздел с албуми, научете повече за артистите или предизвикайте себе си с теста!
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <router-link to="/albums"
                    class="bg-[#34d399] hover:bg-[#2fbf89] text-black font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Разгледайте Албуми
                </router-link>
                <router-link to="/quiz"
                    class="bg-[#34d399] hover:bg-[#2fbf89] text-black font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Направете Теста
                </router-link>
            </div>
        </section>
    </div>
</template>