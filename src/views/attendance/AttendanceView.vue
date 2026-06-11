<script setup>
import { ref, computed } from 'vue'

const today = new Date()
const weekStart = new Date(today)
weekStart.setDate(today.getDate() - today.getDay())

function addDays(d, n) { const x = new Date(d); x.setDate(d.getDate()+n); return x }

const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))

const employees = ref([
    { id: 1, name: 'Ana Silva' },
    { id: 2, name: 'João Costa' },
    { id: 3, name: 'Mariana Lopes' },
    { id: 4, name: 'Pedro Gomes' }
])

// attendance mock: map of date->employeeId->status
const attendance = ref({})
days.forEach(d => {
    const key = formatKey(d)
    attendance.value[key] = {}
    employees.value.forEach(e => {
        // randomize mock statuses
        const r = Math.random()
        attendance.value[key][e.id] = r < 0.85 ? 'present' : (r < 0.92 ? 'late' : 'absent')
    })
})

function toggleStatus(dateKey, empId) {
    const cur = attendance.value[dateKey][empId]
    const next = cur === 'present' ? 'absent' : 'present'
    attendance.value[dateKey][empId] = next
}

const summary = computed(() => {
    let present = 0, late = 0, absent = 0
    Object.values(attendance.value).forEach(day => {
        Object.values(day).forEach(s => {
            if (s === 'present') present++
            else if (s === 'late') late++
            else absent++
        })
    })
    return { present, late, absent }
})

const dateFormatter = new Intl.DateTimeFormat('pt-PT', { weekday: 'short', day: '2-digit', month: '2-digit' })
function formatDate(d) {
    const [weekday, rest] = dateFormatter.format(new Date(d)).split(', ')
    return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${rest}`
}
function formatKey(d) { return new Date(d).toISOString().slice(0,10) }
function statusLabel(key, id) {
    const s = attendance.value?.[key]?.[id]
    if (!s) return '-' 
    if (s === 'present') return 'Pres'
    if (s === 'late') return 'Atras'
    return 'Falta'
}
function statusClass(key, id) {
    const s = attendance.value?.[key]?.[id]
    return s === 'present' ? 'present' : (s === 'late' ? 'late' : 'absent')
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h3 class="mb-0">Presenças</h3>
                <small class="text-muted">Visão semanal e gestão rápida</small>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary">Exportar</button>
                <button class="btn btn-sm btn-primary">Marcar todas presentes (hoje)</button>
            </div>
        </div>

        <div class="row g-3 mb-3">
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <small class="text-muted">Presentes (semana)</small>
                    <div class="h4">{{ summary.present }}</div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <small class="text-muted">Atrasos</small>
                    <div class="h4">{{ summary.late }}</div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card p-3 h-100">
                    <small class="text-muted">Faltas</small>
                    <div class="h4">{{ summary.absent }}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-sm align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Funcionário</th>
                            <th v-for="d in days" :key="d">{{ formatDate(d) }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="emp in employees" :key="emp.id">
                            <td>{{ emp.name }}</td>
                            <td v-for="d in days" :key="d" class="text-center">
                                <button @click="toggleStatus(formatKey(d), emp.id)" class="btn btn-sm" :class="statusClass(formatKey(d), emp.id)">
                                    {{ statusLabel(formatKey(d), emp.id) }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<!-- helpers moved into <script setup> -->

<style scoped>
.btn.present { background: #d1e7dd; border-color: #badbcc }
.btn.late { background: #fff3cd; border-color: #ffe69c }
.btn.absent { background: #f8d7da; border-color: #f1a6aa }
</style>
