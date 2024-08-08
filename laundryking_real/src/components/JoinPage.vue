<template>
    <v-container>
      <v-row style="padding:0;">
        <v-col>
          <button @click="goBack">
            <span class="material-symbols-outlined d-flex align-center mt-1">
              chevron_backward
            </span>
          </button>
        </v-col>
        <v-col class="d-flex justify-center align-center mt-2">
          <h2>회원가입</h2>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col class="text-center" cols="10">
          <form @submit.prevent="fnRegisterUser">
            <v-text-field
            variant="outlined"
            color="blue"
            name="Name"
            label="이름"
            v-model="sName"
            required
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Email"
              label="이메일"
              type="email"
              v-model="sEmail"
              required
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Password"
              label="비밀번호"
              type="password"
              v-model="sPassword"
              required
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="ConfirmPassword"
              label="비밀번호 확인"
              type="password"
              v-model="sConfirmPassword"
              required
              :rules="[fnComparePassword]"
            >
            </v-text-field>
            <v-btn
              type="submit"
              v-if="!fnGetLoading"
              height="49px"
              width="100%"
              color="blue"
              dark
            >
              회원가입
            </v-btn>
            <v-progress-circular
              v-if="fnGetLoading"
              indeterminate
              :width="7"
              :size="70"
              color="blue"
            >
            </v-progress-circular>
            <v-alert type="error" dismissible v-model="bAlert">
              {{ fnGetErrMsg }}
            </v-alert>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sName: "", // 이름 데이터 추가
        sEmail: "",
        sPassword: "",
        sConfirmPassword: "",
        bAlert: false,
      };
    },
    computed: {
      fnComparePassword() {
        if (this.sPassword == this.sConfirmPassword) return true;
        else return "비밀번호가 일치하지 않습니다!";
      },
      fnGetLoading() {
        return this.$store.getters.fnGetLoading;
      },
      fnGetErrMsg() {
        return this.$store.getters.fnGetErrorMessage;
      },
    },
    methods: {
      fnRegisterUser() {
        if (this.fnComparePassword == true) {
          this.$store.dispatch("fnRegisterUser", {
            pName: this.sName, // 이름 정보 추가
            pEmail: this.sEmail,
            pPassword: this.sPassword,
          });
        }
      },
      goBack() {
        this.$router.push("/");
      },
    },
    watch: {
      // getErrorMsg 함수가 오류 메세지를 반환했을 때 메세지 출력
      fnGetErrMsg(pMsg) {
        if (pMsg) this.bAlert = true;
      },
      // checkAlert 값이 false로 바뀌면 store의 오류 메세지 초기화
      bAlert(pValue) {
        if (pValue == false) this.$store.commit("fnSetErrorMessage", "");
      },
    },
  };
  </script>
  
  <style scoped>
  .material-symbols-outlined {
    font-size: 80px;
    color: #a1a8bd;
    font-variation-settings: "FILL" 0, "wght" 100, "GRAD" 0, "opsz" 24;
  }
  template,
  div,
  footer {
    padding: 0;
  }
  </style>
  