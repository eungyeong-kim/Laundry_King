<template>
  <v-container>
    <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>마이페이지</h2></v-col>
        <v-col></v-col>
    </v-row>

    <v-row>
      <v-col dark offset="1" cols="10" class="mt-5 text-center">
        <!-- 안전하게 사용자 데이터 접근 -->
        <img
          v-if="user?.photoURL"
          :src="user.photoURL"
          class="avatar_style"
          alt="User Avatar"
        />
        <img
          v-else
          :src="defaultAvatar"
          class="avatar_style"
          alt="Default Avatar"
        />
        <!-- 조건부 렌더링을 통해 사용자 데이터가 있을 때만 표시 -->
        <h3 class="pt-2 mt-4 grey lighten-2" v-if="user">{{ user.name }} 님</h3>
        <p class="pb-2 grey lighten-2" v-if="user">{{ user.email }}</p>
        <div class="d-flex align-center flex-column pa-6">
          <v-btn-toggle
            variant="outlined"
            divided
          >
            <v-btn to="/orderhistory">나의 이용내역</v-btn>
          </v-btn-toggle>
        </div>
        <v-divider class="my-10"></v-divider>
        <v-card variant="outlined" color="blue">
          <v-card-subtitle class="my-3">내 정보</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="py-5">
            <p class="pb-2 grey lighten-2" v-if="user">{{ formattedBirth }}</p>
            <p class="pb-2 grey lighten-2" v-if="user">{{ formattedPhoneNumber }}</p>
            <!-- 주소 정보가 있는지 확인하여 출력 -->
            <p class="pb-2 grey lighten-2">
              {{ formattedAddress }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-15">
      <v-col cols="5">
        <v-btn width="100%" height="49px" color="blue" flat @click="fnDoLogout">로그아웃</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();

// Vuex 스토어를 사용하는 경우
const store = useStore();

// 사용자 데이터 가져오기
const user = computed(() => store.getters.fnGetUser);

console.log(user.value);

// 로그아웃 메서드
const fnDoLogout = () => {
  store.dispatch('fnDoLogout').then(() => {
    router.push('/login'); // 로그아웃 후 리디렉션
  });
};

const goBack = () => {
  router.push('/');
};

// 전화번호 포맷팅 computed 속성
const formattedPhoneNumber = computed(() => {
  if (!user.value?.phone) return '';
  return user.value.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
});

// 생년월일 포맷팅 computed 속성
const formattedBirth = computed(() => {
  if (!user.value?.birth) return '';
  return user.value.birth.replace(/(\d{2})(\d{2})(\d{2})/, '$1년$2월$3일');
});

// 주소 정보 포맷팅 computed 속성
const formattedAddress = computed(() => {
  if (!user.value?.adress || !user.value?.adressDetail) {
    return '구글에서 받아온 정보가 없습니다.';
  }
  return `${user.value.adress} ${user.value.adressDetail}`;
});

const defaultAvatar = '/images/images/defaultAvatar.png'; // 기본 이미지 URL
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 80px;
  color: #A1A8BD;
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' 0,
    'opsz' 24;
}
template, div, footer {
  padding: 0;
}

.avatar_style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
