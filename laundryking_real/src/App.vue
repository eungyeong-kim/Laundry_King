<template>
  <v-app>
    <v-navigation-drawer
    v-model="drawer"
    app
    location="right"
    >
      <v-list>
        <v-list-item title="MENU" class="text-center"></v-list-item>
        <v-divider></v-divider>

        <v-list-item @click="navTo('/')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">home</span></v-icon>
              HOME
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="navTo('/login')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">logout</span></v-icon>
              LOGIN
              <v-icon class="ml-auto" color="blue">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="navTo('/info')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">info</span></v-icon>
              NOTICE
              <v-icon class="ml-auto" color="blue">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="navTo('/qna')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">help</span></v-icon>
              FAQ
              <v-icon class="ml-auto" color="blue">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="navTo('/event')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">featured_seasonal_and_gifts</span></v-icon>
              EVENT
              <v-icon class="ml-auto" color="blue">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="navTo('/orderhistory')">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-cneter">
              <v-icon class="mr-4" color="blue"><span class="material-symbols-outlined">receipt_long</span></v-icon>
              ORDER HISTORY
              <v-icon class="ml-auto" color="blue">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
    <v-app-bar app dark color="blue">
    <v-toolbar-title class="d-flex justify-center"><h1><img class="logo" src="/images/images/logo-light.png" alt="세탁왕" width="100"/></h1></v-toolbar-title>
    
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
    class="d-flex flex-wrap justify-center align-center mt-16">
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
  margin-left: 24px;
  display:block;
  align-items: center;

}

</style>


<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';

const drawer = ref(false);
const router = useRouter();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navTo = (path)=>{
  router.push(path);
  drawer.value = false;
}
</script>
