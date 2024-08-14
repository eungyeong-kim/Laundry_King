<template>
  <v-app>
    <v-main>
      <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>세탁꿀팁</h2></v-col>
        <v-col></v-col>
      </v-row>

      <v-container class="d-flex flex-column align-center">
        <!-- 탭 컨테이너, 가로 스크롤 가능 -->
        <div class="tabs-container">
          <v-tabs v-model="activeTab" background-color="blue" dark centered class="tabs">
            <v-tab>세탁비닐 활용법</v-tab>
            <v-tab>수건 세탁법</v-tab>
            <v-tab>여름옷 보관법</v-tab>
            <v-tab>늘어난 맨투맨</v-tab>
            <v-tab>세탁기 청소법</v-tab>
          </v-tabs>
        </div>

        <v-tabs-items v-model="activeTab">
          <!-- 세탁비닐 활용법 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 0" class="honey-list">
              <p class="large-text">“세탁왕 비닐 이렇게 활용하세요”</p>
              
              <p class="normal-text">세탁물을 배송할 때 오염 방지를 위해 사용하는 비닐.<br>
                세탁왕은 내구성이 우수한 비닐을 씌워 특수포장해서 보내 드리는데요. 세탁할 옷이 많은 요즘같은 때는 비닐이 많이 나와 부담스러울 때도 있죠<br>
                물론 비닐 재활용 쓰레기로 분리배출 하는 방법도 있지만,
                튼튼하게 만들어진 세탁왕의 비닐을 한 번 더 사용할 수 있는 꿀팁을 알려드릴게요!</p>
          
              <p class="large-text">“반드시 비닐을 벗겨 보관하세요!”</p>
              <p class="normal-text">세탁한 옷을 포장한 채로 보관하면 변색과 곰팡이의 원인이 될 수 있으므로 포장을 벗겨주세요!</p>

              <img src="/images/images/honeyimg1.jpg" alt="세탁비닐" class="honey-image" />
              <p class="normal-text">비닐의 상단 목 부분을 잡고 뜯으면 포장을 쉽게 벗길 수
                있어요. 깨끗하게 벗겨지면 쾌감...</p>

              <h2 class="honeyh2">세탁왕이 알려주는<br>
                비닐 활용법 3가지!</h2>

              <p class="large-text">1. 분리수거용 봉투로 활용</p>
              <img src="/images/images/honeyimg2.jpg" alt="세탁비닐" class="honey-image" />
              <p class="normal-text">캔, 플라스틱, 비닐, 병 등 재활용 쓰레기를 담아 배출해보
                세요. 튼튼하고 크기도 큼직해서 쉽게 찢어지지 않아요!</p>

              <p class="large-text">2. 계절 가전 보관용으로 활용</p>
              <img src="/images/images/honeyimg3.jpg" alt="세탁비닐" class="honey-image" />
              <p class="normal-text">겨울, 여름에 사용했던 계절 가전을 보관할 때 먼지 방지용 덮개로 활용해보세요. 난로 온풍기, 가습기, 선풍기 등 부피가 큰 제품들도 문제 없어요!</p>

              <p class="large-text">3. 셀프 염색용 비닐보호로 활용</p>
              <img src="/images/images/honeyimg4.jpg" alt="세탁비닐" class="honey-image" />
              <p class="normal-text">집에서 셀프염색 하는 분들이라면 활용도 100%! 옷이 담겨있던 비닐이니 어깨에 딱 맞아 완벽하게 보호된다는 점이 포인트</p>

              <p class="large-text">4. 세탁 신청 봉투로 활용</p>
              <img src="/images/images/honeyimg5.jpg" alt="세탁비닐" class="honey-image" />
              <p class="normal-text">겨울옷, 이불, 생활빨래 등 부피가 큰 세탁물을 담을만한 
                가방이 없어 고민된다면 큼직한 세탁왕 비닐이 딱이죠!</p>

                <div class="honeybox">
      <p class="honeybox-text">이렇게 활용도가 높은 비닐! 비닐 쓰레기로 바로 버리기보단 따로 보관했다가 한 번 더 사용해보세요. 오늘 밤 11시까지 집 앞에 내놓으면 회수 후 이틀 뒤 새벽에 가져다 드릴게요! 40년 이상의 세탁 전문가가 각 케어 라벨에 따라 섬세하게 관리합니다.</p>
    </div>
                    
            </div>
          </v-tab-item>

          <!-- 수건 세탁법 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 1" class="honey-list">
              <p class="large-text">아무리 세탁해도<br>
                수건에서 냄새가 난다면?</p>
              
              <p class="normal-text">습하고 세균이 많은 환경에 자주 노출되는 수건은 1~2년에 
                한 번씩 교체해주는 게 좋지만 평소에 잘 관리한다면 더 오래 사용할 수 있어요. 깨끗하게 수건 관리하는 법 알려드릴게요!</p>

            <img src="/images/images/honeyimg6.jpg" alt="세탁비닐" class="honey-image" />
          
              <p class="large-text">1. 젖은 수건은 건조 후 세탁하기</p>
              <p class="normal-text">젖은 수건을 세탁기 안에 넣으면 세균과 곰팡이균이 번식하기 쉬워요. 겉으로는 깨끗해보여도 각질, 피지 등이 함께 묻어나니 <span class="highlight">한 번 사용한 수건은 바짝 건조 후 세탁</span>하는 거 잊지마세요!</p>


              <p class="large-text">2. 중성세제 사용하기</p>
              <p class="normal-text">일반적인 세제는 ‘알칼리성’인데, 세정력은 높지만 100%
              면소재를 손상시키기 때문에<span class="highlight">수건이 뻣뻣하고 거칠어질 수
            있어 중성세제 사용을 추천</span> 해요!</p>

          <p class="large-text">3. 섬유유연제 사용하지 않기</p>
              <p class="normal-text">섬유유연제는 섬유를 약화시키고 흡수력을 떨어뜨려 수명
              을 단축시켜요. 냄새가 난다면 <span class="highlight">식초나 과탄산소다를 넣어
              헹구면 살균과 탈취 효과</span>도 한번에!</p>
            </div>
          </v-tab-item>

          <!-- 여름옷 보관법 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 2" class="honey-list">
              <p class="large-text">내년에도 입을 수 있는<br>
                여름옷 보관법?</p>
              
              <p class="normal-text">신선한 가을 바람이 느껴질 때, 슬슬 여름옷을 정리할 바로 
                그 때! 올해 예쁘게 잘 입었던 여름옷, 보관만 잘 해두어도 
                내년에 또 입을 수 있어요. 딱 하루만 시간 내서 여름옷 
                이렇게 보관해보세요!</p>

            <img src="/images/images/honeyimg7.jpg" alt="세탁비닐"
            class="honey-image" />
          
              <p class="large-text">1. 옷장 곰팡이 여부 확인하기</p>
              <p class="normal-text">여름옷 관리보다 더 중요한 건 옷장 곰팡이 관리! <span class="highlight">걸레에 
                소독용 에탄올을 묻혀 곰팡이를 닦아내고 며칠 환기</span>를 
                시켜주세요. (습기 제거에 효과가 좋은 세탁왕 제습제를 
                곳곳에 넣어주는 것도 방법!)</p>


              <p class="large-text">2. 무거운 옷부터 넣어 보관하기</p>
              <p class="normal-text">여름옷은 얇고 손상되기 쉬운 소재라 <span class="highlight">무거운 옷부터 차곡
                차곡 접어 넣고, 그 위로 가벼운 옷</span>을 올려주세요. 내년에
                꺼냈을 때 가볍게 주름만 펴주면 끝!</p>

              <p class="large-text">3. 무조건 세탁 후 보관하기</p>
              <p class="normal-text">육안으로는 깨끗해보이고 한 번도 입지 않은 옷이라도 
              옷장 속에서 다양한 오염에 노출되었을 가능성이 높아요. <span class="highlight">한 번 꺼낸 여름옷이라면 무.조.건 세탁 필수!</span>
              </p>


              <p class="large-text">4. 어두운 곳에 보관하기</p>
              <p class="normal-text">옷의 색과 상관 없이 햇빛에 노출되면 하얗게 변색되기 
              쉽기 때문에 <span class="highlight">어두운 옷장이나 박스에 넣어 빛을 차단</span>해주
              세요. 투명한 케이스에 넣어 햇빛이 있는 곳에 보관하는 
              것은 절대 금물!</p>

              <div class="honeybox">
      <p class="honeybox-text">여름옷 관리가 귀찮다면 세탁왕 앱에서 면소재 옷은 생활빨래로 맡기고, 블라우스나 섬세한 소재는 맞춤세탁으로 맡겨 여름옷 세탁 한 번에 끝내보세요!</p>
    </div>

            </div>
          </v-tab-item>

          <!-- 늘어난 맨투맨 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 3" class="honey-list">
              <p class="large-text">아끼는 맨투맨<br>
                목이 늘어났다면?</p>
              
              <p class="normal-text">환절기에 가장 편하게 입을 수 있는 아이템 맨투맨! 아끼는 
            목이 늘어났을 때는 버려야 할까요? NO!  늘어난 맨투맨 
              다시 입을 수 있는 방법 알려드릴게요.</p>

            <img src="/images/images/honeyimg8.jpg" alt="세탁비닐"
            class="honey-image" />

            <p class="arrow">↓</p>

            <img src="/images/images/honeyimg9.jpg" alt="세탁비닐"
            class="honey-image" />
          
              <p class="large-text">1. 우레탄 고무줄 넣고 수선하기</p>
              <p class="normal-text">늘어난 티셔츠, 맨투맨을 수선하고 싶다면 0.6mm가량의
우레탄 고무줄 혹은 수예용 고무줄과 바늘을 준비해 목의
이음새에 넣어주세요. 목둘레 전체 한바퀴를 둘러주고
매듭을 지은 뒤 다림질 해주면 끝!</p>


              <p class="large-text">2. 다리미와 물풀을 이용한 수선하기</p>
              <p class="normal-text">접착할 때 쓰는 물풀을 준비하고, 물과 물품을 9:1 비율로 
맞추어 분무기에 넣어주세요. 늘어난 목 주위에 뿌리고 
다림질을 해주면 순간적으로 물풀 속 ‘폴리비닐알코올’
성분으로 섬유에 탄성을 주면서 일시적인 복원이 가능해요</p>

              <p class="large-text">3. 세탁왕으로 1분만에 수선하기</p>
              <p class="normal-text">교복처럼 입는 맨투맨, 집에서 수선했다가 망칠까봐 걱정
된다면 30년 수선 전문가가 직접 케어하는 세탁왕 수선 
서비스를 이용해보세요. 늘어난 목둘레 시보리는 복원하
고, 새 옷이라면 늘어나지 않게 미리 보강해드려요.
              </p>

              <div class="honeybox">
      <p class="honeybox-text">늘어난 티셔츠, 맨투맨 수선이 어려우시다면
세탁왕에게 맡겨주세요. 케어라벨가 섬유,
오염의 종류에 따라 세탁전문가가 알아서
세탁하고 수선해드려요.</p>
    </div>
            </div>
          </v-tab-item>

          <!-- 세탁기 청소법 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 4" class="honey-list">
              <p class="large-text">세탁기 청소법<br>
                딱 3가지만 알면 끝!</p>
              
              <p class="normal-text">세탁기를 돌려도 옷에서 쿰쿰한 냄새가 난다면? 냄새를 
제거하는 가장 좋은 방법은 세탁조 청소! 세탁조란 
세탁물을 담는 통을 뜻하는데 지저분한 옷, 먼지가 많은 
수건 등을 세탁하면서 불순물이 쌓이고 습기로 곰팡이균이
있을 가능성도 커요. 빨래는 매일같이 하면서, 세탁조 청소
는 방치하고 있었다면 주목! 세탁조 청소 3가지 꿀팁 공개</p>

            <img src="/images/images/honeyimg10.jpg" alt="세탁비닐"
            class="honey-image" />
          
              <p class="large-text">1. 과탄산소다 + 수건으로 세척하기</p>
              <p class="normal-text">수건 한장과 함께 과탄산소다 두 스푼을 넣어 통세척 모드
로 세탁기를 돌려주세요! 수건이 세탁조 내부를 닦아주고, 
살균력 & 탈취력이 높은 과탄산소다가 웬만한 냄새를 잡아
준답니다. </p>


              <p class="large-text">2. 식초 한 컵으로 세척하기</p>
              <p class="normal-text">식초는 가정에 하나씩은 가지오 있는 필수템이죠! 가장 
간편하고 세탁조를 세척하려면, 식초 한 컵을 세탁조에 
바로 넣고 통세척모드로 돌려주세요! 냄새 나는 옷을 세탁
할 때는, 헹굼 단계에서 식초 한스푼을 넣어주면 식초의 
살균력으로 쿰쿰한 냄새가 사라져요</p>

              <p class="large-text">3. 락스 하나로 세척하기</p>
              <p class="normal-text">화장실 청소할 때 꼭 쓰게되는 락스를 세탁조 청소에도 
활용할 수 있다는 사실 알고 계신가요? 락스 200ml 
가량을 넣어주고, 물높이를 최대로 한 뒤 통세척 모드로 
돌려주세요! 세척 후에는 세탁기와 세제통을 활짝 열어두
어 내부 환기시키는 것도 잊지마세요!
              </p>

              <div class="honeybox">
      <p class="honeybox-text">세탁조 관리가 까다롭고 귀찮다면, 물세탁이
가능한 생활빨래를 세탁해 깔끔하게 개어드
리는 세탁특공대 생활빨래 서비스를 이용해
보세요!</p>
    </div>
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
      activeTab: 0
    };
  },
  methods: {
    goBack() {
      this.$router.push('/main');
    },
  },
  mounted() {
    window.scrollTo(0, 0);
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

.honey-list {
  width: 100%;
  text-align: center; 
  max-width: 900px;
}

.honey-image {
  width: 100%;
  max-width: 1000px; 
  height: auto; 
  border-radius: 20px;
}


.tabs-container {
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: center; 
  padding: 0 10px; 
  margin-bottom: 50px;
}

.tabs {
  display: flex;
  flex-wrap: nowrap; 
  white-space: nowrap; 
}

.tabs .v-tab {
  min-width: 120px; 
  flex: 0 0 auto; 
}

.tabs::-webkit-scrollbar {
  display: none; 
}

.honeyh2 {
  text-align: left;
  margin-bottom: 20px;
}

.large-text {
  font-size: 1.2em; 
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

.normal-text {
  text-align: left;
  margin-bottom: 30px;
}


.honeybox {
  background-color: #F0F2F9; 
  padding: 20px; 
  border-radius: 20px; 
  margin-bottom: 20px; 
  text-align: center; 
  line-height: 1.1;
}

.honeybox-text {
  font-size: 15px;
  color: #333; 
}


.highlight {
  background-color: #E2E9FF; 
  padding: 0 5px; 
  border-radius: 2px; 
}

.arrow {
  font-size: 24px; 
  padding: 10px;
  font-weight: bold;
}

</style>
