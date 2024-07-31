<template>
  <v-app>
    <v-app-bar app dark color="blue">
    <v-toolbar-title class="d-flex justify-center"><img class="logo" src="/images/images/logo-light.png" alt="세탁왕" width="100"/></v-toolbar-title>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
</v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
    app
    class="d-flex flex-wrap justify-center align-center">
    <div class="text-center">
      <img src="/images/images/logo-gray.png" width="150" class="mb-2">
      <p class="text-center" style="color: #aeaeae; font-size: 13px;" >&#40;주&#41;세탁왕 사업자정보<br>
      대표 &#58; 도현숙
      사업자번호 &#58; 637&#45;04&#45;00912<br>
      주소 &#58; 서울시 은평구 연서로15길 34&#44; 1층 101호&#40;구산동&#41;<br>
      연락처 &#58; 1588&#45;4333<br>
      통신판매업신고번호 &#58; 제2021&#45;서울은평&#45;0076호<br></p>
      <p style="color: #aeaeae; font-size: 13px;"class="mt-2">COPYRIGHT &copy; 2024&#46; All rights reserved&#46;</p>
    </div>
    </v-footer>
  </v-app>
</template>



<style>
.logo{
  display:block;
  align-items: center;
}

</style>


<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
