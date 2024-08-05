<template>
    <v-main style="padding:0;">
      <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>요금표</h2></v-col>
        <v-col></v-col>
      </v-row>
    </v-main>
    <v-container>
      <v-row class="mt-10 mb-5">
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
  
      <v-row class="mt-10">
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <div class="flex_wrap_for_buttons">
            <button v-for="(button, index) in buttons" :key="index" class="button_style" @click="changeImages(index)" :class="{  'active' : index === changeImages  }" >
              <img :src="button.img" alt="">
              {{ button.buttonTitle }}
            </button>
          </div>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>

    <v-container class="mt-13 mb-10">
                    <v-expansion-panels>
                        <v-row>
                        <v-col cols="1"></v-col>
                            <v-col cols="10">
                                <v-expansion-panel v-for="(accordion,index) in accordions" :key="index" class="mb-2">

                                    <v-expansion-panel-title>
                                            <p class="charge_box_title">{{ accordion.title }}</p>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <div class="charge_box mb-5">
                                        <p v-html="accordion.content"></p>
                                        </div>
                                        <div v-for="charge in charges" :key="charge" class="charge_style">
                                            <p>{{ charge.chargeTitle }}</p>
                                            <p>{{ charge.chargeText }}</p>
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-col>
                        <v-col cols="1"></v-col>
                        </v-row>
                    </v-expansion-panels>
                </v-container> 

    <v-container>
        <v-col cols="10" offset="1">
        <div class="not_handled">
            <div class="not_handled_title_wrap">
                <img :src="cancelImage">
                <h4>{{ not_handled_title }}</h4>
            </div>
            <p v-html="not_handled_text"></p>
        </div>
        </v-col>
    </v-container>
  
  </template>
  
  <script>
  export default {
    data() {
      return {
        imagePath: "/images/images/info.png",
        cancelImage: require("@/assets/images/cancel.png"),
        title: "유의사항",
        text: `<p>&#8226; 명품 브랜드는 세탁왕만의 특별한 프리미엄코스&#40;친환경 기능성 전용세제&#44; 단독세탁&#44; 더블향균 풀 케어&#41;로 진행되며 일반요금에 2배가 적용됩니다&#46;&#40;가품도 동일적용&#41; <br>&#8226; 애용하시는 일반제품을 세탁왕만의 섬세한 프리미엄 케어를 희망하실 경우&#44; 주문접수시 프리미엄케어 신청란에 표기해 주세요&#46; 명품과 같은 기준으로 세탁 진행하며 일반 요금의 2배가 적용됩니다&#46;<br> &#8226; 일반세탁으로는 제거가 어려운 오염&#44; 보풀&#44; 반려동물 털케어가 필요한 경우&#44; 전문가의 판단에 따라 기술세탁을 진행하며 정도와 범위에 따라 책정된 기술 요금이 추가됩니다&#46; 수거된 상태에서 주문 취소 하실 경우 반송비 5&#44;000원이 부과됩니다&#46;<p>`,
        not_handled_title:"취급하지 않는 품목",
        not_handled_text: `<p>&#8226; 생활빨래 <br> &#8226; 가방&#44; 신발 등의 수선과 한복의 동정은 달지 않아요&#46;<br>  &#8226; 세탁물없이 수선 서비스만은 제공하지 않아요&#46; <br> &#8226; 애완동물의 의류 및 용품</p> <br> <p>&#91;주의사항&#93; <br> &#8226; 카페트/가죽 제품은 5~7일 정도 추가시간이 필요해요&#46; 완성도 높은 세탁을 위해 세탁&#44; 건조 시간이 추가로 필요한 경우 고객센터에서 별도로 연락드려요&#46; <br> &#8226; 인형&#44; 솜이불&#44; 솜베게 등 솜 충전재가 들어간 경우 세탁시 뭉침현상이 발생되며 구매초기의 형태가 유지되지 않을 수 있습니다&#46; <br> &#8226; 토사물/곰팡이가 있는 세탁물은 고착상태에 따라 오염이 일부 남을 수 있고 원단의 수축&#44; 변색 등이 발생할 수 있어요&#46; <br> &#8226; 세탁물 검수 시 손상이나 파손이 우려되는 경우 전문가 의견에 따라 세탁하지 않고 반송해드려요&#46; <br> &#8226; 기상상황에 따라 배송이 지연될 수 있어요&#46; </p> <br> <p>&#91;명품목록&#93; <br> 구찌&#44; 샤넬&#44; 루이비통&#44; 프라다&#44; 버버리&#44; 디올&#44; 페라가모&#44; 발렌시아가&#44; 배르사체&#44; 발렌티노&#44; 돌체앤가바나&#44; 팬디&#44; 미우미우&#44; 톰브라운&#44; 까르띠에&#44; 에르메네질도 제냐&#44; 몽클레어&#44; 캐나다구스&#44; 스톤아일랜드&#44; 겐조&#44; 입생로랑&#44; 비비안웨스트우드&#44; 무스너클&#44; 골든구스&#44; 알렉산더맥퀸 메종마르지엘라&#44; 지방시&#44; 보스&#44; 셀린느&#44; 알렉산더왕&#44; 막스마라&#44; 이자벨 마랑&#44; 로샤스&#44; 랑방&#44; 마크제이콥스&#44; 에르메스&#44; 아르마니 등</p>`,
        buttons: [
          { buttonTitle: "의류", img: require("@/assets/images/clean-clothes.png") },
          { buttonTitle: "신발", img: require("@/assets/images/shoes.png") },
          { buttonTitle: "리빙", img: require("@/assets/images/pillows.png") },
          { buttonTitle: "가죽/모피", img: require("@/assets/images/fur-coat.png") },
          { buttonTitle: "잡화", img: require("@/assets/images/cap.png") },
          { buttonTitle: "수선/기술", img: require("@/assets/images/machine.png") },
        ],
        accordions:[
            {
               title:"셔츠/블라우스",
               content:`&#8226; 와이셔츠: 카라가 빳빳하고&#44; 넥타이를 사용하는 흰색&#44; 파스텔톤의 일반핏 정장셔츠<br>&#8226; 남방셔츠: 와이셔츠/슬림핏셔츠를 제외한 유색셔츠<br>&#8226; 롱/빅 사이즈: 추가요금 적용<br>&#8226; 셔츠/블라우스의 옷깃부터 총 길이가 80cm이상인 경우 롱 사이즈로 분류&#44; 3XL부터 빅사이즈로 분류함&#46;`,

            }
        ],
        charges:[
            {
                chargeTitle:"셔츠/블라우스",
                chargeText: "1900원"
            }
        ]
      };
    },
    methods: {
        goBack(){
        this.$router.go(-1);
        },
        changeImages(index){
            console.log("듀듀듀 뱌뱌뱌 듀듀듀")
        }
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
  .card_custom {
    font-size: 14px;
    height: 320px;
    background-color: #F4FAFE;
    border-radius: 20px;
  }
  .flex_wrap h3 {
    font-size: 20px;
  }
  .info {
    width: 30px;
    height: 30px;
    position: absolute;
  }
  .button_style {
    border: 1px solid #CCD3E8;
    width: 130px;
    height: 140px;
    border-radius: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #b5b5b5;
    font-weight: bold;
    font-size: 18px;
  }
  .button_style img {
    width: 70px;
    height: 70px;
    margin-bottom: 14px;
  }
  .flex_wrap_for_buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .button_style:hover {
    border: 2px solid #2196F3;
    background-color: #e5f1fc;
    color: #2196F3;
  }
  .button_style.active{
    border: 2px solid #2196F3;
    background-color: #e5f1fc;
    color: #2196F3;
  }
  .button_style.active:first-child{
    background-image: url("/public/images/images/clean-clothes_blue.png");
  }
  .charge_box{
    background-color: #F4FAFE;
    font-size: 14px;
    
    border-radius: 10px;
    box-sizing: border-box;
  }
  .charge_box_title{
    font-size: 18px;
    font-weight: bold;
  }
  .charge_box p{
    color: #798094;
    padding: 20px;
  }
  .not_handled{
    padding: 20px;
    border: 2px solid #F4FAFE;
    border-radius: 11px;
    
}
.not_handled_title_wrap{
    display:flex;
    margin-bottom: 10px;
}
 .not_handled img{
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
.charge_style{
    text-decoration: underline;
    text-underline-offset: 10px;
    
    
    font-size: 17px;
    color: #2F3647
}
.charge_style p{
    display:flex;
}
  </style>
  