<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const payments = ref([
    { id: 1, employee: 'Ana Silva', amount: 350.00, date: '2024-05-25' },
    { id: 2, employee: 'João Costa', amount: 420.50, date: '2024-05-20' },
    { id: 3, employee: 'Mariana Lopes', amount: 290.75, date: '2024-05-18' }
])

const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return payments.value
    return payments.value.filter(p => p.employee.toLowerCase().includes(s) || String(p.id).includes(s))
})

function remove(id) {
    if (!confirm('Remover pagamento?')) return
    payments.value = payments.value.filter(p => p.id !== id)
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Pagamentos</h3>
            <div class="d-flex gap-2">
                <input v-model="q" placeholder="Pesquisar..." class="form-control form-control-sm" style="min-width:200px" />
                <button class="btn btn-sm btn-primary">Novo pagamento</button>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Funcionário</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="list">
                        <tr v-for="p in filtered" :key="p.id">
                            <td>{{ p.id }}</td>
                            <td>{{ p.employee }}</td>
                            <td>{{ p.amount.toFixed(2) }}</td>
                            <td>{{ p.date }}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-2">Ver</button>
                                <button @click="remove(p.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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