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
                    <div class="listItem" v-for="(order,index) in tabList.orderListContent" :key="index">
                        
                        <p class="d-flex justify-space-between mr-5 ml-5"><span class="">{{ order.status }}</span><span>{{ order.orderNumber }}</span></p>
                        <hr>
                        <p class="d-flex justify-space-between mr-5 ml-5">{{orderListTitle}} {{ tabList.orderList }}</p>
                        <p class="d-flex justify-space-between mr-5 ml-5">{{preDateTitle}} {{ order.preDate }}</p>
                        <p class="d-flex justify-space-between mr-5 ml-5">{{deliverTitle}} {{ order.deliver }}</p>
                        <hr>
                        <p>{{chargeTitle}} {{ order.charge }}</p>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-container>
        
    </v-main>
</template>

<script>
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
                    orderListContent:[
                    {status:"주문완료",
                    orderNumber:"주문번호 21081",
                    orderList:"와이셔츠 1개, 블라우스 2개 외 3건",
                    preDate: "7월 25일 목요일",
                    deliver: "7월 30일 화요일",
                    charge: "34,900원"},
                    {status:"주문완료",
                    orderNumber:"주문번호 21081",
                    orderList:"와이셔츠 1개, 블라우스 2개 외 3건",
                    preDate: "7월 25일 목요일",
                    deliver: "7월 30일 화요일",
                    charge: "34,900원"}
                ]
                },
                    {listName: "지난 주문내역",
                    notice:"지난 주문 내역을 확인할 수 있어요.",
                    status:"주문완료",
                    orderNumber:"주문번호 21081",
                    orderListContent:[
                    {status:"주문완료",
                    orderNumber:"주문번호 21081",
                    orderList:"와이셔츠 1개, 블라우스 2개 외 3건",
                    preDate: "7월 25일 목요일",
                    deliver: "7월 30일 화요일",
                    charge: "34,900원"}]
                    
                    }
                ]
            }
        },
        methods:{
        goBack(){
        this.$router.go(-1);
        },
        selectTab(index){
            this.selectedTab = index
        }
    }
    }
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
    border: 2px solid #F0F2F9;
    width: 450px;
    margin:auto;
    border-radius: 11px;

}
</style>