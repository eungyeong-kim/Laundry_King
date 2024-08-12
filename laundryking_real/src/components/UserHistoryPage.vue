<template>
  <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"></v-col>
        <v-col></v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="2">
        <!-- 로딩 상태 -->
        <div v-if="loading">
          <p>주문 정보를 불러오는 중입니다...</p>
        </div>
        
        <!-- 오류 상태 -->
        <div v-else-if="error">
          <p>{{ error }}</p>
        </div>
        
        <!-- 주문 데이터 표시 -->
        <div v-else-if="orderDetail">
          <p>주문 번호: {{ orderDetail.orderNumber }}</p>
          <p>주문 상태: {{ orderDetail.orderStatus }}</p>
          <p>수거 예정일: {{ orderDetail.pickupDate }}</p>
          <p>배송 예정일: {{ orderDetail.deliveryDate }}</p>
          <p>결제 금액: {{ orderDetail.totalAmount }}원</p>
          <p>주문 아이템: {{ orderDetail.item }}</p>
        </div>
      </v-col>
        </v-row>
    </v-main>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '@/firebase';

export default {
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderDetail: null,  // 주문 상세 정보 저장
      loading: true,      // 데이터 로딩 상태를 표시하기 위해 사용
      error: null         // 오류 발생 시 메시지 저장
    };
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    },
    
  },
  async created() {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw new Error("User is not logged in");
        }

        const userId = user.uid;
        console.log('User ID:', userId);  // 확인을 위한 로그
        console.log('Order ID:', this.orderId);  // 확인을 위한 로그

        const orderRef = db.collection('users').doc(userId).collection('orders').doc(this.orderId);

        const orderSnapshot = await orderRef.get();

        if (orderSnapshot.exists) {
            this.orderDetail = orderSnapshot.data();  // 가져온 데이터로 상태 업데이트
            console.log('Order Detail:', this.orderDetail);  // 가져온 데이터 콘솔에 출력
        } else {
            console.error("Order not found");
            this.error = "Order not found";  // 오류 메시지 설정
        }
    } catch (err) {
        console.error("Error fetching order:", err);
        this.error = "Failed to fetch order data.";  // 오류 메시지 설정
    } finally {
        this.loading = false;  // 로딩 완료
    }
}
  
};
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

template, div, footer{
    padding:0;
}
</style>