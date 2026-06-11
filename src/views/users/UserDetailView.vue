<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || '—'
</script>

<template>
  <div>
    <h3>Detalhes do Usuário</h3>
    <p>ID: {{ id }}</p>
    <p>Nome: Exemplo</p>
    <p>Email: exemplo@dominio.com</p>
  </div>
</template>
