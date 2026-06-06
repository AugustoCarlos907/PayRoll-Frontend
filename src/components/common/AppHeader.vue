<template>
  <header class="bg-white border-bottom px-4 py-2 d-flex align-items-center justify-content-between">

    <button class="btn btn-sm btn-light" @click="uiStore.toggleSidebar()">
      <i class="bi bi-list fs-5"></i>
    </button>

    <div class="d-flex align-items-center gap-3">

      <!-- Notificações -->
      <button class="btn btn-sm btn-light position-relative">
        <i class="bi bi-bell fs-5"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:0.6rem">
          3
        </span>
      </button>

      <!-- User dropdown -->
      <div class="dropdown">
        <button class="btn btn-sm btn-light d-flex align-items-center gap-2" data-bs-toggle="dropdown">
          <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
               style="width:32px;height:32px;font-size:0.8rem">
            {{ initials }}
          </div>
          <span class="d-none d-md-inline fw-medium">{{ authStore.user?.name }}</span>
          <i class="bi bi-chevron-down small"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
          <li><span class="dropdown-item-text small text-muted">{{ roleLabel }}</span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Perfil</a></li>
          <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Definições</a></li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <button class="dropdown-item text-danger" @click="logout">
              <i class="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </li>
        </ul>
      </div>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore }   from '@/stores/ui'

const authStore = useAuthStore()
const uiStore   = useUiStore()
const router    = useRouter()

const initials = computed(() => {
  const name = authStore.user?.name ?? ''
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
})

const roleLabel = computed(() => ({
  admin:    'Administrador',
  hr:       'Recursos Humanos',
  finance:  'Financeiro',
  employee: 'Funcionário',
}[authStore.user?.role] ?? ''))

function logout() {
  authStore.clearSession()
  router.push('/login')
}
</script>