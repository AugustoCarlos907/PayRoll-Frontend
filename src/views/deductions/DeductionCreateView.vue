<script setup>
import { reactive } from 'vue'
const form = reactive({ name: '', amount: 0 })
function submit() { alert(`Dedução: ${form.name} — ${form.amount}`) }
</script>

<template>
  <div>
    <h3>Criar Dedução</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="form.name" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Valor</label>
        <input type="number" v-model.number="form.amount" class="form-control" />
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
