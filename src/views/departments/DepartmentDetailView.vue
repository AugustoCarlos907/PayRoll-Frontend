<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || '—'
</script>

<template>
  <div>
    <h3>Detalhes do Departamento</h3>
    <p>ID: {{ id }}</p>
    <p>Nome: Exemplo de Departamento</p>
    <p>Descrição: (campo de exemplo)</p>
  </div>
</template>
