<template>
  <v-app>
    <v-main>
      <v-row style="padding:0;">
        <v-col>
          <button @click="goBack">
            <span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span>
          </button>
        </v-col>
        <v-col class="d-flex justify-center align-center mt-2">
          <h2>이벤트</h2>
        </v-col>
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
      console.log('돌아가기 버튼 클릭됨');
    }
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
  width: 80px; /* 원하는 최대 너비로 조정 */
  height: 80px; /* 원하는 최대 높이로 조정 */
}

.eventdetail-text {
    font-weight: bold;
    font-size: 25px;
    color: #3393EC;
    margin-bottom: 50px;
}

.event-image1 {
  width: 300px; /* 너비 조정 */
  height: auto; /* 비율에 맞춰 자동 조정 */
  margin: 0 auto; /* 가운데 정렬 */
  border-radius: 20px;
  margin-bottom: 50px;
}

.event-image2 {
  width: 500px; /* 너비 조정 */
  height: auto; /* 비율에 맞춰 자동 조정 */
  margin: 0 auto; /* 가운데 정렬 */
  border-radius: 20px;
}

/* 새로운 상자 스타일 */
.new-box {
  display: flex;
  border-radius: 20px; /* 테두리 둥글게 */
  background-color: #F4FAFE; /* 배경 색상 */
  padding: 20px;
  max-width: 500px;
  height: 180px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.new-box-image {
  width: 40%; /* 사진이 상자의 40%를 차지하도록 설정 */
  height: auto; /* 비율에 맞춰 자동 조정 */
}

.new-box-image-top {
    width: 35%; /* 사진이 상자의 35%를 차지하도록 설정 */
    margin-top: -20px;
    margin-bottom: 10px;
}

.new-box-text {
  width: 60%; /* 텍스트가 상자의 60%를 차지하도록 설정 */
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
  background-color: #F0F2F9; /* 상자 배경색 */
  padding: 20px; /* 상자 안쪽 여백 */
  border-radius: 20px; /* 상자 모서리 둥글게 */
  margin-bottom: 20px; /* 상자와 상단 요소 사이 여백 */
  text-align: left; /* 내용 중앙 정렬 */
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
  background-color: #2196F3; /* 파란색 배경 */
  font-weight: bold; /* 글씨 두껍게 */
  border-radius: 10px; /* 둥근 모서리 */
  color: #ffffff;
  width: 500px;
  box-shadow: none;
}

.blue-button:hover {
  background-color: #2979FF; /* 호버 시 색상 변화 */
}
</style>
