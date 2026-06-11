<script setup>
import { ref, computed } from 'vue'

const query = ref('')
const employees = ref([
     { id: 1, name: 'Ana Silva', position: 'Analista', dept: 'RH', hired: '2023-02-10' },
     { id: 2, name: 'João Costa', position: 'Contador', dept: 'Finanças', hired: '2022-11-03' },
     { id: 3, name: 'Mariana Lopes', position: 'Desenvolvedora', dept: 'TI', hired: '2021-07-21' },
     { id: 4, name: 'Pedro Gomes', position: 'Designer', dept: 'Marketing', hired: '2024-01-15' }
])

const filtered = computed(() => {
     const q = query.value.trim().toLowerCase()
     if (!q) return employees.value
     return employees.value.filter(e => (
          String(e.id).includes(q) || e.name.toLowerCase().includes(q) || e.position.toLowerCase().includes(q) || e.dept.toLowerCase().includes(q)
     ))
})

function remove(id) {
     if (!confirm('Remover este item?')) return
     employees.value = employees.value.filter(e => e.id !== id)
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

          <div class="card">
               <div class="table-responsive">
                    <table class="table table-hover mb-0">
                         <thead>
                              <tr>
                                   <th>#</th>
                                   <th>Nome</th>
                                   <th>Cargo</th>
                                   <th>Departamento</th>
                                   <th>Contratado</th>
                                   <th></th>
                              </tr>
                         </thead>
                         <transition-group tag="tbody" name="list" class="align-middle">
                              <tr v-for="emp in filtered" :key="emp.id">
                                   <td>{{ emp.id }}</td>
                                   <td>{{ emp.name }}</td>
                                   <td>{{ emp.position }}</td>
                                   <td>{{ emp.dept }}</td>
                                   <td>{{ emp.hired }}</td>
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
.list-leave-to { opacity: 0; transform: translateY(6px) }
</style>