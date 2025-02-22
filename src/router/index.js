import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChecklistDetail from '@/views/ChecklistDetail.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeView },
  {
    path: '/checklist/:id', // A rota deve ter um parâmetro :id
    name: 'checklistDetail', // O nome da rota
    component: ChecklistDetail, // Componente a ser renderizado
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
