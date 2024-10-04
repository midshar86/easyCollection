import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/components/HomePage.vue"

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: HomePage
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("@/components/CollectionPage.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router