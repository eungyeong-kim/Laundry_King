<template>
    <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>공지사항</h2></v-col>
        <v-col></v-col>
        </v-row>

        <v-container class="mt-10">
            
            <v-expansion-panels>
                <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="10">
                <v-expansion-panel v-for="item in items" :key="item" class="mb-2">
                    <v-expansion-panel-title class="custom" :icon="chevron_backward">
                    <div class="title_wrap">
                    <p>{{ item.title }}</p>
                    <p>{{ item.writtenDate }}</p>
                    </div>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                    <p v-html="item.content"></p>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                </v-col>
                <v-col cols="1"></v-col>
                </v-row>
            </v-expansion-panels>
        
        </v-container>
    </v-main>

</template>

<script>
    export default{
    data(){
        return{
            items:[
            {
            title: "• [ 2024년 픽업지역별 여름 휴무 안내 ]",
            writtenDate: "작성일 : 2024.07.30",
            content:  ` <h3>&#91;2024년 픽업지역별 여름 휴무 안내&#93;</h3><br>
                <p>&#42; 의정부&#44; 도봉구&#44; 노원구&#44; 남양주 별내&#44; 양주 옥정</p>
                <p class="font-weight-bold">휴무기간 &#58; 8월 3일 &#126; 8월 10일</p><br>
                <p>&#42; 마포구&#44; 서대문구&#44; 은평구&#44; 고양시 및 택배픽업</p>
                <p class="font-weight-bold">휴무기간 &#58; 8월 7일 &#126; 8월 10일</p><br>
                <p>픽업 지역별로 휴무일이 다르게 운영되오니 참고 부탁드립니다&#46;</p>` },
            {
                title: "• 7월 휴무 안내 ",
                writtenDate: "작성일 : 2024.07.09",
                content: ` <h3>7월 휴무 안내</h3><br>
                <p>7월 2주 4주 토요일은 휴무합니다&#46;<br>
                이용에 착오 없으시기 바랍니다&#46;</p><br>

                <p>감사합니다&#46;</p>`
            },
            {
                title: "• 설 휴무 안내",
                writtenDate: "작성일 : 2024.02.05",
                content: ` <h3>&#91;설 휴무 안내&#93;</h3><br>
                휴무기간 &#58; 2월 9일 &#126; 2월 12일<br>
                새해 복 많이 받으세요 &#126; &#9829`
            },
            {
                title: "• 최소주문금액 변경안내 ",
                writtenDate: "작성일 : 2023.11.09",
                content: `<h3>최소주문금액 변경안내</h3><br>
                <p>계속되는 원가 상승요인으로 인해 불가피하게 2023년 11월 10일 부터<br>
                최소주문금액을 3만원으로 변경하게 되었습니다&#46;</p><br>

                <p>위와 같이 최소 주문금액을 조정하게 되어 죄송하다는 말씀을 드리며&#44;<br>
                좋은 일자리를 만들고 좋은 세탁 품질 서비스로 우리 사회의<br>
                행복지수를 높이는데 보탬이 되도록 최선을 다하겠습니다&#46;</p><br>

                <p>감사합니다&#46;</p>`
            },
            {
                title: "• 요금 조정 안내",
                writtenDate: "작성일 : 2023.11.09",
                content: `<h3>일부품목 요금인상 안내</h3><br>
                <p>계속되는 원가 상승 요인으로 인해 불가피하게<br> 2023년 11월 10일부터
                    일부 품목에 대해<br> 요금인상을 하게 되었습니다&#46;<br>
                    &#40;자세한 내용은 요금표 전체보기에서 확인하실 수 있습니다&#46;&#41;</p><br>

                    <p>위와 같이 일부 요금을 조정하게 되어 죄송하다는 말씀을 <br>드리며
                    좋은 일자리를 만들고 좋은 세탁품질 서비스로<br> 우리 사회의
                    행복지수를 높이는데 보탬이 되도록<br>최선을 다하겠습니다&#46;<br>
                </p>`
            }
            
            ]
        }
    },

    methods:{
    goBack(){
      this.$router.go(-1);
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

.custom{
    background-color: #F4FAFE;
}
.custom:hover{
    background-color: #e0f2ff;
}
.title_wrap p:first-child{
    width:  180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.title_wrap p:last-child{
    color: #A1A8BD;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title_wrap{
    display:flex;
    gap: 40px
}

@media (min-width: 601px) and (max-width: 960px) {
    .title_wrap{
    display:flex;
    gap: 200px
}
    .title_wrap p:first-child{
    width:  180px;
    white-space: nowrap;
    overflow:inherit;
    text-overflow: inherit;
}
}

@media (min-width: 961px) {
    .title_wrap{
    display:flex;
    gap: 200px
}
    .title_wrap p:first-child{
    width:  180px;
    overflow:inherit;
    text-overflow: inherit;
    white-space: nowrap;
}

}
</style>