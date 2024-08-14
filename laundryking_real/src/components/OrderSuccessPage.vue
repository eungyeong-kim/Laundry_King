<template>
  <v-app>
    <v-main>

      <v-row style="padding:0;" class="mt-4">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>주문완료</h2></v-col>
        <v-col></v-col>
      </v-row>

      <v-container class="centered-container">
        <div class="order-message">
          <h3>주문을 완료했어요!</h3>
          <p>포근하게 배송해드릴게요.</p>
        </div>
        <hr class="divider" />
        <div class="order-details-box" v-if="orderDetails">
          <div class="detail-row">
            <span class="detail-label">주문 내용:</span>
            <span class="detail-value">
              {{ orderDetails.type }} - {{ orderDetails.category }} - {{ orderDetails.item }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">수거 예정일:</span>
            <span class="detail-value">{{ orderDetails.pickupDate }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">배송 예정일:</span>
            <span class="detail-value">{{ orderDetails.deliveryDate }}</span>
          </div>
          <hr class="sub-divider" />
          <div class="detail-row">
            <span class="detail-label">수령인:</span>
            <span class="detail-value">{{ orderDetails.recipient }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">휴대폰:</span>
            <span class="detail-value">{{ orderDetails.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">주소지:</span>
            <span class="detail-value">
              {{ orderDetails.address }} {{ orderDetails.detailAddress }}
            </span>
          </div>
          <hr class="sub-divider" />
          <div class="detail-row payment-details">
            <span class="detail-label">결제 금액:</span>
            <span class="detail-value">{{ orderDetails.finalPaymentAmount.toLocaleString() }} 원</span>
          </div>
        </div>

        <div class="notice-box-wrapper">
          <div class="notice-box">
            <div class="notice-box-header">
              <img src="/images/images/info.png" alt="Info Icon" class="notice-box-icon" />
              <span class="notice-box-text">유의사항</span>
            </div>
            <div class="notice-box-detail">
              <p class="notice-box-detail-text">
                • 주문 취소는 [결제완료] 상태까지 가능합니다. <br>
                • [주문접수] 에는 주문취소가 불가능합니다.
              </p>
            </div>
          </div>
        </div>

        <div class="button-group">
          <v-btn @click="goToOrderHistory" class="btn-order-history">주문상세보기</v-btn>
          <v-btn @click="goToHome" class="btn-home">홈으로</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['fnGetOrderInfo']),
    orderDetails() {
      return this.fnGetOrderInfo || {};
    },
  },
  methods: {
    goToOrderHistory() {
      this.$router.push('/orderhistory');
    },
    goToHome() {
      this.$router.push('/');
    },
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
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
}

.order-message {
  text-align: center;
  margin: 20px 0;
}

.order-message h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.order-message p {
  font-size: 16px;
  color: #666;
}

.divider {
  border: 0;
  border-top: 1px solid #CCD3E8;
  margin: 20px 0;
}

.order-details-box {
  border: 1px solid #CCD3E8;
  border-radius: 20px;    
  padding: 50px;      
  margin-bottom: 50px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.detail-label {
  font-size: 15px;
  color: #2F3647;
  text-align: left;
}

.detail-value {
  font-size: 15px;
  color: #2F3647;
  text-align: right;
}

.sub-divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
}

/* 결제 금액 부분 스타일 */
.payment-details {
  font-size: 24px; /* 더 큰 폰트 사이즈 */
  font-weight: bold; /* 두꺼운 글씨 */
}

.payment-details .detail-label,
.payment-details .detail-value {
  font-size: 24px; /* 더 큰 폰트 사이즈 */
  font-weight: bold; /* 두꺼운 글씨 */
}

/* 유의사항 */
.notice-box-wrapper {
  margin-bottom: 16px; 
}

.notice-box {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 25px;
  border-radius: 10px;
  background: #FFEDED;
}

.notice-box-header {
  display: flex;
  align-items: center; /* 아이콘과 텍스트 수직 정렬 */
  width: 100%;
  justify-content: center; /* 아이콘과 텍스트가 가운데 정렬되도록 */
}

.notice-box-icon {
  width: 30px; 
  height: 30px; 
  margin-right: 10px; /* 아이콘과 텍스트 사이의 간격 조정 */
}

.notice-box-text {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  text-align: center;
}

.notice-box-detail {
  margin-top: 10px;
}

.notice-box-detail-text {
  font-size: 13px;
  color: #798094;
  line-height: 1.5; 
}

/* 버튼들 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-order-history, .btn-home {
  flex: 1;
  margin: 0 10px;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  line-height: normal; /* 줄 높이 기본값으로 설정 */
}

.btn-order-history {
  border: 1px solid #2196F3;
  color: #2196F3;
  font-weight: bold;
  padding: 30px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: none;
}

.btn-home {
  background: #2196F3;
  color: #ffffff;
  font-weight: bold;
  padding: 30px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: none;
}
</style>