import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(false)
  const currentPage = ref('dashboard')

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function navigate(page) {
    currentPage.value = page
  }

  return { sidebarCollapsed, currentPage, toggleSidebar, navigate }
})