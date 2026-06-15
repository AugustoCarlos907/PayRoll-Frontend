<script setup>
import { ref, computed, onMounted } from 'vue'
import employeeService from '@/services/employeeService'

const query     = ref('')
const employees = ref([])
const loading   = ref(false)
const error     = ref('')

// onMounted = equivalente ao created() — corre quando o componente abre
// é como o eager loading do Laravel mas no frontend
onMounted(() => {
    fetchEmployees()
})

async function fetchEmployees() {
    loading.value = true
    error.value   = ''
    try {
        const response  = await employeeService.getAll()
        employees.value = response.data.data 
    } catch (err) {
        error.value = 'Erro ao carregar funcionários.'
    } finally {
        loading.value = false
    }
}

// const filtered = computed(() => {
//     const q = query.value.trim().toLowerCase()
//     if (!q) return employees.value
//     return employees.value.filter(e =>
//         String(e.id).includes(q) ||
//         e.first_name.toLowerCase().includes(q) ||
//         e.position?.toLowerCase().includes(q) ||
//         e.department?.toLowerCase().includes(q)
//     )
// })

async function remove(id) {
    if (!confirm('Remover este funcionário?')) return
    try {
        await employeeService.remove(id)
        employees.value = employees.value.filter(e => e.id !== id)
    } catch {
        alert('Erro ao remover.')
    }
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">Funcionários</h3>
            <div class="d-flex gap-2">
                <input v-model="query" placeholder="Pesquisar..." class="form-control form-control-sm" style="min-width:200px" />
                <button class="btn btn-sm btn-primary">Adicionar</button>
            </div>
        </div>

        <!-- Erro -->
        <div v-if="error" class="alert alert-danger py-2 small">
            <i class="bi bi-exclamation-circle me-2"></i>{{ error }}
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Departamento</th>
                            <!-- <th>Contratado</th> -->
                            <th></th>
                        </tr>
                    </thead>

                    <!-- Loading -->
                    <tbody v-if="loading">
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">
                                <span class="spinner-border spinner-border-sm me-2"></span>
                                A carregar...
                            </td>
                        </tr>
                    </tbody>

                    <!-- Vazio -->
                    <tbody v-else-if="employees.length === 0">
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">
                                Nenhum funcionário encontrado.
                            </td>
                        </tr>
                    </tbody>

                    <!-- Dados -->
                    <transition-group v-else tag="tbody" name="list">
                        <tr v-for="emp in employees" :key="emp.id" class="align-middle">
                            <td>{{ emp.id }}</td>
                            <td>{{ emp.first_name }} {{ emp.last_name }}</td>
                            <td>{{ emp.position.name }}</td>
                            <td>{{ emp.department.name  }} - <b>({{ emp.department.code }})</b></td>
                            <!-- <td>{{ emp.hired }}</td> -->
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-2">Ver</button>
                                <button class="btn btn-sm btn-outline-secondary me-2">Editar</button>
                                <button @click="remove(emp.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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
.list-leave-to   { opacity: 0; transform: translateY(6px) }
</style>