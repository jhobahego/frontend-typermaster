import { createRouter, createWebHistory } from 'vue-router';
import TypingGame from '../components/TypingGame.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/texts'
    },
    {
      path: '/texts',
      name: 'game',
      component: TypingGame
    }
  ]
});

export default router;
