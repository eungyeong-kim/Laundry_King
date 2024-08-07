<template>
  <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>주문내역입니다.</h2></v-col>
        <v-col></v-col>
        </v-row>
    </v-main>
</template>

<script>
    export default{
        goBack(){
        this.$router.go(-1);
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
  'opsz' 24;
}

template, div, footer{
    padding:0;
}
</style>