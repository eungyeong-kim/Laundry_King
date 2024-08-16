<template>
    <div>
        <v-carousel height="239" cycle hide-delimiter-background show-arrows color="blue">
            <template v-slot:prev="{ props }">
            <v-btn
                color="#ffffff"
                variant="text"
                @click="props.onClick"
                icon
                class="btn-left"
            ><v-icon>mdi-chevron-left</v-icon></v-btn>
            </template>
            <template v-slot:next="{ props }">
            <v-btn
                color="#ffffff"
                variant="text"
                @click="props.onClick"
                icon
                class="btn-right"
            ><v-icon>mdi-chevron-right</v-icon></v-btn>
            </template>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover>
                    <div class="d-flex fill-height justify-start align-center topImages">
                        <p class="topImagesTitle ml-15 mt-15">
                                {{ item.subTitle }}<br>
                            <p class="topImagesSubTitle">
                                {{ item.title }}
                            </p>
                        </p>
                    </div>
            </v-carousel-item>
        </v-carousel>
        <v-row class="d-flex justify-center mt-5 btn_img">
            <v-col cols="5" class="text-center">
                <v-btn class="w-100 h-100 border-radius-15 text-left-btn" variant="outlined" color="#CCD3E8" to="/pickupapply">
                    <p class="applybtn">세탁<br>신청</p>
                    <img src="/images/images/main_btn1.png" alt="" width="90px">
                </v-btn>
            </v-col>

            <v-col cols="5" class="text-center">
                <v-btn class="w-100 h-100 border-radius-15 text-left-btn" variant="outlined" color="#CCD3E8" to="/charge">
                    <p class="applybtn">요금표</p>
                    <img src="/images/images/main_btn2.png" alt="" width="90px">
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center btn_img2">
            <v-col cols="10">
                <v-btn flat color="#64B5F6" class="w-100 h-auto text-right-btn border-radius-15" to="/howuse">
                    <img src="/images/images/main_btn3.png" alt="" width="73px">
                    <p class="use">이용 가이드</p>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10" class="mt-5">
                <h3>픽업 지역 안내</h3>
                <p class="f-color-A1A8BD mt-2">세탁왕은 서울, 수도권 지역을 중심으로 픽업지역을 확대해나가고 있습니다.<br>빠르게 하지만 신중하게 지역을 확장해 나가도록 하겠습니다.</p>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center btn_img3">
            <v-col cols="10">
                <v-btn color="#CCD3E8" class="w-100 h-auto text-right-btn border-radius-9999" variant="outlined" to="/pickup">
                    <img src="/images/images/main_btn4.png" alt="" width="53px">
                    <p class="pickup">픽업 가능 지역</p>
                </v-btn>
            </v-col>
        </v-row>

        <div class="cut-line my-15"></div>

        <v-row class="d-flex justify-center">
            <v-col cols="10" class="mt-5">
                <h3>이런 서비스도 있어요</h3>
                <p class="f-color-A1A8BD mt-2">세탁왕에서만 제공하는 서비스입니다.</p>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-card class="border-radius-15" flat>
                    <p class="tipSubTitle">세탁왕에서 알려드려요!</p>
                    <h3 class="tipTitle">세탁꿀팁</h3>
                    <img src="/images/images/main_tip_icon.png" alt="" width="250">
                    <v-btn icon to="/tip"><v-icon color="#536DFE">mdi-arrow-right</v-icon></v-btn>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-carousel height="114" show-arrows="hover" cycle hide-delimiter-background color="blue" class="border-radius-15">
                    <template v-slot:prev="{ props }">
                    <v-btn
                        color="blue"
                        variant="text"
                        @click="props.onClick"
                        icon
                        class="btn-left"
                    ><v-icon>mdi-chevron-left</v-icon></v-btn>
                    </template>
                    <template v-slot:next="{ props }">
                    <v-btn
                        color="blue"
                        variant="text"
                        @click="props.onClick"
                        icon
                        class="btn-right"
                    ><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </template>
                    <v-carousel-item v-for="(item, i) in events" :key="i" cover @click=goEvent class="pointer">
                        <v-sheet :color=colors[i] tile height="100%" class="d-flex align-center">
                            <div class="ml-5">
                                <img :src=item.src alt="" class="eventImg">
                            </div>
                            <div class="ml-5 eventContent">
                                {{ item.title }}<br>
                                <span>{{ item.subTitle }}</span>
                            </div>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import bg1 from '@/assets/images/bg1.jpg'
import bg2 from '@/assets/images/bg2.jpg'
import bg3 from '@/assets/images/bg3.jpg'
import eventImg1 from '@/assets/images/main_event_img1.png'
import eventImg2 from '@/assets/images/main_event_img2.png'


    export default{
        data(){
            return {
                items: [
                    {
                        src: bg1,
                        title:'우리동네 세탁왕',
                        subTitle:'20년 경력의 향균세탁을 경험해보세요!'
                    },
                    {
                        src: bg2,
                        title:'20년 경력의 향균세탁',
                        subTitle:'섬세하고 세련된'
                    },
                    {
                        src: bg3,
                        title:'전국 어디서나 택배픽업',
                        subTitle:'비대면 수거배송,'
                    },
                ],
                events: [
                    {
                        src: eventImg1,
                        title:'세탁왕에서만 열리는 리뷰 이벤트라곰!',
                        subTitle:'스너글로 세탁받고 선물까지!'
                    },
                    {
                        src: eventImg2,
                        title:"그램 단위로 구매하는 빈티지 스토어 '워셔'",
                        subTitle:'이젠 합리적으로 득템하세요'
                    },
                    {
                        src: "/images/images/icon-shoes.png",
                        title:"소중한 신발을 특별하게비브람 밑창 보강",
                        subTitle:'비브람 밑창 보강'
                    },
                ],
                colors: [
                    '#E0F8EA',
                    '#FCEAE4',
                    '#F8ECFD'
                ]
            }
        },
        methods: {
            goEvent(){
                return this.$router.push('/eventdetail')
            }
        }
    }
</script>

<style scoped>

.btn-left {
    position: relative;
    left: -30px;
}
.btn-right {
    position: relative;
    right: -30px;
}
.pointer {
    cursor: pointer;
}

.v-carousel__controls__item {
  width: 20px !important;
  height: 20px !important;
  background-color: blue !important;
  border-radius: 50% !important;
}

.topImages {
    background: rgba(0,0,0,.5);
}
.topImagesTitle {
    color: #fff;
    font-size: 12px;
}
.topImagesSubTitle {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}
.applybtn {
    font-size: 20px;
    font-weight: bold;
    padding: 33px 0 123px 26px;
}
.btn_img img{
    position: absolute;
    bottom: 30px;
    right: 30px;
}
.btn_img2 img{
    position: absolute;
    left: 50px;
    opacity: .5;
}
.btn_img3 img{
    position: absolute;
    left: 50px;
}
.use {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 37px 20px;
}
.pickup {
    font-size: 16px;
    font-weight: bold;
    color: #2F3647;
    padding: 37px 20px;
}
.text-right-btn {
    justify-content: flex-end;
}
.text-right-btn:hover {
    background: #FAFAFA; 
}
.text-left-btn {
    justify-content: flex-start;
}
.text-left-btn:hover {
    background: #FAFAFA;
}
.border-radius-15 {
    border-radius: 15px;
}
.border-radius-9999 {
    border-radius: 9999px;
}
.f-color-A1A8BD {
    color: #A1A8BD;
    font-size: 13px;
}
.cut-line {
    width: 100%;
    height: 10px;
    background: #FAFAFA;
}
.v-card {
    height: 236px;
    background: #536DFE;
   
}
.v-card .v-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.v-card img {
    position: absolute;
    bottom: -30px;
    right: -40px;
}
.tipSubTitle {
    font-size: 12px;
    margin-top: 43px;
    margin-left: 40px;
    color: #fff;
}
.tipTitle {
    font-size: 30px;
    margin-left: 40px;
    color: #fff;
}
.eventImg {
    width: 94px;
    height: 94px;
    border-radius: 50%;
}
.eventContent {
    font-size: 17px;
    width: 166px;
    font-weight: bold;
}
.eventContent span {
    font-size: 12px;
    font-weight: normal;
}
</style>