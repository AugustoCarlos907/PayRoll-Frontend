<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const items = ref([
	{ id: 1, title: 'Analista', level: 'Senior' },
	{ id: 2, title: 'Contador', level: 'Pleno' },
	{ id: 3, title: 'Desenvolvedor', level: 'Senior' }
])

const filtered = computed(() => {
	const s = q.value.trim().toLowerCase()
	if (!s) return items.value
	return items.value.filter(i => i.title.toLowerCase().includes(s) || i.level.toLowerCase().includes(s))
})

function remove(id) {
	if (!confirm('Remover cargo?')) return
	items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-3">
			<h3 class="mb-0">Cargos</h3>
			<div class="d-flex gap-2">
				<input v-model="q" placeholder="Pesquisar cargo..." class="form-control form-control-sm" style="min-width:200px" />
				<button class="btn btn-sm btn-primary">Novo cargo</button>
			</div>
		</div>

		<div class="card">
			<div class="table-responsive">
				<table class="table table-hover mb-0">
					<thead>
						<tr>
							<th>#</th>
							<th>Título</th>
							<th>Nível</th>
							<th></th>
						</tr>
					</thead>
					<transition-group tag="tbody" name="list">
						<tr v-for="it in filtered" :key="it.id">
							<td>{{ it.id }}</td>
							<td>{{ it.title }}</td>
							<td>{{ it.level }}</td>
							<td class="text-end">
								<button class="btn btn-sm btn-outline-primary me-2">Editar</button>
								<button @click="remove(it.id)" class="btn btn-sm btn-outline-danger">Remover</button>
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