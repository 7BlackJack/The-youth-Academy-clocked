<template>
  <a-layout>
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
  </a-layout>
</template>

<script setup>
import AppHeader from '@/components/Header.vue';
import AppContent from '@/components/Content.vue';
import AppFooter from '@/components/Footer.vue';
</script>
