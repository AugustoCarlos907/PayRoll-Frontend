<script setup>
const year = new Date().getFullYear()

const features = [
  {
    icon: 'bi-people',
    title: 'Gestão de Funcionários',
    description: 'Cadastro completo com dados pessoais, profissionais, BI, NIF e número INSS.'
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Folha Salarial',
    description: 'Processamento individual ou em lote com cálculo automático de salários.'
  },
  {
    icon: 'bi-calculator',
    title: 'IRT e INSS Automático',
    description: 'Cálculo conforme as tabelas e taxas em vigor na legislação angolana.'
  },
  {
    icon: 'bi-calendar-check',
    title: 'Controlo de Presenças',
    description: 'Registo de presenças, faltas, horas extras e horários de trabalho.'
  },
  {
    icon: 'bi-bar-chart',
    title: 'Relatórios',
    description: 'Relatórios por período, departamento e cargo. Recibos em PDF.'
  },
  {
    icon: 'bi-shield-lock',
    title: 'Controlo de Acessos',
    description: 'Perfis de acesso por módulo: Admin, RH, Financeiro e Funcionário.'
  },
]

const stats = [
  { value: '100%',  label: 'Conforme legislação angolana' },
  { value: 'IRT',   label: 'Cálculo automático' },
  { value: 'INSS',  label: '3% + 8% calculados' },
  { value: '24/7',  label: 'Disponível sempre' },
]
</script>


<template>
  <div>

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <i class="bi bi-cash-stack text-primary fs-4"></i>
        <span class="fw-bold">PayrollAO</span>
      </a>
      <div class="ms-auto">
        <router-link class="btn btn-primary px-4" :to="{ name: 'login' }">
          Entrar
        </router-link>
      </div>
    </nav>

    <!-- HERO -->
    <section class="bg-dark text-white py-5">
      <div class="container py-5 text-center">
        <span class="badge bg-primary mb-3">Sistema de Gestão Salarial</span>
        <h1 class="display-4 fw-bold mb-3">
          Processe salários com <span class="text-primary">precisão e rapidez</span>
        </h1>
        <p class="lead text-secondary mb-4 mx-auto" style="max-width: 600px">
          Plataforma completa para gestão de funcionários, folha salarial,
          cálculo automático de IRT e INSS conforme a legislação angolana.
        </p>
        <div class="d-flex gap-3 justify-content-center">
          <router-link class="btn btn-primary btn-lg px-5" to="/login">
            Começar agora
          </router-link>
          <a class="btn btn-outline-light btn-lg px-5" href="#">
            Saber mais
          </a>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Tudo o que precisas numa só plataforma</h2>
          <p class="text-muted">Desenhado para empresas angolanas</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="feature in features" :key="feature.title">
            <div class="card h-100 border-0 shadow-sm p-4">
              <div class="mb-3">
                <span class="bg-primary bg-opacity-10 text-primary p-3 rounded-3 d-inline-block">
                  <i :class="['bi', feature.icon, 'fs-4']"></i>
                </span>
              </div>
              <h5 class="fw-semibold">{{ feature.title }}</h5>
              <p class="text-muted mb-0">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row text-center g-4">
          <div class="col-md-3" v-for="stat of stats" >
            <div class="fs-1 fw-bold">{{ stat.value }}</div>
            <div class="text-white-50">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-dark text-secondary py-4 text-center">
      <small>PayrollAO &copy; {{ year }} — Todos os direitos reservados</small>
    </footer>

  </div>


</template>

