import { createRouter, createWebHistory } from 'vue-router';
import InicioPage from '../views/Inicio.vue';
import ForumPage from '../views/Forum.vue';
import LojaPage from '../views/LojaPage.vue';
import ReelsPage from '../views/ReelsPage.vue';
import CarrinhoPage from '../views/CarrinhoPage.vue';
import PunicoesPage from '../views/PunicoesPage.vue';
import ForumTopic from '../views/ForumTopic.vue';
import ForumView from '../views/ForumView.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioPage
  },
  {
    path: '/forum',
    name: 'ForumPage',
    component: ForumPage
  },
  {
    path: '/forum/view/:category/:topic',
    name: 'ForumTopic',
    component: ForumTopic,
    props: route => ({
      ...route.params,
      id: route.query.id // Recebendo o ID como query parameter
    })
  },
  {
    path: '/forum/view/:category',
    name: 'ForumView',
    component: ForumView,
    props: true
  },
  {
    path: '/forum/view/:category',
    redirect: '/forum' // Redireciona URLs inválidas
  },
  {
    path: '/loja',
    name: 'LojaPage',
    component: LojaPage
  },
  {
    path: '/reels',
    name: 'ReelsPage',
    component: ReelsPage
  },
  {
    path: '/carrinho',
    name: 'CarrinhoPage',
    component: CarrinhoPage
  },
  {
    path: '/punicoes',
    name: 'PunicoesPage',
    component: PunicoesPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;