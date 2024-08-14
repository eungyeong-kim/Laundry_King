<template>
  <v-app>
    <v-main>
      <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>주문정보</h2></v-col>
        <v-col></v-col>
      </v-row>

      <v-container class="centered-container">
        <v-row class="form-row">
          <v-col cols="12" md="6">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="form-field-wrapper">
                <label for="name">이름</label>
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  :class="['custom-input', { 'is-invalid': !name && !valid }]"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div class="form-field-wrapper">
                <label for="address">배송 주소</label>
                <div class="address-input-wrapper">
                  <v-btn @click="searchAddress" class="address-button">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                  <div class="address-wrapper">
                    <input
                      type="text"
                      id="postalCode"
                      v-model="postalCode"
                      :class="['custom-input', { 'is-invalid': !postalCode && !valid }]"
                      placeholder="우편번호"
                      readonly
                      class="postal-code-input"
                    />
                    <input
                      type="text"
                      id="address"
                      v-model="address"
                      :class="['custom-input', { 'is-invalid': !address && !valid }]"
                      placeholder="기본 주소"
                    />
                  </div>
                  <input
                    type="text"
                    id="detailAddress"
                    v-model="detailAddress"
                    :class="['custom-input', { 'is-invalid': !detailAddress && !valid }]"
                    placeholder="상세 주소"
                    ref="detailAddressInput" 
                  />
                </div>
              </div>
              <div class="form-field-wrapper">
                <label for="phone">연락처</label>
                <div class="phone-input-wrapper">
                  <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    :class="['custom-input', { 'is-invalid': !phone && !valid }]"
                    placeholder="연락처를 입력해주세요"
                  />
                  <v-btn
                    @click="requestVerificationCode"
                    :disabled="phone.length < 9 || phone.length > 11"
                    class="phone-button"
                    :class="{ 'disabled-button': phone.length < 9 || phone.length > 11 }"
                  >
                    인증번호 발송
                  </v-btn>
                </div>
              </div>
              <div class="form-field-wrapper">
                <label for="verificationCode">인증번호</label>
                <div class="verification-input-wrapper">
                  <input
                    type="text"
                    id="verificationCode"
                    v-model="verificationCode"
                    :class="['custom-input', { 'is-invalid': !verificationCode && !valid }]"
                    placeholder="인증번호를 입력해주세요"
                  />
                  <v-btn
                    @click="verifyCode"
                    :disabled="!verificationCode"
                    class="verification-button"
                    :class="{ 'disabled-button': !verificationCode }"
                  >
                    인증번호 확인
                  </v-btn>
                </div>
              </div>
              <v-btn @click="submit" :disabled="!valid" class="submit-button mt-4">
                다음
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';
import { mapState, mapMutations } from 'vuex';
import store from '@/store';  // Vuex 스토어 import

export default {
  data() {
    return {
      name: '',
      address: '',
      detailAddress: '',  // 상세 주소
      phone: '',
      verificationCode: '',
      postalCode: '', // 우편번호 추가
      valid: false,
      sentCode: '', // 서버로부터 받은 인증번호
      orderStatus: '주문완료'
    };
  },
  computed: {
    ...mapState(['order']),
  },
  methods: {
    ...mapMutations(['setOrderInfo']),
    goBack() {
      this.$router.push('/main');
    },
    async submit() {
      if (this.$refs.form.validate() && this.valid) {
        // Vuex에 주문 정보 저장
        this.setOrderInfo({
          name: this.name,
          address: this.address,
          detailAddress: this.detailAddress,  // 상세 주소 저장
          phone: this.phone,
          verificationCode: this.verificationCode,
          postalCode: this.postalCode, // 우편번호 저장
          orderStatus: this.orderStatus
        });
        try {
          // 주문 정보 제출
          await this.$store.dispatch('submitOrder');
          this.$router.push('/orderinfo'); // /orderinfo 페이지로 이동
        } catch (error) {
          console.error('Error submitting order:', error);
          alert('주문 정보 제출 중 오류가 발생했습니다.');
        }
      } else {
        console.log('Form validation failed');
      }
    },
    searchAddress() {
      new daum.Postcode({
        oncomplete: (data) => {
          // 주소와 우편번호를 폼에 자동으로 입력
          this.postalCode = data.zonecode; // 우편번호
          this.address = data.roadAddress; // 도로명 주소
          this.detailAddress = ''; // 상세 주소 초기화

          // 다음 tick에서 상세 주소 입력 필드에 포커스를 설정
          this.$nextTick(() => {
            this.$refs.detailAddressInput.focus();
          });
        },
      }).open();
    },
    requestVerificationCode() {
      // 여기에 서버에 인증번호 발송 요청을 보내는 로직을 추가합니다.
      // 예를 들어, Axios를 사용하여 POST 요청을 보낼 수 있습니다.
      // this.$http.post('/api/send-code', { phone: this.phone }).then(response => {
      //   this.sentCode = response.data.code; // 서버에서 받은 코드 저장
      // });

      // 임시로 랜덤 인증번호 생성
      this.sentCode = Math.floor(100000 + Math.random() * 900000).toString();
      alert('발송된 임시 인증번호: ' + this.sentCode); // 인증번호를 alert로 표시
      this.verificationCode = this.sentCode; // 인증번호 입력 필드에 자동으로 설정
    },
    verifyCode() {
      // 인증번호를 검증하지 않고, valid를 true로 설정하여 폼 제출을 가능하게 합니다.
      store.dispatch('modal/openModal', '인증이 완료되었습니다!');
      this.valid = true; // 인증번호 검증 없이 valid를 true로 설정하여 폼을 제출 가능하게 함
    },
  },
  mounted() {
    // Daum 우편번호 API 스크립트를 동적으로 로드합니다.
    if (!document.querySelector('#daum-postcode-script')) {
      const script = document.createElement('script');
      script.id = 'daum-postcode-script';
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.head.appendChild(script);
    }
  },
};
</script>


<style scoped>
/* 버튼 비활성화 시 적용할 스타일 */
.disabled-button {
  background-color: #E0E0E0 !important;
  color: #9b9a9a !important;
  border: 1px solid #E0E0E0 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

.material-symbols-outlined {
  font-size: 80px;
  color: #A1A8BD;
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
}

.v-icon {
  color: #202020;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-row {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-field-wrapper {
  margin-bottom: 16px;
}

.form-field-wrapper label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.custom-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #E0E0E0;
  background-color: transparent;
  padding: 8px 4px;
  box-sizing: border-box;
}

.custom-input:focus {
  outline: none;
}

.is-invalid {
  border-bottom: 1px solid #E0E0E0;
}

.address-input-wrapper,
.phone-input-wrapper,
.verification-input-wrapper {
  position: relative;
}

.address-button {
  position: absolute;
  right: 0;
  top: 10px;
  padding: 0;
  min-width: 50px;
  height: 32px;
  box-shadow: none;
  color: #A1A8BD;
}

.address-input-wrapper .custom-input {
  padding-right: 50px;
}

.phone-button,
.verification-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  height: 32px;
  display: flex;
  border: 1px solid #2196F3;
  box-shadow: none;
  color: #2196F3;
}

.submit-button {
  width: 100%;
  background: #2196F3;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: none;
}
</style>
