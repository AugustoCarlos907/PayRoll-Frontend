<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const range = ref('last30')

const runs = ref([
    { id: 1, name: 'Processo Maio 2026', date: '2026-05-31', employees: 120, gross: 35000, net: 32000, status: 'completed' },
    { id: 2, name: 'Processo Abril 2026', date: '2026-04-30', employees: 118, gross: 34000, net: 31000, status: 'completed' },
    { id: 3, name: 'Processo Junho 2026 (r)', date: '2026-06-05', employees: 122, gross: 36000, net: 33000, status: 'processing' }
])

const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return runs.value
    return runs.value.filter(r => r.name.toLowerCase().includes(s) || String(r.id) === s)
})

function toggleProcess(id) {
    const r = runs.value.find(x => x.id === id)
    if (!r) return
    if (r.status === 'processing') { r.status = 'completed' }
    else if (r.status === 'completed') { r.status = 'processing' }
}

function download(id) {
    const r = runs.value.find(x => x.id === id)
    if (!r) return
    alert(`Simulando download do relatório: ${r.name}`)
}

const totals = computed(() => ({
    runs: runs.value.length,
    employees: runs.value.reduce((s, r) => s + r.employees, 0),
    net: runs.value.reduce((s, r) => s + r.net, 0)
}))
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h3 class="mb-0">Folha de Pagamento</h3>
                <small class="text-muted">Processos e históricos</small>
            </div>
            <div class="d-flex gap-2 align-items-center">
                <select v-model="range" class="form-select form-select-sm">
                    <option value="last7">Últimos 7 dias</option>
                    <option value="last30">Últimos 30 dias</option>
                    <option value="all">Todo o histórico</option>
                </select>
                <input v-model="q" placeholder="Pesquisar processo..." class="form-control form-control-sm" style="min-width:220px" />
                <button class="btn btn-sm btn-primary">Processar nova folha</button>
            </div>
        </div>

        <div class="row g-3 mb-3">
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small class="text-muted">Processos</small>
                            <div class="h4 mb-0">{{ totals.runs }}</div>
                        </div>
                        <i class="bi bi-clock-history fs-2 text-primary"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small class="text-muted">Funcionários pagos</small>
                            <div class="h4 mb-0">{{ totals.employees }}</div>
                        </div>
                        <i class="bi bi-people fs-2 text-success"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small class="text-muted">Total líquido (amostra)</small>
                            <div class="h4 mb-0">{{ totals.net.toLocaleString() }} KZ</div>
                        </div>
                        <i class="bi bi-cash-stack fs-2 text-warning"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Processo</th>
                            <th>Data</th>
                            <th>Funcionários</th>
                            <th>Liquido</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="list">
                        <tr v-for="r in filtered" :key="r.id">
                            <td>{{ r.id }}</td>
                            <td>{{ r.name }}</td>
                            <td>{{ r.date }}</td>
                            <td>{{ r.employees }}</td>
                            <td>{{ r.net.toLocaleString() }} KZ</td>
                            <td>
                                <span v-if="r.status === 'completed'" class="badge bg-success">Concluído</span>
                                <span v-else-if="r.status === 'processing'" class="badge bg-warning">Em processamento</span>
                                <span v-else class="badge bg-secondary">—</span>
                            </td>
                            <td class="text-end">
                                <button @click="toggleProcess(r.id)" class="btn btn-sm btn-outline-primary me-2">Toggle</button>
                                <button @click="download(r.id)" class="btn btn-sm btn-outline-secondary">Relatório</button>
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