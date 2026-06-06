<template>
  <nav class="sidebar d-flex flex-column py-3 px-2 bg-dark" :class="{ collapsed: uiStore.sidebarCollapsed }">

    <div class="d-flex align-items-center gap-2 px-2 mb-4">
      <i class="bi bi-cash-stack fs-4 text-primary"></i>
      <span class="label fw-bold fs-5 text-white">PayrollAO</span>
    </div>

    <ul class="nav flex-column gap-1 flex-grow-1">
      <li v-for="item in menuItems" >

        <template v-if="item.children">
          <button
            class="nav-link w-100 text-start d-flex align-items-center gap-2 border-0 bg-transparent"
            @click="toggleGroup(item.name)"
          >
            <i :class="['bi', item.icon, 'fs-6']"></i>
            <span class="label flex-grow-1">{{ item.label }}</span>
            <i class="bi label" :class="openGroups.includes(item.name) ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
          </button>
          <ul v-show="openGroups.includes(item.name)" class="nav flex-column ps-3 gap-1 mt-1">
            <li v-for="child in item.children" :key="child.name">
              <button
                class="nav-link w-100 text-start d-flex align-items-center gap-2 border-0 bg-transparent"
                :class="{ active: uiStore.currentPage === child.name }"
                @click="uiStore.navigate(child.name)"
              >
                <i :class="['bi', child.icon, 'fs-6']"></i>
                <span class="label">{{ child.label }}</span>
              </button>
            </li>
          </ul>
        </template>

        <button
          v-else
          class="nav-link w-100 text-start d-flex align-items-center gap-2 border-0 bg-transparent"
          :class="{ active: uiStore.currentPage === item.name }"
          @click="uiStore.navigate(item.name)"
        >
          <i :class="['bi', item.icon, 'fs-6']"></i>
          <span class="label">{{ item.label }}</span>
        </button>

      </li>
    </ul>

    <button
      class="nav-link border-0 bg-transparent d-flex align-items-center gap-2 mt-3"
      @click="uiStore.toggleSidebar()"
    >
      <i class="bi fs-6" :class="uiStore.sidebarCollapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'"></i>
      <span class="label">Recolher</span>
    </button>

  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const openGroups = ref([])

function toggleGroup(name) {
  const i = openGroups.value.indexOf(name)
  i === -1 ? openGroups.value.push(name) : openGroups.value.splice(i, 1)
}

const menuItems = [
  { name: 'dashboard',  label: 'Dashboard',     icon: 'bi-speedometer2' },
  {
    name: 'people', label: 'Colaboradores', icon: 'bi-people',
    children: [
      { name: 'employees',   label: 'Funcionários',  icon: 'bi-person' },
      { name: 'departments', label: 'Departamentos', icon: 'bi-building' },
      { name: 'positions',   label: 'Cargos',        icon: 'bi-briefcase' },
    ]
  },
  { name: 'attendance', label: 'Presenças',      icon: 'bi-calendar-check' },
  { name: 'payroll',    label: 'Folha Salarial', icon: 'bi-file-earmark-text' },
  { name: 'benefits',   label: 'Benefícios',     icon: 'bi-gift' },
  { name: 'deductions', label: 'Descontos',      icon: 'bi-dash-circle' },
  { name: 'payments',   label: 'Pagamentos',     icon: 'bi-credit-card' },
  { name: 'reports',    label: 'Relatórios',     icon: 'bi-bar-chart' },
  { name: 'users',      label: 'Utilizadores',   icon: 'bi-shield-lock' },
]
</script>