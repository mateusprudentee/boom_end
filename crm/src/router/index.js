import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';

const routes = [
  {
    path: '/',
    component: () => import('@/components/Navbar.vue'),
    children: [
      {
        path: '',
        name: 'Inicio',
        component: () => import('../views/Inicio.vue'),
        meta: { requiresAuth: true } 
      },
    ]
  },
  {
    path: '/forum',
    component: () => import('@/components/Navbar.vue'),
    children: [
      {
        path: '',
        name: 'ForumPage',
        component: () => import('../views/Forum.vue'),
        meta: { requiresAuth: true } 
      },
    ]
  },
  {
    path: '/loja',
    component: () => import('@/components/Navbar.vue'),
    children: [
      {
        path: '',
        name: 'LojaPage',
        component: () => import('../views/LojaPage.vue'),
        meta: { requiresAuth: true } 
      },
    ]
  },
  {
    path: '/carrinho',
    component: () => import('@/components/Navbar.vue'),
    children: [
      {
        path: '',
        name: 'CarrinhoPage',
        component: () => import('../views/CarrinhoPage.vue'),
        meta: { requiresAuth: true } 
      },
    ]
  },
  {
    path: '/punicoes',
    component: () => import('@/components/Navbar.vue'),
    children: [
      {
        path: '',
        name: 'PunicoesPage',
        component: () => import('../views/PunicoesPage.vue'),
        meta: { requiresAuth: true } 
      },
    ]
  },
    {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { public: true } // Rota pública
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { public: true } // Rota pública
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Redireciona rotas não encontradas para a página inicial
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global de navegação
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("username") !== "Visitante";
  
  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } 
  // Se o usuário está autenticado e tenta acessar uma rota pública (login/register)
  else if (isAuthenticated && to.meta.public) {
    next('/'); // Redireciona para a página inicial
  } 
  // Caso contrário, permite o acesso
  else {
    next();
  }
});

export default router;