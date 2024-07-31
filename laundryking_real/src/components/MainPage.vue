<template>
    <div>
        <div class="top"></div>
        <v-row class="d-flex justify-center mt-5">
            <v-col cols="5" class="text-center">
                <v-btn class="w-100 h-100 border-radius-15 text-left-btn" variant="outlined" color="#F0F2F9" to="/pickupapply">
                    <p class="applybtn">세탁<br>신청</p>
                </v-btn>
            </v-col>

            <v-col cols="5" class="text-center">
                <v-btn class="w-100 h-100 border-radius-15 text-left-btn" variant="outlined" color="#F0F2F9">
                    <p class="applybtn">요금표</p>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-btn flat color="#64B5F6" class="w-100 h-auto text-right-btn border-radius-15">
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

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-btn color="#F0F2F9" class="w-100 h-auto text-right-btn border-radius-9999" variant="outlined">
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

        <v-row>
            <v-col>
                <v-card class="border-radius-15">
                    <p>세탁꿀팁</p>
                </v-card>
            </v-col>
        </v-row>

        <v-divider class="mt-5"></v-divider>
    </div>
</template>

<script>
    export default{
        
    }
</script>

<style>
.top {
    width: 100%;
    height: 219px;
    background: #eee;
}
.applybtn {
    font-size: 20px;
    font-weight: bold;
    padding: 33px 0 123px 26px;
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
.text-left-btn {
    justify-content: flex-start;
}
.border-radius-15 {
    border-radius: 15px;
}
.border-radius-9999 {
    border-radius: 9999px;
}
.f-color-A1A8BD {
    color: #A1A8BD;
    font-size: 10px;
}
.cut-line {
    width: 100%;
    height: 10px;
    background: #FAFAFA;
}
.v-card {
    height: 236px;
}
</style>