<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || '—'
</script>

<template>
  <div>
    <h3>Detalhes do Benefício</h3>
    <p>ID: {{ id }}</p>
    <p>Nome: Exemplo</p>
    <p>Descrição: Exemplo</p>
  </div>
</template>
