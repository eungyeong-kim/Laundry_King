<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="display-1 my-1">Logged</h2>
          <p class="body-1">로그인 한 사용자만 볼 수 있습니다.</p>
        </v-col>
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
          <!-- 조건부 렌더링을 통해 사용자 데이터가 있을 때만 표시 -->
          <h3 class="pt-2 mt-4 grey lighten-2" v-if="user">{{ user.name }}</h3>
          <p class="pb-2 grey lighten-2" v-if="user">{{ user.email }}</p>
        </v-col>
        <v-col offset="3" cols="6" class="text-center mt-1">
          <v-btn @click="sendPasswordReset" block color="green" large dark>
            <v-icon left>mdi-email</v-icon>
            비밀번호 재설정
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { oFirebaseAuth } from '@/firebase';
  
  // Vuex 스토어를 사용하는 경우
  const store = useStore();
  
  // 사용자 데이터 가져오기
  const user = computed(() => store.getters.fnGetUser);
  
  // 비밀번호 재설정 메소드
  const sendPasswordReset = () => {
    if (user.value?.email) {
      oFirebaseAuth.sendPasswordResetEmail(user.value.email)
        .then(() => {
          console.log('비밀번호 재설정 메일을 발송했습니다!');
        })
        .catch((error) => {
          console.error('비밀번호 재설정 오류:', error);
        });
    } else {
      console.warn('사용자의 이메일이 없습니다.');
    }
  };
  </script>
  
  <style scoped>
  .avatar_style {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  </style>
  