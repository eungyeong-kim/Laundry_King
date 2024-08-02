<template>
    <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>자주 묻는 질문</h2></v-col>
        <v-col></v-col>
        </v-row>

        <v-container class="mt-10">
            <v-row no-gutters>
                
            <div class="button_box"></div>
                <v-col offset="2" cols="8" class="d-flex flex-wrap justify-center">
                <div v-for="selectbox in boxes" :key="selectbox" class="button_select">
                    {{ selectbox.select }}
                </div>
                </v-col>

            </v-row> 
        </v-container>
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
            title: "",
            content: "" }
            ],
            boxes:[
                {select: "일반배송"},
                {select: "택배픽업"},
                {select: "주문"},
                {select: "수거/배송"},
                {select: "세탁"},
                {select: "결제"},
                {select: "회원"},
                {select: "주문정보"}
            ]
        }},
        methods: {
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

.button_box{
    background-color:#f7f9fc;
    width: 100%;
    height: 152px;
}
.button_select{

    font-size: 14px;
    width: 25%;
    height: 64px;
    background-color: #fff;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2196F3
}
.button_select:hover{
    background-color: #F4FAFE;
    color: #2196F3
    
}
.flex-wrap{
    margin:0;
    padding:0;
}

</style>