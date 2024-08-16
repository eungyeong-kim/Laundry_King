<template>
    <v-main style="padding:0;">
        <v-row style="padding:0;">
            <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
            <v-col class="d-flex justify-center align-center mt-2"><h2>이용 가이드</h2></v-col>
            <v-col></v-col>
        </v-row>

        <div class="top_visual">
            <p>세탁왕에서 알려드리는<br><span>세탁왕 이용방법!</span></p>
            <img src="/images/images/use_bg_image.jpg" alt="">
        </div>
        
        <v-container class="mt-5">
            <v-row class="d-flex justify-center">
                <v-col cols="7" class="usehow_title">
                    <p>01</p>
                    <p>STEP</p>
                    <p>지역 확인하기</p>
                </v-col>
                <v-col cols="2" offset="1" class="usehow_title_icon">
                    <img src="/images/images/usehow_icon1.png" alt="" class="usehow_icon">
                </v-col>
            </v-row>
            
            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">먼저 홈에서 ‘픽업 가능 지역’을 눌러<br>
                        서비스 가능 지역을 확인해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img1.png" alt="" width="100%" class="detail-img">
                </v-col>
                <v-col cols="10" class="explain_text mt-2">
                    <p>&#x203B; 지도에 표시되어 있는 지역에 해당되는 주소만 픽업이 가능합니다.</p>
                </v-col>
            </v-row>
        <div class="bg_color"></div>
            <v-row class="d-flex justify-center">
                <v-col cols="7" class="usehow_title">
                    <p>02</p>
                    <p>STEP</p>
                    <p>세탁 신청</p>
                </v-col>
                <v-col cols="2" offset="1" class="usehow_title_icon">
                    <img src="/images/images/usehow_icon2.png" alt="" class="usehow_icon">
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">'세탁 신청'을 눌러<br>
                        고객님의 정보를 입력해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img2.png" alt="" width="100%" class="detail-img">
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">픽업 날짜와 배송 예정일을 확인해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img3.png" alt="" width="100%" class="detail-img">
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">신청하실 세탁물을 선택해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img4.png" alt="" width="100%" class="detail-img">
                </v-col>
                <v-col cols="10" class="explain_text mt-2">
                    <p>&#x203B; 요금표에 각 세탁물의 가격 측정 기준이 기재되어 있습니다.<br>
                        유의사항과 제외 품목을 참고하여 세탁물을 선택해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <v-btn height="49px" width="100%" flat color="blue" to="/charge">요금표 확인하기</v-btn>
                </v-col>
            </v-row>
            <div class="bg_color"></div>
            <v-row class="d-flex justify-center">
                <v-col cols="7" class="usehow_title">
                    <p>03</p>
                    <p>STEP</p>
                    <p>세탁물 내놓기</p>
                </v-col>
                <v-col cols="2" offset="1" class="usehow_title_icon">
                    <img src="/images/images/usehow_icon3.png" alt="" class="usehow_icon">
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">신청하신 세탁물을 택배 박스에 포장하여<br>
                        집 문 앞에 놓아주세요. </p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img5.png" alt="" width="100%" class="detail-img">
                </v-col>
                <v-col cols="10" class="explain_text mt-2">
                    <p>&#x203B; 지정하신 날짜 하루 전 날 밤에 미리 놓아주세요.<br>
                        택배 기사님이 지정 날짜에 방문하였을 때 택배박스를 수거 하지 못 할 경우 배
                        송 예정일이 지연 될 수 있으며, 2회 이상 수거를 실패할 시 주문이 자동으로 취
                        소됩니다. (택배 비용은 환불 불가)</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">진행 상황은 이용 내역을 확인해주세요.</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img6.png" alt="" width="100%" class="detail-img">
                </v-col>
                <v-col cols="10" class="explain_text mt-2">
                    <p>&#x203B; 수거 이후 주문을 취소할 경우 왕복 택배비가 부과됩니다.<br>
                        세탁중 이후로 확인 되는 주문건은 주문취소가 불가능합니다.</p>
                </v-col>
            </v-row>
            <div class="bg_color"></div>
            <v-row class="d-flex justify-center">
                <v-col cols="7" class="usehow_title">
                    <p>04</p>
                    <p>STEP</p>
                    <p>배송 완료</p>
                </v-col>
                <v-col cols="2" offset="1" class="usehow_title_icon">
                    <img src="/images/images/usehow_icon4.png" alt="" class="usehow_icon">
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="10" class="usehow_subtitle">
                    <p class="mt-10">깨끗하게 세탁된 고객님의 소중한 세탁물을<br>
                        집 앞으로 배송해 드려요!</p>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center mt-6">
                <v-col cols="10">
                    <img src="/images/images/usehow_img7.png" alt="" width="100%" class="detail-img">
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import { useRouter} from 'vue-router';

const router = useRouter();

const goBack = () => {
 router.push('/');
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
  'opsz' 24
}
template, div, footer{
    padding:0
}

.bg_color {
    background: #f6f6f8;
    height: 10px;
    margin-top: 100px;
}

.top_visual {
    width: 100%;
    height: 250px;
    background: #000;
    overflow: hidden;
    position: relative;
}
.top_visual p {
    position: absolute;
    color: #fff;
    z-index: 7;
    font-size: 18px;
    font-weight: bold;
    left: 50px;
    bottom: 50px;
}
.top_visual p span {
    font-size: 24px;
}
.top_visual img {
    width: 100%;
    opacity: .5;
}
.usehow_title {
    margin-top: 110px;
}
.usehow_title p {
    font-weight: 900;
}
.usehow_title p:nth-child(1){
    font-size: 45px;
    line-height: 30px;
}
.usehow_title p:nth-child(2){
    font-size: 20px;
}
.usehow_title p:nth-child(3){
    font-size: 28px;
}
.usehow_title_icon {
    position: relative;
}
.usehow_icon {
    width: 127px;
    opacity: .1;
    position: absolute;
    right: 0;
    bottom: 0;
}

.usehow_subtitle p {
    font-weight: 900;
    color: #535A6C;
}

.explain_text p {
    font-size: 12px;
    color: #A1A8BD;
}

.detail-img {
    border-radius: 20px;
}
</style>