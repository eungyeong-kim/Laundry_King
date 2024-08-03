<template>
    <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>요금표</h2></v-col>
        <v-col></v-col>
        </v-row>
    </v-main>

    <v-row class="mt-10">
    <v-col cols="1"></v-col>
    <v-col cols="10">
      <v-card class="justify-center align-center pl-10 pr-10 pt-5 card_custom">
        <div class="flex_wrap">
        <img :src="imagePath" alt="" class="info">
        <h3 class="mb-3 text-center">{{ title }}</h3>
        </div>
        <p v-html="text" style="color:#798094"></p>
    </v-card>
      </v-col>
      <v-col cols="1"></v-col>
      </v-row>
</template>

<script>
    export default{
        data(){
            return{
                imagePath: "/images/images/info.png",
                title: "유의사항",
                text: `&#8226; 명품 브랜드는 세탁왕만의 특별한 프리미엄코스(친환경 기능성 전용세제, 단독세탁, 더블향균 풀 케어)로 진행되며 일반요금에 2배가 적용됩니다.(가품도 동일적용) <br>&#8226; 애용하시는 일반제품을 세탁왕만의 섬세한 프리미엄 케어를 희망하실 경우, 주문접수시 프리미엄케어 신청란에 표기해 주세요. 명품과 같은 기준으로 세탁 진행하며 일반 요금의 2배가 적용됩니다.<br> &#8226; 일반세탁으로는 제거가 어려운 오염, 보풀, 반려동물 털케어가 필요한 경우, 전문가의 판단에 따라 기술세탁을 진행하며 정도와 범위에 따라 책정된 기술 요금이 추가됩니다. 수거된 상태에서 주문 취소 하실 경우 반송비 5,000원이 부과됩니다.`
            }
        }
    }
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 80px;
    color: #A1A8BD;
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 24
}
template, div, footer{
    padding:0
}
.card_custom{
    font-size: 14px;
    height: 320px;
    background-color: #F4FAFE;
    border-radius: 20px;
}
.flex_wrap h3{
    font-size: 20px;
}
.info{
    width: 30px;
    height: 30px;
    position:absolute;
}

</style>