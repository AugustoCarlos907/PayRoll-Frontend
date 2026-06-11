<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const items = ref([
    { id: 1, name: 'Seguro de saúde', desc: 'Cobertura básica' },
    { id: 2, name: 'Vale alimentação', desc: 'Cartão mensal' }
])

const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return items.value
    return items.value.filter(b => b.name.toLowerCase().includes(s) || b.desc.toLowerCase().includes(s))
})

function remove(id) {
    if (!confirm('Remover benefício?')) return
    items.value = items.value.filter(b => b.id !== id)
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Benefícios</h3>
            <div class="d-flex gap-2">
                <input v-model="q" placeholder="Pesquisar..." class="form-control form-control-sm" style="min-width:200px" />
                <button class="btn btn-sm btn-primary">Novo benefício</button>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="list">
                        <tr v-for="b in filtered" :key="b.id">
                            <td>{{ b.id }}</td>
                            <td>{{ b.name }}</td>
                            <td>{{ b.desc }}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
                                <button @click="remove(b.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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