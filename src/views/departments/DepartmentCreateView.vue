<script setup>
import { reactive } from 'vue'
const form = reactive({ name: '' })
function submit() {
  // TODO: call API
  alert(`Criado: ${form.name}`)
}
</script>

<template>
  <div>
    <h3>Criar Departamento</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="form.name" class="form-control" />
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
