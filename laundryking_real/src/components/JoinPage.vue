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
          <p class="pb-5">회원 정보를 입력해주세요.</p>
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
            <v-text-field
              variant="outlined"
              color="blue"
              name="Phone"
              label="전화번호"
              v-model="sPhone"
              required
              placeholder="숫자만 입력하세요."
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Birth"
              label="생년월일"
              v-model="sBirth"
              required
              placeholder="ex) 970717"
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Post"
              label="우편번호"
              v-model="sPost"
              required
              readonly
              width="70%"
            >
            <v-btn class="post_btn" variant="outlined" color="blue"  @click="showAddressModal = true">
              주소검색
            </v-btn>
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Adress"
              label="기본주소"
              v-model="sAdress"
              required
              readonly
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              color="blue"
              name="Adressdetail"
              label="상세주소"
              v-model="sAdressdetail"
              required
            >
            </v-text-field>
            <v-btn
              type="submit"
              v-if="!fnGetLoading"
              height="49px"
              width="100%"
              color="blue"
              dark
              class="mt-15"
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
        sPhone: "",
        sBirth: "",
        sPost: "",
        sAdress: "",
        sAdressdetail: "",
        bAlert: false,
        showAddressModal: false, // 모달 상태
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
            pPhone: this.sPhone,
            pBirth: this.sBirth,
            pPost: this.sPost,
            pAdress: this.sAdress,
            pAdressdetail: this.sAdressdetail
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      loadKakaoAddressAPI() {
        if (!window.daum) return;

        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => {
          new daum.Postcode({
            oncomplete: (data) => {
              this.sPost = data.zonecode;
              this.sAdress = data.address;
              this.showAddressModal = false;
            },
          }).open();
        };
        document.head.appendChild(script);
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
      showAddressModal(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.loadKakaoAddressAPI();
          });
        }
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

  .post_btn {
    position: absolute;
    right: -43%;
    height: 100%;
    width: 41%;
  }
  </style>
  