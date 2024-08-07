<template>
  <v-app>
    <v-main>
      
        <!-- 헤더 부분 -->
        <v-row style="padding:0;">
      <v-col cols="1">
        <button @click="goBack">
          <span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span>
        </button>
      </v-col>
      <v-col cols="10" class="d-flex justify-center align-center">
        <h2>주문정보</h2>
      </v-col>
    </v-row>

    <v-container class="centered-container">
        <!-- 폼 부분 -->
        <v-row class="form-row">
          <v-col cols="12" md="6">
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- 수거예정일 -->
              <div class="form-field-wrapper">
                <label for="pickupDate">수거예정일</label>
                <input
                  type="date"
                  id="pickupDate"
                  v-model="pickupDate"
                  @change="updatePickupDate"
                  class="date-input"
                />
                <p class="date-display">선택한 날짜: {{ formattedPickupDate }}</p>
              </div>

              <!-- 발송예정일 -->
              <div class="form-field-wrapper">
                <label for="deliveryDate">발송예정일</label>
                <input
                  type="date"
                  id="deliveryDate"
                  v-model="deliveryDate"
                  readonly
                  class="date-input"
                />
                <p class="date-display">선택한 날짜: {{ formattedDeliveryDate }}</p>
              </div>

              <!-- 세탁 요청사항 -->
              <div class="form-field-wrapper">
                <label for="cleaningRequest">세탁 요청사항</label>
                <textarea
                  id="cleaningRequest"
                  v-model="cleaningRequest"
                  placeholder="세탁 요청사항을 입력해주세요"
                  class="textarea-input"
                ></textarea>
                <p class="blue-text">적어주신 내용을 세탁물 검품시에 참고하겠습니다.</p>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="centered-container">
        <v-row class="form-row">
          <v-col cols="12" md="6">
            <!-- 다음 버튼 위에 정보 상자 추가 -->
            <div class="info-box-wrapper">
              <div class="info-box">
                <div class="info-box-header">
                  <span class="material-symbols-outlined info-box-icon">diamond</span>
                  <span class="info-box-text">프리미엄 케어 신청</span>
                  <button @click="toggleInfoBox" :class="['info-box-button', { checked: isChecked }]">
                    <!-- 체크 아이콘은 숨기기 -->
                    <span class="material-symbols-outlined">{{ isChecked ? '' : '' }}</span>
                  </button>
                </div>
                <!-- 선과 글 추가 -->
                <div class="info-box-detail">
                  <hr class="info-box-line" />
                  <p class="info-box-detail-text">• 고가의 의류나 신발은 단독 세탁과 전용 세제를 사용하는 프리미엄 케어를 권장해드립니다.<br>
                    • 일부 품목만 프리미엄 케어를 신청하실 경우, 요청사항에 프리미엄 케어를 진행할 품목을 남겨주세요.<br>
                    • 프리미엄 케어의 경우 일반/멤버십 요금의 2배가 책정돼요.</p>
                </div>
              </div>
            </div>

            <!-- 상자 부분 -->
            <div class="notice-box-wrapper">
              <div class="notice-box">
                <div class="notice-box-header">
                  <img src="/images/images/info.png" alt="Info Icon" class="notice-box-icon" />
                  <span class="notice-box-text">유의사항</span>
                </div>
                <div class="notice-box-detail">
                  <p class="notice-box-detail-text">
                    • 1회 최소 주문금액은 30,000원이에요. (픽업 택배비는 별도 결제)<br>
                    • 최소 주문금액 미달 시 기준가인 30,000원에서 쿠폰 등 할인이 적용돼요.
                  </p>
                </div>
              </div>
            </div>

            <!-- 다음 버튼 -->
            <v-btn @click="submit" class="submit-button mt-4" :class="{ disabled: !isPickupDateSelected }" :disabled="!isPickupDateSelected">
              다음
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      pickupDate: '',
      deliveryDate: '',
      cleaningRequest: '',
      valid: false,
      isChecked: false,  // 체크 상태를 저장하는 변수
      isPickupDateSelected: false, // 수거 예정일 선택 여부
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
    };
  },
  computed: {
    formattedPickupDate() {
      return this.formatDate(this.pickupDate);
    },
    formattedDeliveryDate() {
      return this.formatDate(this.deliveryDate);
    },
  },
  methods: {
    goBack() {
      this.$router.push('/pickupapply');
    },
    submit() {
      if (this.$refs.form.validate() && this.isPickupDateSelected) {
        console.log('Form submitted:', {
          pickupDate: this.pickupDate,
          deliveryDate: this.deliveryDate,
          cleaningRequest: this.cleaningRequest,
          isChecked: this.isChecked,
        });
        this.$router.push('/payment'); // /payment 페이지로 이동
      }
    },
    updatePickupDate() {
      this.$refs.form.validate(); // 날짜 변경 시 폼 검증
      this.isPickupDateSelected = !!this.pickupDate; // 수거 예정일이 선택되었는지 확인
      if (this.pickupDate) {
        this.deliveryDate = this.calculateDeliveryDate(this.pickupDate);
      }
    },
    calculateDeliveryDate(pickupDate) {
      const date = new Date(pickupDate);
      date.setDate(date.getDate() + 5); // 수거 예정일로부터 5일 뒤
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    formatDate(date) {
      if (!date) return '';
      const [year, month, day] = date.split('-');
      const dateObject = new Date(year, month - 1, day);
      const dayOfWeek = this.daysOfWeek[dateObject.getDay()];
      return `${year}-${month}-${day} (${dayOfWeek})`;
    },
    toggleInfoBox() {
      this.isChecked = !this.isChecked; // 체크 상태를 토글합니다
      console.log('Info box button clicked. Checked:', this.isChecked);
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
};
</script>

<style scoped>
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

.header-row {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}

.header-col {
  display: flex;
  justify-content: center;
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

.date-input,
.textarea-input {
  width: 100%;
  border: none; /* 전체 테두리 제거 */
  border-bottom: 1px solid #E0E0E0; /* 하단 선 */
  background-color: transparent; /* 배경색 제거 */
  padding: 8px;
  box-sizing: border-box;
}

.date-input:focus,
.textarea-input:focus {
  outline: none; 
  border-bottom: 1px solid #2196F3; 
}

.date-display {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

.blue-text {
  font-size: 13px;
  color: #2196F3;
}

/* 프리미엄 케어 */
.info-box-wrapper {
  margin-bottom: 16px; 
}
.info-box {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 15px;
  border: 1px solid #64B5F6;
  border-radius: 10px;
}

.info-box-header {
  display: flex;
  align-items: center; 
}

.info-box-icon {
  font-size: 24px;
  color: #64B5F6;
  margin-right: 10px; 
}

.info-box-text {
  font-size: 16px;
  color: #64B5F6;
  margin-right: 80px; 
  font-weight: bold;
}

.info-box-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff; 
  border: 2px solid #64B5F6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}

.info-box-button.checked {
  background: #2196F3; 
  border-color: #2196F3; 
}

.info-box-button .material-symbols-outlined {
  font-size: 18px;
  color: #ffffff; 
  display: none; 
}

.info-box-detail {
  width: 100%;
  text-align: center;
}

.info-box-line {
  border: 0;
  border-top: 1px solid #E0E0E0;
  margin: 10px 0; 
}

.info-box-detail-text {
  font-size: 13px;
  color: #798094;
  text-align: left;
}

/* 유의사항 */
.notice-box-wrapper {
  margin-bottom: 16px; 
}
.notice-box {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 15px;
  border-radius: 10px;
  background: #F4FAFE;
  position: relative; 
}

.notice-box-header {
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 100%; 
  position: relative;
}

.notice-box-icon {
  position: absolute; 
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px; 
  height: 30px; 
}

.notice-box-text {
  font-size: 16px;
  color: #000000;
  font-weight: bold; 
  text-align: center; 
  flex: 1; /* 텍스트가 중앙에 위치하도록 하기 */
}

.notice-box-detail {
  margin-top: 10px;
}

.notice-box-detail-text {
  font-size: 13px;
  color: #798094;
  line-height: 1.5; 
}

.submit-button {
  width: 100%;
  background: #2196F3;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: none;
  transition: background 0.3s ease, color 0.3s ease;
}

.submit-button.disabled {
  background: #E0E0E0;
  color: #9E9E9E;
  cursor: not-allowed;
}

.submit-button[disabled] {
  background: #E0E0E0;
  color: #9E9E9E;
}
</style>
