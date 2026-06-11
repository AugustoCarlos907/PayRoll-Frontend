<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const items = ref([
    { id: 1, name: 'INSS', amount: '3%' },
    { id: 2, name: 'IRT', amount: '8%' }
])

const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return items.value
    return items.value.filter(d => d.name.toLowerCase().includes(s) || String(d.id).includes(s))
})

function remove(id) {
    if (!confirm('Remover dedução?')) return
    items.value = items.value.filter(d => d.id !== id)
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Dedução</h3>
            <div class="d-flex gap-2">
                <input v-model="q" placeholder="Pesquisar..." class="form-control form-control-sm" style="min-width:200px" />
                <button class="btn btn-sm btn-primary">Novo</button>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="list">
                        <tr v-for="d in filtered" :key="d.id">
                            <td>{{ d.id }}</td>
                            <td>{{ d.name }}</td>
                            <td>{{ d.amount }}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-secondary me-2">Editar</button>
                                <button @click="remove(d.id)" class="btn btn-sm btn-outline-danger">Remover</button>
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all .25s ease }
.list-enter-from { opacity: 0; transform: translateY(-6px) }
.list-leave-to { opacity: 0; transform: translateY(6px) }
</style>