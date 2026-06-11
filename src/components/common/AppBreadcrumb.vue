<template>
  <nav v-if="crumbs.length > 1" aria-label="breadcrumb" class="mb-3">
    <ol class="breadcrumb mb-0">
      <li
        v-for="(crumb, i) in crumbs"
        :key="i"
        class="breadcrumb-item"
        :class="{ active: i === crumbs.length - 1 }"
      >
        <router-link v-if="i < crumbs.length - 1" :to="crumb.path">{{ crumb.label }}</router-link>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const labelMap = {
  '':           'Paínel Administrativo',
  employees:    'Funcionários',
  create:       'Novo',
  departments:  'Departamentos',
  positions:    'Cargos',
  payroll:      'Folha Salarial',
  process:      'Processar',
  attendance:   'Presenças',
  benefits:     'Benefícios',
  deductions:   'Descontos',
  payments:     'Pagamentos',
  reports:      'Relatórios',
  users:        'Utilizadores',
}

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  let path = ''
  return [
    { label: 'Início', path: '/' },
    ...segments.map(seg => {
      path += `/${seg}`
      return { label: labelMap[seg] ?? seg, path }
    })
  ]
})
</script>