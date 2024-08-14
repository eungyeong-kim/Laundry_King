<template>
  <v-app>
    <v-navigation-drawer
    v-model="drawer"
    app
    location="right"
    >
      <v-list>
        <v-list-item :title="user?.name ? `안녕하세요, ${user.name} 님` : 'MENU'" class="text-center"></v-list-item>
        <v-divider></v-divider>

        <v-list-item v-for="(item, i) in fnGetMenuItems" :to="item.to" :key="i">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">{{ item.icon }}</span></v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="fnDoLogout" v-if="fnGetAuthStatus" class="logout_btn">
          <v-list-item-title>
            <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">logout</span></v-icon>
            로그아웃
          </v-list-item-title>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
    <v-app-bar app dark color="blue">
    <v-toolbar-title class="d-flex justify-center"><h1 @click="goBack"><img class="logo" src="/images/images/logo-light.png" alt="세탁왕" width="100"/></h1></v-toolbar-title>
    
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
    class="d-flex flex-wrap justify-center align-center mt-16">
    <div class="text-center">
      <img src="/images/images/logo-gray.png" width="150" class="mb-2">
      <p class="text-center" style="color: #aeaeae; font-size: 13px;" >&#40;주&#41;세탁왕 사업자정보<br>
      대표 &#58; 도현숙
      사업자번호 &#58; 637&#45;04&#45;00912<br>
      주소 &#58; 서울시 은평구 연서로15길 34&#44; 1층 101호&#40;구산동&#41;<br>
      연락처 &#58; 1588&#45;4333<br>
      통신판매업신고번호 &#58; 제2021&#45;서울은평&#45;0076호<br></p>
      <p style="color: #aeaeae; font-size: 13px;"class="mt-2">COPYRIGHT &copy; 2024&#46; All rights reserved&#46;</p>
    </div>
    </v-footer>

    <v-dialog v-model="isModalOpen" max-width="400">
      <v-card>
        <v-card-title class="headline"><img src="/images/images/logo-light.png" alt="" width="90px"></v-card-title>

        <v-card-text class="text-center mt-5">
          <p>{{ modalMessage }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" variant="outlined" @click="closeModal">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>



<style>
.logo{
  margin-left: 24px;
  display:block;
  align-items: center;

}
.v-list {
  height: 100%;
}
.logout_btn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
h1 {
  cursor: pointer;
}
.headline {
  background: #2196F3;
  height: 45px;
}
</style>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter} from 'vue-router';

const drawer = ref(false);
const router = useRouter();
const store = useStore();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const goBack = () => {
  router.push('/');
};


// 현재 인증 상태를 가져오는 계산 속성
const fnGetAuthStatus = computed(() => store.getters.fnGetAuthStatus);

// 로그인 여부에 따라 메뉴 항목을 반환하는 계산 속성
const fnGetMenuItems = computed(() => {
  if (!fnGetAuthStatus.value) {
    return [
      {
        title: '홈',
        to: '/',
        icon: 'home',
      },
      {
        title: '로그인',
        to: '/login',
        icon: 'login',
      },
      {
        title: '공지사항',
        to: '/info',
        icon: 'info',
      },
      {
        title: '자주묻는질문',
        to: '/qna',
        icon: 'help',
      },
      {
        title: '이벤트',
        to: '/event',
        icon: 'featured_seasonal_and_gifts',
      },
      {
        title: '이용내역',
        to: '/orderhistory',
        icon: 'receipt_long',
      },
    ];
  } else {
    return [
      {
        title: '홈',
        to: '/',
        icon: 'home',
      },
      {
        title: `마이페이지`,
        to: '/user',
        icon: 'account_circle',
      },
      {
        title: '공지사항',
        to: '/info',
        icon: 'info',
      },
      {
        title: '자주묻는질문',
        to: '/qna',
        icon: 'help',
      },
      {
        title: '이벤트',
        to: '/event',
        icon: 'featured_seasonal_and_gifts',
      },
      {
        title: '이용내역',
        to: '/orderhistory',
        icon: 'receipt_long',
      },
    ];
  }
});

// 로그아웃 메서드
const fnDoLogout = () => {
  store.dispatch('fnDoLogout').then(() => {
    router.push('/login'); // 로그아웃 후 리디렉션
  });
};


// 사용자 데이터 가져오기
const user = computed(() => store.getters.fnGetUser || {});
// const userName = computed(() => store.getters.fnGetUser.value.name || {});

const isModalOpen = computed(() => store.getters['modal/isModalOpen']);
const modalMessage = computed(() => store.getters['modal/modalMessage']);

const closeModal = () => {
  store.dispatch('modal/closeModal');
};


</script>
