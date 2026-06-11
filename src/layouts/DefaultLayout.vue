<script setup>
import AppSidebar    from '@/components/common/AppSidebar.vue'
import AppHeader     from '@/components/common/AppHeader.vue'
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue'
import AppFooter     from '@/components/common/AppFooter.vue'

</script>


<template>
  <div class="d-flex min-vh-100">
    <AppSidebar />
    <div class="main-content d-flex flex-column flex-grow-1">
      <AppHeader />
      <main class="p-4 flex-grow-1">
        <AppBreadcrumb />
        <router-view />
      </main>
      <AppFooter />
    </div>
  </div>
</template>


