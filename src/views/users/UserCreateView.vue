<script setup>
import { reactive } from 'vue'
const form = reactive({ name: '', email: '' })
function submit() { alert(`Usuário: ${form.name} — ${form.email}`) }
</script>

<template>
  <div>
    <h3>Criar Usuário</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="form.name" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="form.email" class="form-control" />
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
