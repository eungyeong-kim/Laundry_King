<template>
    <v-container>
        <v-row style="padding:0;">
            <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
            <v-col class="d-flex justify-center align-center mt-2"><h2>로그인</h2></v-col>
            <v-col></v-col>
        </v-row>
        <form @submit.prevent="fnDoLogin">
        <v-row class="d-flex justify-center mt-16">
            <v-col cols="10">
                <v-text-field variant="outlined" :rules="rules" hide-details="auto" label="이메일" name="Email" color="blue" type="email" v-model="sEmail">
                </v-text-field>
                <v-text-field variant="outlined" type="password" class="mt-3" label="비밀번호" name="Password" color="blue" v-model="sPassword"></v-text-field>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-btn width="100%" height="49px" flat color="blue" type="submit">로그인</v-btn>
                <v-btn @click="doGoogleLogin" width="100%" height="49px" variant="outlined" color="blue" class="mt-2"><v-icon class="mr-3">mdi-google</v-icon>구글 로그인</v-btn>
                <v-btn width="100%" height="49px" variant="text" color="blue" class="mt-2" to="/join">회원가입하기</v-btn>
            </v-col>
        </v-row>
        </form>
    </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const sEmail = ref('');
const sPassword = ref('');
const bAlert = ref(false);
const router = useRouter();

// computed 속성
const fnGetLoading = computed(() => store.getters.fnGetLoading);
const fnGetErrMsg = computed(() => store.getters.fnGetErrorMessage);

const doGoogleLogin = async () => {
  try {
    await store.dispatch('fnDoGoogleLogin_Popup');
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
  }
};


const goBack = () => {
  router.push('/');
};

// 메소드 정의
const fnDoLogin = async () => {
  try {
    await store.dispatch('fnDoLogin', {
      pEmail: sEmail.value,
      pPassword: sPassword.value
    });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
  }
};

// watch 정의
watch(fnGetErrMsg, (pMsg) => {
  if (pMsg) bAlert.value = true;
});

watch(bAlert, (pValue) => {
  if (pValue === false) store.commit('fnSetErrorMessage', '');
});



</script>

<style scoped>
.material-symbols-outlined {
    font-size: 80px;
    color: #A1A8BD;
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 24
}
template, div, footer{
    padding:0
}
</style>