<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || '—'
</script>

<template>
  <div>
    <h3>Detalhes do Cargo</h3>
    <p>ID: {{ id }}</p>
    <p>Título: Exemplo de Cargo</p>
  </div>
</template>
