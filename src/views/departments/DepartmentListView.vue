<script setup>
import DepartmentService from '@/services/DepartmentService'
import { ref, computed  , onMounted} from 'vue'

const q = ref('')

onMounted(() => {
    fetchDepartments()
})

async function fetchDepartments() {
    loading.value = true
    error.value   = ''
    try {
        const response = await DepartmentService.getAll()
        departments.value = response.data.data
        console.log(response)
        
    } catch (error) {
        error.value = 'Erro ao carregar departamentos'
    }finally {
        loading.value = false
    }
}

const departments = ref([])
const loading     = ref(false)
const error       = ref('')

function remove(id) {
    if (!confirm('Remover departamento?')) return
    departments.value = departments.value.filter(d => d.id !== id)
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Departamentos</h3>
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
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="list">
                        <tr v-for="dep in departments" :key="dep.id">
                            <td>{{ dep.id }}</td>
                            <td>{{ dep.name }} - <b> ({{ dep.code }})</b></td>
                            <td>{{ dep.description }}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-2">Ver</button>
                                <button class="btn btn-sm btn-outline-secondary me-2">Editar</button>
                                <button @click="remove(dep.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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