<template>
  <footer class="bg-white border-top px-4 py-2 text-muted small d-flex justify-content-between">
    <span>PayrollAO &copy; {{ year }}</span>
    <span>v1.0.0</span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>