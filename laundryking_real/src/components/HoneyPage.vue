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
          <h2>세탁꿀팁</h2>
        </v-col>
        <v-col></v-col>
      </v-row>

      <v-container class="d-flex flex-column align-center">
        <v-tabs v-model="activeTab" background-color="blue" dark centered>
          <v-tab>진행중인 이벤트</v-tab>
          <v-tab>종료된 이벤트</v-tab>
          <v-tab>추가된 이벤트 1</v-tab>
          <v-tab>추가된 이벤트 2</v-tab>
          <v-tab>추가된 이벤트 3</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <!-- 진행중인 이벤트 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 0" class="event-list">
              <v-list>
                <v-list-item-group v-for="event in ongoingEvents" :key="event.id">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ event.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ event.date }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-tab-item>

          <!-- 종료된 이벤트 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 1" class="event-list">
              <v-list>
                <v-list-item-group v-for="event in endedEvents" :key="event.id">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ event.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ event.date }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-tab-item>

          <!-- 추가된 이벤트 1 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 2" class="event-list">
              <p>추가된 이벤트 1 내용</p>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 1 - 아이템 1</v-list-item-title>
                    <v-list-item-subtitle>2024-07-25</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 1 - 아이템 2</v-list-item-title>
                    <v-list-item-subtitle>2024-07-26</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-tab-item>

          <!-- 추가된 이벤트 2 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 3" class="event-list">
              <p>추가된 이벤트 2 내용</p>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 2 - 아이템 1</v-list-item-title>
                    <v-list-item-subtitle>2024-07-27</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 2 - 아이템 2</v-list-item-title>
                    <v-list-item-subtitle>2024-07-28</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-tab-item>

          <!-- 추가된 이벤트 3 탭 -->
          <v-tab-item>
            <div v-if="activeTab === 4" class="event-list">
              <p>추가된 이벤트 3 내용</p>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 3 - 아이템 1</v-list-item-title>
                    <v-list-item-subtitle>2024-07-29</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>추가된 이벤트 3 - 아이템 2</v-list-item-title>
                    <v-list-item-subtitle>2024-07-30</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
        { id: 1, title: '진행중 이벤트 1', date: '2024-08-01' },
        { id: 2, title: '진행중 이벤트 2', date: '2024-08-05' }
      ],
      endedEvents: [
        { id: 1, title: '종료된 이벤트 1', date: '2024-07-15' },
        { id: 2, title: '종료된 이벤트 2', date: '2024-07-20' }
      ]
    };
  },
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

.event-list {
  width: 100%;
}
</style>
