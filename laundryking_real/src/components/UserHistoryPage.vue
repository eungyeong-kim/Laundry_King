<template>
  <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"></v-col>
        <v-col></v-col>
        </v-row>
        <v-row>
            <v-col>
                <div v-if="orderDetail">
    <h2>주문 상세 내역</h2>
    <p>주문 번호: {{ orderDetail.orderNumber }}</p>
    <p>주문 상태: {{ orderDetail.orderStatus }}</p>
    <p>수거 예정일: {{ orderDetail.orders.pickupDate }}</p>
    <p>배송 예정일: {{ orderDetail.orders.deliveryDate }}</p>
    <p>결제 금액: {{ orderDetail.orders.totalAmount }}원</p>
    <p>주문 아이템: {{ orderDetail.orders.item }}</p>
  </div>
  <div v-else>
    <p>주문 정보를 불러오는 중입니다...</p>
  </div>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
export default {
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderDetail: null  // 주문 상세 정보 저장
    };
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    // Firestore에서 orderId를 사용해 해당 주문 데이터 가져오기
    const userId = firebase.auth().currentUser.uid;
    const orderRef = db.collection('users').doc(userId).collection('orders').doc(this.orderId);
    const orderSnapshot = await orderRef.get();

    if (orderSnapshot.exists) {
      this.orderDetail = orderSnapshot.data();
    } else {
      console.error("Order not found");
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