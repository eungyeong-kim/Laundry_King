<template>
  <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        </v-row>

    <v-row justify="center">
    <v-col cols="6" class="custom-class">
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
        <h2 class="mb-10 dateStyle">{{ formattedOrderDate }}</h2>
        <div>
        <div class="statusTable mb-10">
          <img src="/images/images/status.png" alt="">
          <div v-for="item in items" :key="item" class="completeText">
          <p>{{ item.status }}</p>
          <p v-html="item.statusText"></p>
          </div>
        </div>
          <h3 class="dateStyle d-flex mb-5">주문 내용</h3>

          <div v-for="(orderList, index) in orderDetail.selectedItems" :key="index" >
          <p class="mb-5 orderListStyle">
            <span> 선택{{ index+1 }} </span>
            <span class="statusStyleforData">{{ orderList.name+" "+orderList.quantity+"개"}}</span>
          </p>
          </div>

          <hr class="mb-10">
          <div class="text-start heightStyle">
            <h3 class="dateStyle mb-5">수거 & 배송</h3>
            <p class="pickAndDeliver"><span>수거 예정일</span> <span class="statusStyleforData">{{ orderDetail.pickupDate }}</span></p>
            <p class="pickAndDeliver"><span>배송 예정일</span> <span class="statusStyleforData">{{ orderDetail.deliveryDate }}</span></p>            
            <p class="pickAndDeliver"><span>주소</span> <span class="statusStyleforData">{{ orderDetail.address }}</span></p>
            <p class="pickAndDeliver mb-5"><span>상세주소</span><span class="statusStyleforData">{{orderDetail.detailAddress}}</span></p>
            <hr>
            <h3 class="dateStyle mb-5 mt-10">세탁 요청사항</h3>
            <p class="pickAndDeliver mb-5">
              <span class="statusStyleforData">{{orderDetail.cleaningRequest}}</span></p>
            <hr>
            <h3 class="dateStyle mb-5 mt-10">결제 및 비용</h3>
            <p class="pickAndDeliver"><span>세탁비용</span><span class="statusStyleforData">{{formatCurrency(orderDetail.totalAmount)}}원</span></p>
            <p class="pickAndDeliver mb-5"><span>배송비</span><span class="statusStyleforData">{{formatCurrency(orderDetail.pickupFee)}}원</span></p>
            <p class="pickAndDeliver statusStyleforData totalStyle mb-10"><span>총 결제 금액</span> <span class="statusStyleforData">{{ formatCurrency(orderDetail.finalPaymentAmount) }}원</span></p>
            
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-row><v-btn class="btnStyle" >주문취소</v-btn></v-row>
  
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
      error: null ,        // 오류 발생 시 메시지 저장
      items:[
            {
              status:"주문완료",
              statusText:"고객님의 소중한 주문을 확인하고 있어요."
            },
            {
              status:"주문접수",
              statusText:`주문접수가 완료되었어요. <br> 곧 택배사가 세탁물을 픽업할 예정이에요!`
            },
            {
              status:"택배픽업",
              statusText:`택배사가 세탁물을<br>픽업하여 세탁소로 이동하는 중이에요`
            },
            {
              status:"세탁중",
              statusText:"고객님의 세탁물을 검수 후 세탁을 진행 중이에요!"
            },
            {
              status:"세탁완료",
              statusText:`세탁이 완료되었어요!<br>곧 고객님의 주소로 세탁물이 도착해요.`
            },
            {
              status:"배송완료",
              statusText:""
            }
          ]
          }
    
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatOrderDate(timestamp) {
      // Firestore 타임스탬프를 JavaScript Date 객체로 변환
      const date = timestamp.toDate();
      
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
      
      return `${month}월 ${day}일 (${weekday})요일 주문하신 내역입니다.`;
    },
    formatCurrency(amount) {
      if (typeof amount !== "number") {
        return amount;
      }
      return amount.toLocaleString('ko-KR');
    }
  },
  computed: {
    formattedOrderDate() {
      if (!this.orderDetail || !this.orderDetail.createdAt) {
        return "주문 날짜를 불러올 수 없습니다."; 
      }

      return this.formatOrderDate(this.orderDetail.createdAt);
    }
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
.dateStyle{
  font-weight: bold;
  font-size: 28px;
  width: 234px;
  text-align: start;
}

.statusTable{
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  width: 400px;
  height: 780px;
  border: 1px solid #64B5F6;
  padding: 30px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #ffff;
}
.premeumCare{
  height: 35px;

}
.completeText{
  width: 360px;
  position:relative;
  left: 30px;
  top: -720px;
  box-sizing: border-box;
  line-height: 1.41;
}
.completeText p:first-child{
  font-weight: bold;
  display:flex;
  font-size: 19px;
  margin-bottom: 40px;

}
.completeText p:last-child{
  color:#64B5F6;
  margin-bottom: 40px;
  text-align: start;
  font-size: 14px;

}

.custom-class {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.pickAndDeliver{
  display: flex;
  justify-content: space-between;

}

.heightStyle{
  line-height: 2;
  font-size: 18px;
}
.statusStyleforData{
  font-weight: bold;
}
.totalStyle{
  font-size: 24px
}
.btnStyle{
  width: 470px;
  height: 50px;
  background-color: #64B5F6;
  color: #ffffff;
  font-size: 20px;
  border-radius: 15px;
  margin: auto;
}
.orderListStyle{
  display:block;
display: flex;
justify-content: space-between;
font-size: 18px;
}
</style>