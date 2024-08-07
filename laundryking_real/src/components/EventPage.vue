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

      <v-container class="d-flex flex-column align-center">
        <v-tabs v-model="activeTab" background-color="blue" dark centered>
          <v-tab>진행중인 이벤트</v-tab>
          <v-tab>종료된 이벤트</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <div v-if="activeTab === 0" class="event-list">
              <v-card
                v-for="event in ongoingEvents"
                :key="event.id"
                :style="{ backgroundColor: event.backgroundColor }"
                class="mb-0 event-card"
                outlined
                @click="navigateToDetail(event.id)"
              >
                <v-row>
                  <v-col cols="8">
                    <div class="subtitle-box">
                      <v-card-subtitle class="subtitle">{{ event.subtitle }}</v-card-subtitle>
                    </div>
                    <v-card-title class="title" v-html="event.title"></v-card-title>
                    <v-card-text class="description">{{ event.description }}</v-card-text>
                  </v-col>
                  <v-col cols="4" class="d-flex align-center justify-center">
                    <v-img :src="event.image" class="event-image"></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-tab-item>

          <v-tab-item>
            <div v-if="activeTab === 1" class="event-list">
              <v-card
                v-for="event in endedEvents"
                :key="event.id"
                :style="{ backgroundColor: event.backgroundColor, opacity: 0.5 }" 
                class="mb-0 event-card"
                outlined
              >
                <v-row>
                  <v-col cols="8">
                    <div class="subtitle-box">
                      <v-card-subtitle class="subtitle">{{ event.subtitle }}</v-card-subtitle>
                    </div>
                    <v-card-title class="title" v-html="event.title"></v-card-title>
                    <v-card-text class="description">{{ event.description }}</v-card-text>
                  </v-col>
                  <v-col cols="4" class="d-flex align-center justify-center">
                    <v-img :src="event.image" class="event-image"></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      ongoingEvents: [
        { id: 1, subtitle: '경품증정', title: '세탁왕에서만 열리는<br> 리뷰 이벤트라곰!', description: '스너글로 세탁받고 선물까지!', image: '/images/images/icon-bear.png', backgroundColor: '#E0F8EA' },
        { id: 2, subtitle: '품목할인', title: '소중한 신발을 특별하게<br> 비브람 밑창 보강', description: '비브람 밑창 보강', image: '/images/images/icon-shoes.png', backgroundColor: '#E0F2F8' },
        { id: 3, subtitle: '품목할인', title: '커피 한 잔 값으로<br>옷장을 넓게', description: '5,000원 할인 쿠폰이 숨어있어요', image: '/images/images/icon-box.png', backgroundColor: '#E0E2F8' },
        { id: 4, subtitle: '이벤트', title: '여름 맞이 운동화 세탁<br>세탁왕으로 해결!', description: '1+1 쿠폰이 숨어있어요', image: '/images/images/icon-sneakers.png', backgroundColor: '#F8ECFD' },
        { id: 5, subtitle: '경품증정', title: '그램 단위로 구매하는<br>빈티지 스토어 ‘워셔’', description: '이젠 합리적으로 득템하세요', image: '/images/images/icon-washer.png', backgroundColor: '#FCEAE4' },
        { id: 6, subtitle: '품목할인', title: '대한민국 최저가<br>이불세탁 6,800원', description: '제습제도 챙겨드려요', image: '/images/images/icon-bed.png', backgroundColor: '#DEE8F7' },
      ],

      endedEvents: [
        { id: 7, subtitle: '경품증정', title: '세탁왕으로 커피 쿠폰<br>무제한 즐기는 꿀팁', description: '오늘 커피 한 잔 어때요?', image: '/images/images/icon-coffecup.png', backgroundColor: '#F7E5DE' },
        { id: 8, subtitle: '경품증정', title: '아이폰, 에어팟 맥스<br> 당첨 주인공이 되세요!', description: '세탁왕 300만 주문 돌파 기념', image: '/images/images/icon-iphone.png', backgroundColor: '#E0F2F8' },
        { id: 9, subtitle: '경품증정', title: '민감한 아이를 위한<br>매트리스와 소파 케어', description: '최대 100,000원 할인', image: '/images/images/icon-sofa.png', backgroundColor: '#FFC5B2' },
        { id: 10, subtitle: '이벤트', title: '여름 맞이 운동화 세탁<br> 세탁왕으로 해결!', description: '1+1 쿠폰이 숨어있어요', image: '/images/images/icon-sportshoes.png', backgroundColor: '#F8ECFD' },
        { id: 11, subtitle: '경품증정', title: '그램 단위로 구매하는<br>빈티지 스토어 ‘워셔’', description: '이젠 합리적으로 득템하세요', image: '/images/images/icon-washer.png', backgroundColor: '#FCEAE4' },
        { id: 12, subtitle: '경품증정', title: '세탁왕에서만 열리는<br> 리뷰 이벤트라곰!', description: '스너글로 세탁받고 선물까지!', image: '/images/images/icon-bear.png', backgroundColor: '#E0F8EA' },
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push('/main');
    },
    navigateToDetail(id) {
      if (id === 1) {
        this.$router.push('/eventdetail');
      }
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

/* event list */
.event-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  height: 850px;
}

.event-card {
  border-radius: 20px;
  margin-top: 20px;
  width: 300px;
  max-width: 300px;
  padding: 3px;
  box-shadow: none;
}

.event-image {
  width: 100%;
  object-fit: cover;
  margin-right: 30px;
}

.event-card .v-row {
  align-items: center;
}

.subtitle-box {
  display: inline-block;
  background-color: #535A6C;
  border-radius: 50px;
  padding: 3px;
  width: 80px;
  margin-left: 15px;
  margin-top: 10px;
  text-align: center;
}

.subtitle {
  font-size: 10px;
  color: #ffffff;
  opacity: 100%;
  font-weight: bold;
}

.title {
  font-size: 13px;
  font-weight: bold;
  overflow: hidden;   
  text-overflow: ellipsis; 
  line-height: 1.4; 
}

.description {
  font-size: 10px;
  color: #444;
}
</style>
