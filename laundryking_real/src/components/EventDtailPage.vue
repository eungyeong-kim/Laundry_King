<template>
  <v-app>
    <v-main>
      <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>이벤트</h2></v-col>
        <v-col></v-col>
      </v-row>

      <v-container>
        <v-row class="my-4 d-flex justify-center align-center">
          <v-col class="d-flex justify-center align-center" cols="auto">
            <v-img src="/images/images/eventdetail1.jpg" class="logo-image" />
          </v-col>
          <v-col class="text-center d-flex justify-center align-center" cols="auto">
            <p>X</p>
          </v-col>
          <v-col class="d-flex justify-center align-center" cols="auto">
            <v-img src="/images/images/eventdetail4.png" class="logo-image" />
          </v-col>
        </v-row>
        
        <!-- 새로운 콘텐츠 추가 부분 -->
        <v-row class="my-4 d-flex justify-center align-center">
          <v-col class="text-center">
            <v-img src="/images/images/eventdetail1.jpg" class="event-image1" />
            <p class="eventdetail-text">세탁특공대 X 스너글<br>
                설문조사 참여 이벤트</p>
            <v-img src="/images/images/eventdetail2.jpg" class="event-image2" />
            <p class="eventdetail-text">SURVEY EVENT<br>이벤트 기간 및 당첨 상품</p>
          </v-col>
        </v-row>

        <!-- 새로운 상자 추가 부분 -->
        <v-row class="my-4">
          <v-col cols="12">
            <div class="new-box">
              <v-img src="/images/images/eventdetail3.jpg" class="new-box-image" />
              <div class="new-box-text">
                <v-img src="/images/images/eventdetail5.png" class="new-box-image-top" />
                <h3>블루스파클 플러스<br>
                    섬유탈취제 150ml</h3>
                <p>
                  50명 추첨
                </p>
              </div>
            </div>
            
            <div class="event-date">
              <p class="honeybox-text">이벤트 기간<br><span class="color-text">2024.08.01(목)  ~ 2024.10.10(화)</span><br><br>
                당첨자 발표<br><span class="color-text">2024.10.21(월)</span><br>
              </p>
            </div>
          </v-col>
        </v-row>
        
        <!-- 버튼 추가 부분 -->
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn class="blue-button">
                설문 참여하기
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/event');
    },
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 80px;
  color: #A1A8BD;
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
}

.v-icon {
  color: #202020;
}

.v-tab {
  font-weight: 400;
}

.v-tab--active {
  font-weight: 600;
}

/* event detail */


.logo-image {
  width: 80px; 
  height: 80px; 
}

.eventdetail-text {
    font-weight: bold;
    font-size: 25px;
    color: #3393EC;
    margin-bottom: 50px;
}

.event-image1 {
  width: 300px; 
  height: auto; 
  margin: 0 auto; 
  border-radius: 20px;
  margin-bottom: 50px;
}

.event-image2 {
  width: 500px; 
  height: auto; 
  margin: 0 auto; 
  border-radius: 20px;
}

/* 새로운 상자 스타일 */
.new-box {
  display: flex;
  border-radius: 20px; 
  background-color: #F4FAFE; 
  padding: 20px;
  max-width: 500px;
  height: 180px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.new-box-image {
  width: 40%; 
  height: auto; 
}

.new-box-image-top {
    width: 35%; 
    margin-top: -20px;
    margin-bottom: 10px;
}

.new-box-text {
  width: 60%; 
  padding: 20px;
}

.new-box-text h3 {
  font-size: 15px;
  color: #202020;
  margin-bottom: 10px;
}

.new-box-text p {
  font-size: 16px;
  color: #3393EC;
}

.event-date {
  background-color: #F0F2F9; 
  padding: 20px; 
  border-radius: 20px;
  margin-bottom: 20px; 
  text-align: left; 
  line-height: 1.5;
  font-weight: bold;
  max-width: 500px;
  margin: 0 auto;
}

.color-text {
    color: #A1A8BD;
}

/* 버튼 스타일 */
.blue-button {
  background-color: #2196F3;
  font-weight: bold;
  border-radius: 10px;
  color: #ffffff;
  width: 500px;
  box-shadow: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 중앙 정렬 */
  height: 50px; /* 버튼 높이 설정 (필요 시 조정) */
  font-size: 18px;
}

.blue-button:hover {
  background-color: #2979FF; 
}
</style>
