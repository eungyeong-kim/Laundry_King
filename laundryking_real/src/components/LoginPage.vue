<template>
    <v-container>
        <h2>로그인</h2>
        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-text-field variant="outlined" :rules="rules" hide-details="auto" label="이메일" color="blue" type="email">
                </v-text-field>
                <v-text-field variant="outlined" type="password" class="mt-3" label="비밀번호" color="blue"></v-text-field>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-btn width="100%" height="49px" flat color="blue">로그인</v-btn>
                <v-btn @click="doGoogleLogin" width="100%" height="49px" variant="outlined" color="blue" class="mt-2"><v-icon class="mr-3">mdi-google</v-icon>구글 로그인</v-btn>
                <v-btn width="100%" height="49px" variant="text" color="blue" class="mt-2" to="/join">회원가입하기</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();

const doGoogleLogin = async () => {
  try {
    await store.dispatch('fnDoGoogleLogin_Popup');
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
  }
};
</script>

<style scoped>
h2 {
    margin: 30px 0;
    text-align: center;
}
</style>