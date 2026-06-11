<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || '—'
</script>

<template>
  <div>
    <h3>Detalhes da Dedução</h3>
    <p>ID: {{ id }}</p>
    <p>Nome: Exemplo</p>
    <p>Valor: 0.00</p>
  </div>
</template>
