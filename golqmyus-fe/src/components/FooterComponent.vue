<script setup lang="ts">
</script>

<template>
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-social">
                <a href="https://facebook.com" target="_blank" aria-label="Facebook">
                    <img src="@/assets//icons/facebook.png" alt="Facebook" class="icon-png">
                </a>
                <a href="https://www.instagram.com/golqm_yus/?hl=bg" target="_blank" aria-label="Instagram">
                    <img src="../assets//icons/instagram.png" alt="Instagram" class="icon-png">

                </a>
                <a href="https://twitter.com" target="_blank" aria-label="Twitter">
                    <img src="@/assets//icons/twitter-x.png" alt="Twitter-X" class="icon-png">
                </a>
                <a href="https://open.spotify.com/artist/5qiw2kRjiOcsYfuKD5Y1Wa" target="_blank" aria-label="Spotify">
                    <img src="..//assets/icons/spotify.png" alt="Spotify" class="icon-png">
                </a>
                <a href="https://www.youtube.com/playlist?list=PLjRHXbJPAFJwy8-KJCGBT9i4ZIU5vNMYM" target="_blank"
                    aria-label="YouTube">
                    <img src="../assets/icons/youtube.png" alt="YouTube" class="icon-png">
                </a>
            </div>
            <div class="footer-separator"></div>
            <p class="footer-copyright">© 2024 Голям Юс. Всички права запазени.</p>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    background-color: #3a3838;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.footer-social {
    display: flex;
    gap: 15px;
}

.footer-social a {
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
}

.footer-social a:hover {
    color: #1e90ff;
}

.footer-social img.icon-png {
    width: 32px;
    height: 32px;
    margin: 0 50px;
    vertical-align: middle;
    transition: transform 0.3s ease;
}

.footer-social img.icon-png:hover {
    transform: scale(1.2);

}

.site-footer .footer-separator {
    margin: 20px 0;
    border-top: 1px solid #ccc;
    width: 100%;
}
</style>
