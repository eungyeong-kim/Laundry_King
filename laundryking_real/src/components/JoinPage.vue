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
          <!-- Form Fields -->
          <v-text-field
            variant="outlined"
            color="blue"
            name="Name"
            label="이름"
            v-model="sName"
            required
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="Email"
            label="이메일"
            type="email"
            v-model="sEmail"
            required
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="Password"
            label="비밀번호"
            type="password"
            v-model="sPassword"
            required
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="ConfirmPassword"
            label="비밀번호 확인"
            type="password"
            v-model="sConfirmPassword"
            required
            :rules="[fnComparePassword]"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="Phone"
            label="전화번호"
            v-model="sPhone"
            required
            placeholder="숫자만 입력하세요."
            maxlength="11"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="Birth"
            label="생년월일"
            v-model="sBirth"
            required
            placeholder="ex) 970717"
            maxlength="6"
          ></v-text-field>
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
            <v-btn class="post_btn" variant="outlined" color="blue" @click="showAddressModal = true">
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
          ></v-text-field>
          <v-text-field
            variant="outlined"
            color="blue"
            name="Adressdetail"
            label="상세주소"
            v-model="sAdressdetail"
            required
          ></v-text-field>

          <!-- 약관 보기 버튼 -->
          <v-btn 
            @click="showTermsModal = true" 
            class="mt-3" 
            height="49px" 
            :color="termsButtonColor"
            flat
            dark>
            이용약관 동의
          </v-btn>

          <!-- 회원가입 버튼 -->
          <v-btn
            type="submit"
            :disabled="!agreedToTerms"
            height="49px"
            width="100%"
            color="blue"
            dark
            class="mt-15"
          >
            회원가입
          </v-btn>
          <v-alert type="error" dismissible v-model="bAlert">
            {{ fnGetErrMsg }}
          </v-alert>
        </form>
      </v-col>
    </v-row>

    <!-- 약관 동의 모달 -->
    <v-dialog v-model="showTermsModal" max-width="600px">
      <v-card>
        <v-card-title class="headline">약관 동의</v-card-title>
        <v-card-text>
          <!-- 약관 내용 -->
          <div class="term_box">
            <p><span>제1조</span><br>
              이 약관은 세탁왕이 제공하는 개인정보이용의 이용조건 및 절차에 대해 규정함을 목적으로 합니다.<br>
              <br>
              <span>제2조</span><br>
              "회원"이라 함은 회사와 서비스 이용에 관한 계약을 체결한 자를 의미합니다.<br>
              "서비스"란 회사가 제공하는 모든 온라인 서비스 및 관련 서비스와 기능을 의미합니다.<br>
              <br>
              <span>제3조</span><br>
              회원은 약관을 읽고 동의한 후 회원 가입을 완료해야 합니다. 약관에 동의하지 않을 경우, 서비스 이용이 제한될 수 있습니다.<br>
              <br>
              <span>제4조</span><br>
              회원가입을 위해서는 회사가 요구하는 정보를 제공해야 하며, 제공된 정보는 정확하고 최신이어야 합니다.<br>
              회원가입 신청이 승인되면, 회원은 서비스 이용을 시작할 수 있습니다.<br>
              <br>
              <span>제5조</span><br>
              회사는 회원의 개인정보를 보호하기 위해 최선의 노력을 다하며, 개인정보 보호법에 따라 회원의 개인정보를 처리합니다.<br>
              개인정보 수집 및 이용 목적, 보유 기간 등은 회사의 [개인정보 처리방침]을 따릅니다.<br>
              <br>
              <span>제6조</span><br>
              회사는 서비스의 변경, 추가 또는 종료를 언제든지 할 수 있으며, 이에 대한 사전 공지 없이도 회원에게 통지할 수 있습니다.<br>
              서비스 종료 시 회원의 개인정보는 삭제되며, 회원은 이를 확인하고 동의해야 합니다.<br>
              <br>
              <span>제7조</span><br>
              회원은 서비스 이용 시 타인의 권리를 침해하거나 법령을 위반하지 않도록 해야 합니다.<br>
              회원은 자신의 계정 정보를 안전하게 관리해야 하며, 타인에게 이를 공유하거나 양도하지 않아야 합니다.<br>
              <br>
              <span>제8조</span><br>
              회사는 천재지변, 불가항력적 사유 등으로 인해 서비스가 일시 중단되거나 이용이 불가능한 경우, 책임을 지지 않습니다.<br>
              회사는 회원의 귀책 사유로 인한 손해에 대해 책임을 지지 않습니다.<br>
              <br>
              <span>제9조</span><br>
              회사는 필요에 따라 약관을 개정할 수 있으며, 개정된 약관은 서비스에 공지하여 회원에게 알립니다.<br>
              회원은 약관 개정 후에도 계속 서비스를 이용함으로써 개정된 약관에 동의한 것으로 간주됩니다.<br>
              <br>
              <span>제10조</span><br>
              서비스 이용과 관련하여 발생한 분쟁은 회사 본사의 관할 법원에서 해결합니다.
            </p>
          </div>
          <v-checkbox
            v-model="agreedToTermsInModal"
            label="약관에 동의합니다."
            class="mt-10"
            color="blue-accent-4"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn @click="confirmTerms" variant="outlined" color="blue" class="mb-5">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sName: "",
      sEmail: "",
      sPassword: "",
      sConfirmPassword: "",
      sPhone: "",
      sBirth: "",
      sPost: "",
      sAdress: "",
      sAdressdetail: "",
      bAlert: false,
      showAddressModal: false,
      showTermsModal: false, // 약관 동의 모달 상태
      agreedToTerms: false, // 약관 동의 상태
      agreedToTermsInModal: false, // 모달에서 약관 동의 상태
    };
  },
  computed: {
    fnComparePassword() {
      if (this.sPassword === this.sConfirmPassword) return true;
      else return "비밀번호가 일치하지 않습니다!";
    },
    fnGetLoading() {
      return this.$store.getters.fnGetLoading;
    },
    fnGetErrMsg() {
      return this.$store.getters.fnGetErrorMessage;
    },
    termsButtonColor() {
      return this.agreedToTerms ? 'blue-accent-4' : 'grey lighten-1'; // 동의 여부에 따라 색상 변경
    },
    // 전화번호 검증 규칙
    phoneNumberRule() {
      return [
        v => !!v || '전화번호를 입력해 주세요.',
        v => /^\d{11}$/.test(v) || '전화번호는 11자리 숫자만 입력할 수 있습니다.',
      ];
    },
  },
  methods: {
    async fnRegisterUser() {
      if (!this.agreedToTerms) {
        this.showTermsModal = true; // 약관 동의 모달 표시
        return;
      }

      if (this.fnComparePassword === true) {
        await this.$store.dispatch("fnRegisterUser", {
          pName: this.sName,
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
    confirmTerms() {
      this.agreedToTerms = this.agreedToTermsInModal; // 모달에서의 동의 상태 설정
      this.showTermsModal = false; // 모달 닫기
    },
  },
  watch: {
    fnGetErrMsg(pMsg) {
      if (pMsg) this.bAlert = true;
    },
    bAlert(pValue) {
      if (pValue === false) this.$store.commit("fnSetErrorMessage", "");
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
.headline {
  background: #2196F3;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
}
.term_box {
  padding: 5px;
  font-size: 14px;
}
.term_box span {
  font-weight: bold;
}
</style>
