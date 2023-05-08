<template>
    <a-layout-footer>
        <div class="footer-container">
            <div class="thanks-text">
                Special Acknowledgement
            </div>
            <div class="avatars">
                <a href="https://github.com/7BlackJack" target="_blank">
                    <a-avatar size="large" :src="avatar1"></a-avatar>
                </a>
                <a href="https://github.com/Efarxs" target="_blank">
                    <a-avatar size="large" :src="avatar2"></a-avatar>
                </a>
            </div>
        </div>
    </a-layout-footer>
</template>

<script setup>
import avatar1 from '@/assets/images/avatars/avatar1.png';
import avatar2 from '@/assets/images/avatars/avatar2.png';
</script>

<style scoped>
.footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    background: #f0f2f5;
}

.thanks-text {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

.avatars {
    display: flex;
    gap: 16px;
}
</style>
