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
    component: PickupApplyPage
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
    path: '/userhistory',
    name: 'userhistory',
    component: UserHistoryPage,
    meta: { bAuth: true } // 인증이 필요한 페이지
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
  routes
})

// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
router.beforeEach((to, from, next) => {
  const bNeedAuth = to.matched.some(record => record.meta.bAuth)
  const bCheckAuth = firebase.auth().currentUser
  if (bNeedAuth && !bCheckAuth) {
    alert('로그인이 필요한 페이지 입니다.')
    next("/login")
  } else {
    next()
  }
}) 

export default router
