import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import NotFound from '@/components/NotFound.vue'
import ChargePage from '@/components/ChargePage.vue'
import EventDtailPage from '@/components/EventDtailPage.vue'
import EventPage from '@/components/EventPage.vue'
import HoneyPage from '@/components/HoneyPage.vue'
import HowusePage from '@/components/HowusePage.vue'
import InfoPage from '@/components/InfoPage.vue'
import JoinPage from '@/components/JoinPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import OrderHistoryPage from '@/components/OrderHistoryPage.vue'
import OrderInfo from '@/components/OrderInfo.vue'
import OrderSuccessPage from '@/components/OrderSuccessPage.vue'
import PaymentPage from '@/components/PaymentPage.vue'
import PickupApplyPage from '@/components/PickupApplyPage.vue'
import PickupPage from '@/components/PickupPage.vue'
import QnaPage from '@/components/QnaPage.vue'
import UserHistoryPage from '@/components/UserHistoryPage.vue'
import UserPage from '@/components/UserPage.vue'

import store from '@/store';  // Vuex 스토어 import
// 파이어베이스 앱 객체 모듈 가져오기
import firebase from "firebase/compat/app"


const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/main',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
  {
    path: '/charge',
    name: 'charge',
    component: ChargePage,
  },
  {
    path: '/eventdetail',
    name: 'eventdetail',
    component: EventDtailPage,
  },
  {
    path: '/event',
    name: 'event',
    component: EventPage,
  },
  {
    path: '/tip',
    name: 'tip',
    component: HoneyPage,
  },
  {
    path: '/howuse',
    name: 'howuse',
    component: HowusePage,
  },
  {
    path: '/info',
    name: 'info',
    component: InfoPage,
  },
  {
    path: '/join',
    name: 'join',
    component: JoinPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/orderhistory',
    name: 'orderhistory',
    component: OrderHistoryPage,
    meta: { bAuth: true } // 인증이 필요한 페이지
  },
  {
    path: '/orderinfo',
    name: 'orderinfo',
    component: OrderInfo,
  },
  {
    path: '/ordersuccess',
    name: 'ordersuccess',
    component: OrderSuccessPage,
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentPage,
  },
  {
    path: '/pickupapply',
    name: 'pickupapply',
    component: PickupApplyPage,
    meta: { bAuth: true } // 인증이 필요한 페이지
  },
  {
    path: '/pickup',
    name: 'pickup',
    component: PickupPage,
  },
  {
    path: '/qna',
    name: 'qna',
    component: QnaPage,
  },
  {
    path: '/userhistory/:orderId',
    name: 'userhistory',
    component: UserHistoryPage,
    meta: { bAuth: true }, // 인증이 필요한 페이지
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    meta: { bAuth: true } // 인증이 필요한 페이지
  }
]







const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 페이지 전환 시 항상 최상단으로 스크롤
    return { top: 0 };
  }
})

// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
router.beforeEach(async (to, from, next) => {
  const bNeedAuth = to.matched.some(record => record.meta.bAuth);

  if (bNeedAuth) {
    try {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(
          user => {
            unsubscribe(); // 리스너 해제
            resolve(user);
          },
          error => reject(error)
        );
      });

      if (user) {
        next(); // 인증된 상태라면 이동 허용
      } else {
        store.dispatch('modal/openModal', '로그인 후 이용 가능한 페이지입니다.');
        next('/login'); // 인증되지 않았다면 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('Authentication error:', error);
      next('/login');
    }
  } else {
    next(); // 인증이 필요 없는 페이지는 바로 이동
  }
});

export default router
