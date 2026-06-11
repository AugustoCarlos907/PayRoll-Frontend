<script setup>
import { reactive } from 'vue'
const form = reactive({ title: '' })
function submit() { alert(`Criado cargo: ${form.title}`) }
</script>

<template>
  <div>
    <h3>Criar Cargo</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Cargo</label>
        <input v-model="form.title" class="form-control" />
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
