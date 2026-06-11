<script setup>
import { reactive } from 'vue'
const form = reactive({ employee: '', amount: 0 })
function submit() { alert(`Pagamento: ${form.employee} — ${form.amount}`) }
</script>

<template>
  <div>
    <h3>Criar Pagamento</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Funcionário</label>
        <input v-model="form.employee" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Valor</label>
        <input type="number" v-model.number="form.amount" class="form-control" />
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
