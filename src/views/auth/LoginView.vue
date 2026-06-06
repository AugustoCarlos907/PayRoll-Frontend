<template>
  <div class="min-vh-100 d-flex">

    <!-- LADO ESQUERDO — imagem/branding -->
    <div class="d-none d-lg-flex flex-column justify-content-between bg-dark text-white p-5 col-lg-6">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-cash-stack text-primary fs-3"></i>
        <span class="fw-bold fs-4">PayrollAO</span>
      </div>
      <div>
        <h2 class="fw-bold display-6 mb-3">
          Gestão salarial <br> simples e precisa.
        </h2>
        <p class="text-secondary">
          Conforme a legislação angolana. Cálculo automático de IRT e INSS.
        </p>
      </div>
      <div class="text-secondary small">
        PayrollAO &copy; {{ year }}
      </div>
    </div>

    <!-- LADO DIREITO — formulário -->
    <div class="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4 bg-light">
      <div class="w-100" style="max-width: 420px">

        <!-- Logo mobile -->
        <div class="d-flex d-lg-none align-items-center gap-2 mb-4">
          <i class="bi bi-cash-stack text-primary fs-3"></i>
          <span class="fw-bold fs-4">PayrollAO</span>
        </div>

        <h4 class="fw-bold mb-1">Bem-vindo de volta</h4>
        <p class="text-muted mb-4">Inicia sessão para continuar</p>

        <!-- Alerta de erro -->
        <div v-if="errorMsg" class="alert alert-danger py-2 small" role="alert">
          <i class="bi bi-exclamation-circle me-2"></i>{{ errorMsg }}
        </div>

        <!-- Formulário -->
        <div class="mb-3">
          <label for="email" class="form-label fw-medium">Email</label>
          <div class="input-group">
            <span class="input-group-text bg-white">
              <i class="bi bi-envelope text-muted"></i>
            </span>
            <input
              v-model="form.email"
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="exemplo@empresa.ao"
              @keyup.enter="login"
            />
          </div>
        </div>

        <div class="mb-4">
          <div class="d-flex justify-content-between">
            <label for="password" class="form-label fw-medium">Palavra-passe</label>
          </div>
          <div class="input-group">
            <span class="input-group-text bg-white">
              <i class="bi bi-lock text-muted"></i>
            </span>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              class="form-control"
              placeholder="Password"
              @keyup.enter="login"
            />
            <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
              <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
            </button>
          </div>

          <div>
            <a href="#" class="small text-primary text-decoration-none">Esqueceste a palavra-passe?         ||             Não tem uma conta ?</a><br>
          </div>

        </div>

        <button
          class="btn btn-primary w-100 py-2 fw-medium"
          :disabled="loading"
          @click="login"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'A entrar...' : 'Entrar' }}
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const year = new Date().getFullYear()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const form = reactive({ email: '', password: '' })
const showPassword = ref(false)
const errorMsg = ref('')

async function login() {
  errorMsg.value = ''

  if (!form.email || !form.password) {
    errorMsg.value = 'Preenche todos os campos.'
    return
  }

  loading.value = true

  try {
    await authStore.login(form.email, form.password)
    
    router.push({ name: 'dashboard' })

  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Email ou palavra-passe incorrectos.'
    errorMsg.value = message
  } finally {
    loading.value = false
  }
}
</script>