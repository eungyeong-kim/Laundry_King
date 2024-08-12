<template>
  <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>이용내역</h2></v-col>
        <v-col></v-col>
        </v-row>

        <v-container>
            
            <v-tabs v-model="tab" align-tabs="center">
                <v-tab v-for="(tabList,index) in tabs" :key="index" @click="selectTab(index)" class="tap_spacing" :class="{'active':index!=selectedTab}">
                {{ tabList.listName }}
                </v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item v-for="(tabList,index) in tabs" :key="index">
                    <p class="text-center mb-10 mt-10 notice" >{{ tabList.notice }}</p>
                    <div class="listItem mb-3" v-for="(order,index) in tabList.orderListContent" :key="order.id" @click="goToOrderDetail(order.id)">
                        
                        <p class="d-flex justify-space-between mr-5 ml-5 orderStatus"><span class="mb-1 status_style">{{ order.orderStatus }}</span><span class="mb-1">{{ order.orderNumber }}</span></p>
                        <p class="d-flex justify-space-between mr-5 ml-5"><span class="mt-1">{{orderListTitle}}</span> <span class="mt-1">{{ order.item }}</span></p>
                        <p class="d-flex justify-space-between mr-5 ml-5"><span>{{preDateTitle}}</span> <span>{{ order.pickupDate }}</span></p>
                        <p class="d-flex justify-space-between mr-5 ml-5 orderStatus"><span class="mb-1">{{deliverTitle}}</span> <span>{{ order.deliveryDate }}</span></p>
                        <p class="d-flex justify-space-between mr-5 ml-5 charge_font"><span class="mt-1">{{chargeTitle}}</span> <span class="mt-1 font-weight-bold">{{ formatCurrency(order.totalAmount) + " " +"원" }}</span></p>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-container>
        
    </v-main>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore"; // query와 orderBy 추가import db from '@/firebase';
import db from '@/firebase'
    export default{
        
        data(){
            return{
                tab:null,
                selectedTab:0,
                orderListTitle:"주문내역",
                preDateTitle: "수거 예정일",
                deliverTitle: "배송 예정일",
                chargeTitle:"결제 금액",
                tabs:[
                    {
                    listName:"현재 주문내역",
                    notice:"세탁왕에서 주문하신 내역을 확인할 수 있어요.",
                    orderStatus:"주문완료",
                    orderNumber:"주문번호 21081",
                    orderListContent:[]
                },
                    {listName: "지난 주문내역",
                    notice:"지난 주문 내역을 확인할 수 있어요.",
                    orderStatus:"배송완료",
                    orderNumber:"주문번호 21081",
                    orderListContent:[]
                    
                    }
                ]
            }
        },
        methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToOrderDetail(orderId) {  
      this.$router.push({ name: 'userhistory', params: { orderId: orderId } });
    },
    selectTab(index) {
      this.selectedTab = index;
    },
    userHistory() {
      this.$router.push('/userhistory');
    },
    formatCurrency(amount) {
      if (typeof amount !== "number") {
        return amount;
      }
      return amount.toLocaleString('ko-KR'); // 'ko-KR'은 한국어 지역 설정입니다.
    },
    async fetchUserOrders(userId) {
      const orders = [];

      // orders 컬렉션에서 주문 정보 가져오기
      const ordersRef = collection(db, `users/${userId}/orders`);  // 원래대로 orders 컬렉션 참조
      
      // 타임스탬프를 기준으로 내림차순 정렬하여 최신 주문이 가장 먼저 오도록
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const orderData = { id: doc.id, ...doc.data() };
        console.log('Order Data:', orderData); // 각 주문의 모든 데이터를 출력
        orders.push(orderData);
      });

      // 현재 주문 내역 필터링 (주문 완료 상태)
      this.tabs[0].orderListContent = orders.filter(order => 
        (order.orderStatus || "").trim().toLowerCase() !== "주문완료".toLowerCase()
      );
      // 지난 주문 내역 필터링 (배송 완료 상태)
      this.tabs[1].orderListContent = orders.filter(order => 
        (order.orderStatus || "").trim().toLowerCase() === "배송완료".toLowerCase()
      );

      console.log('Current Orders:', this.tabs[0].orderListContent); // 현재 주문 내역 확인
      console.log('Past Orders:', this.tabs[1].orderListContent); // 지난 주문 내역 확인
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        await this.fetchUserOrders(userId);
      } else {
        console.log("User is not logged in.");
      }
    });
  }
};
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 80px;
    color: #A1A8BD;
    font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
  }
  template, div, footer {
    padding: 0;
  }
.tap_spacing{
    margin: 0 10px;
    font-size: 17px;
    font-weight: bold;
    
}
.active{
    color:#A1A8BD
}
.notice{
    color: #A1A8BD
}

.listItem{
    cursor: pointer;
    border: 2px solid #F0F2F9;
    width: 460px;
    margin:auto;
    border-radius: 30px;
    padding: 10px 5px;
    box-sizing: border-box;
    line-height: 2.2;
    font-size: 17px;
}
.status_style{
    border: 2px solid #64B5F6;
    border-radius: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    background-color:#f4fafe;
    color: #64B5F6
}
.orderStatus{
    border-bottom: 1px solid #CCD3E8;
}
.charge_font{
    font-size: 20px;
}
</style>