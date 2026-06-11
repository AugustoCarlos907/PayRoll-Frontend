
<script setup>
import { ref, computed } from 'vue'

const rawUser = localStorage.getItem('user')

const user = rawUser ? JSON.parse(rawUser) : { name: 'Usuário' }

const stats = [
  { title: 'Funcionários', value: 128, icon: 'bi-people' },
  { title: 'Folhas processadas', value: 54, icon: 'bi-file-earmark-text' },
  { title: 'Pagamentos', value: 342, icon: 'bi-cash-stack' },
  { title: 'INSS / IRT', value: '3% / 8%', icon: 'bi-percent' }
]

const recentEmployees = ref([
  { id: 1, name: 'Ana Silva', position: 'Analista', dept: 'RH' },
  { id: 2, name: 'João Costa', position: 'Contador', dept: 'Finanças' },
  { id: 3, name: 'Mariana Lopes', position: 'Desenvolvedora', dept: 'TI' }
])

// Simple sparkline data (no external deps)
const chartData = [120,130,125,140,150,160,155,170]
const maxVal = Math.max(...chartData)
const points = chartData.map((v,i) => `${i*(100/(chartData.length-1))},${100 - (v/maxVal*80)}`).join(' ')

const totalEmployees = computed(() => stats[0].value)
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">Olá, <b>{{ user.name }}</b></h2>
        <small class="text-muted">Bem-vindo ao painel de administração</small>
      </div>

    </div>

    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.title">
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="bg-primary bg-opacity-10 text-primary rounded-3 p-2 d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
              <i :class="['bi', stat.icon, 'fs-4']"></i>
            </div>
            <div>
              <div class="h5 mb-0">{{ stat.value }}</div>
              <small class="text-muted">{{ stat.title }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-7">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Atividade recente</h5>
              <small class="text-muted">Últimos 7 dias</small>
            </div>

            <div class="mb-3" style="height:160px;">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-100 h-100">
                <polyline :points="points" fill="none" stroke="#0d6efd" stroke-width="2" />
              </svg>
            </div>

            <p class="text-muted">Resumo rápido das operações do sistema e notificações.</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="mb-3">Últimos funcionários</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="emp in recentEmployees" :key="emp.id">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-semibold">{{ emp.name }}</div>
                    <small class="text-muted">{{ emp.position }} — {{ emp.dept }}</small>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-outline-primary">Ver</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="mb-3">Funcionários (amostra)</h5>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Departamento</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="emp in recentEmployees" :key="emp.id">
                    <td>{{ emp.id }}</td>
                    <td>{{ emp.name }}</td>
                    <td>{{ emp.position }}</td>
                    <td>{{ emp.dept }}</td>
                    <td><button class="btn btn-sm btn-outline-secondary">Editar</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>