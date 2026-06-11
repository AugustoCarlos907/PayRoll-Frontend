<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const users = ref([
	{ id: 1, name: 'Admin', email: 'admin@company.com', role: 'Admin' },
	{ id: 2, name: 'RH', email: 'rh@company.com', role: 'RH' },
	{ id: 3, name: 'Financeiro', email: 'fin@company.com', role: 'Finance' }
])

const filtered = computed(() => {
	const s = q.value.trim().toLowerCase()
	if (!s) return users.value
	return users.value.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.role.toLowerCase().includes(s))
})

function remove(id) {
	if (!confirm('Remover usuário?')) return
	users.value = users.value.filter(u => u.id !== id)
}
</script>

<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-3">
			<h3 class="mb-0">Usuários</h3>
			<div class="d-flex gap-2">
				<input v-model="q" placeholder="Pesquisar..." class="form-control form-control-sm" style="min-width:200px" />
				<button class="btn btn-sm btn-primary">Novo usuário</button>
			</div>
		</div>

		<div class="card">
			<div class="table-responsive">
				<table class="table table-hover mb-0">
					<thead>
						<tr>
							<th>#</th>
							<th>Nome</th>
							<th>Email</th>
							<th>Função</th>
							<th></th>
						</tr>
					</thead>
					<transition-group tag="tbody" name="list">
						<tr v-for="u in filtered" :key="u.id">
							<td>{{ u.id }}</td>
							<td>{{ u.name }}</td>
							<td>{{ u.email }}</td>
							<td>{{ u.role }}</td>
							<td class="text-end">
								<button class="btn btn-sm btn-outline-primary me-2">Editar</button>
								<button @click="remove(u.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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
