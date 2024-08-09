<template>
  <v-app>
    <v-main>
      <v-container class="centered-container">
        <!-- 헤더 부분 -->
        <v-row class="header-row">
          <v-col class="header-col">
            <button @click="goBack">
              <span class="material-symbols-outlined">chevron_backward</span>
            </button>
          </v-col>
          <v-col class="header-col">
            <h2>주문정보</h2>
          </v-col>
          <v-col></v-col>
        </v-row>

        <!-- 폼 부분 -->
        <v-row class="form-row">
          <v-col cols="12" md="6">
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- 수거예정일 -->
              <div class="form-field-wrapper">
                <label for="pickupDate">수거예정일</label>
                <input
                  type="date"
                  id="pickupDate"
                  v-model="pickupDate"
                  @change="updatePickupDate"
                  class="date-input"
                />
                <p class="date-display">선택한 날짜: {{ formattedPickupDate }}</p>
              </div>

              <!-- 발송예정일 -->
              <div class="form-field-wrapper">
                <label for="deliveryDate">발송예정일</label>
                <input
                  type="date"
                  id="deliveryDate"
                  v-model="deliveryDate"
                  readonly
                  class="date-input"
                />
                <p class="date-display">선택한 날짜: {{ formattedDeliveryDate }}</p>
              </div>

              <!-- 세탁 요청사항 -->
              <div class="form-field-wrapper">
                <label for="cleaningRequest">세탁 요청사항</label>
                <textarea
                  id="cleaningRequest"
                  v-model="cleaningRequest"
                  placeholder="세탁 요청사항을 입력해주세요"
                  class="textarea-input"
                ></textarea>
                <p class="blue-text">적어주신 내용을 세탁물 검품시에 참고하겠습니다.</p>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="centered-container">
        <v-row class="form-row">
          <v-col cols="12" md="6">
            <!-- 다음 버튼 위에 정보 상자 추가 -->
            <div class="info-box-wrapper">
              <div class="info-box">
                <div class="info-box-header">
                  <span class="material-symbols-outlined info-box-icon">diamond</span>
                  <span class="info-box-text">프리미엄 케어 신청</span>
                  <button @click="toggleInfoBox" :class="['info-box-button', { checked: isChecked }]">
                    <!-- 체크 아이콘은 숨기기 -->
                    <span class="material-symbols-outlined">{{ isChecked ? '' : '' }}</span>
                  </button>
                </div>
                <!-- 선과 글 추가 -->
                <div class="info-box-detail">
                  <hr class="info-box-line" />
                  <p class="info-box-detail-text">• 고가의 의류나 신발은 단독 세탁과 전용 세제를 사용하는 프리미엄 케어를 권장해드립니다.<br>
                    • 일부 품목만 프리미엄 케어를 신청하실 경우, 요청사항에 프리미엄 케어를 진행할 품목을 남겨주세요.<br>
                    • 프리미엄 케어의 경우 일반/멤버십 요금의 2배가 책정돼요.</p>
                </div>
              </div>
            </div>


            <!-- 상자 부분 -->
<div class="notice-box-wrapper">
  <div class="notice-box">
    <div class="notice-box-header">
      <img src="/images/images/info.png" alt="Info Icon" class="notice-box-icon" />
      <span class="notice-box-text">유의사항</span>
    </div>
    <div class="notice-box-detail">
      <p class="notice-box-detail-text">
        • 1회 최소 주문금액은 30,000원이에요. (픽업 택배비는 별도 결제)<br>
        • 최소 주문금액 미달 시 기준가인 30,000원에서 쿠폰 등 할인이 적용돼요.
      </p>
    </div>
  </div>
</div>


            <!-- 다음 버튼 -->
            <v-btn @click="submit" class="submit-button mt-4">
              다음
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      types: ['의류', '신발', '리빙', '가죽/모피', '잡화', '수선/기술'],
      categories: ['셔츠/블라우스', '신발', '리빙', '악세서리'],
      itemsByCategory: {
        '셔츠/블라우스': [
          { name: '셔츠/블라우스', price: 1900 },
          { name: '슬림핏 와이셔츠/교복셔츠', price: 3000 },
          { name: '남방/티셔츠', price: 4000 },
          { name: '롱/빅 와이셔츠', price: 4000 },
          { name: '롱/빅 남방/티셔츠', price: 5000 },
          { name: '린넨/골덴/데님/면 셔츠', price: 7000 }
        ],
        '신발': [
          { name: '운동화', price: 7000 },
          { name: '발목 운동화', price: 8000 },
          { name: '아동 운동화', price: 8000 },
          { name: '슬리퍼', price: 7000 },
          { name: '어그 슬리퍼', price: 12000 },
          { name: '준 명품 운동화', price: 20000 }
        ],
        '리빙': [
          { name: '이불', price: 10000 },
          { name: '이불 커버', price: 12000 },
          { name: '이불 커버 대형', price: 15000 },
          { name: '요/매트', price: 15000 },
          { name: '요/매트 대형', price: 20000 },
          { name: '커튼', price: 10000 }
        ],
        '악세서리': [
          { name: '벨트', price: 5000 },
          { name: '모자', price: 5000 },
          { name: '목도리', price: 5000 },
          { name: '장갑', price: 5000 }
        ]
      },
      selectedType: null,
      selectedCategory: null,
      selectedItem: null,
      amount: null,
      showTypeDropdown: false,
      showCategoryDropdown: false,
      showItemDropdown: false,
      selectedItems: [],
      totalAmount: 0,
      termsChecked: false,
      boxQuantity: 1,
      pickupFee: 4900,
    };
  },
  computed: {
    ...mapGetters(['fnGetUser']),
    filteredItems() {
      return this.itemsByCategory[this.selectedCategory] || [];
    }
  },
  methods: {
    ...mapActions(['submitOrder']),
    toggleDropdown(dropdownType) {
      if (dropdownType === 'type') {
        this.showTypeDropdown = !this.showTypeDropdown;
        this.showCategoryDropdown = false;
        this.showItemDropdown = false;
      } else if (dropdownType === 'category') {
        this.showCategoryDropdown = !this.showCategoryDropdown;
        this.showTypeDropdown = false;
        this.showItemDropdown = false;
      } else if (dropdownType === 'item') {
        this.showItemDropdown = !this.showItemDropdown;
        this.showTypeDropdown = false;
        this.showCategoryDropdown = false;
      }
    },
    selectType(type) {
      this.selectedType = type;
      this.showTypeDropdown = false;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.showCategoryDropdown = false;
      this.selectedItem = null;
    },
    selectItem(item) {
      this.selectedItem = item.name;
      this.amount = item.price;
      this.showItemDropdown = false;
    },
    submitForm() {
      console.log('submitForm called');
      if (this.selectedCategory && this.selectedItem) {
        console.log('Form valid, submitting');
        const item = this.itemsByCategory[this.selectedCategory].find(i => i.name === this.selectedItem);
        if (item) {
          console.log('Item found:', item);
          const existingItemIndex = this.selectedItems.findIndex(i => i.name === item.name);
          if (existingItemIndex > -1) {
            this.selectedItems[existingItemIndex].quantity += 1;
          } else {
            this.selectedItems.push({ ...item, quantity: 1, category: this.selectedCategory });
          }
          this.updateAmount();
          this.resetForm();
          console.log('Item added to selection:', this.selectedItems);
        }
      } else {
        console.log('Invalid form submission');
      }
    },
    resetForm() {
      this.selectedType = null;
      this.selectedCategory = null;
      this.selectedItem = null;
      this.amount = null;
      this.showTypeDropdown = false;
      this.showCategoryDropdown = false;
      this.showItemDropdown = false;
    },
    updateAmount() {
      this.totalAmount = this.selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    changeQuantity(item, delta) {
      const existingItem = this.selectedItems.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += delta;
        if (existingItem.quantity <= 0) {
          this.removeItem(this.selectedItems.indexOf(existingItem));
        } else {
          this.updateAmount();
        }
      }
    },
    removeItem(index) {
      this.selectedItems.splice(index, 1);
      this.updateAmount();
    },
    goToNextPage() {
      console.log('goToNextPage called');
      if (this.termsChecked && this.totalAmount >= 30000) {
        console.log('Navigating to /ordersuccess');
        const orderData = {
          type: this.selectedType,
          category: this.selectedCategory,
          item: this.selectedItem,
          amount: this.totalAmount,
          boxQuantity: this.boxQuantity,
          pickupFee: this.pickupFee,
          totalAmount: this.totalAmount + this.pickupFee
        };
        this.submitOrder(orderData);
        this.$router.push('/ordersuccess');
      } else {
        console.log('Conditions not met for navigation');
      }
    },
    goBack() {
      console.log('Navigating back to /pickupapply');
      this.$router.push('/pickupapply');
    },
    changeBoxQuantity(delta) {
      this.boxQuantity = Math.max(1, this.boxQuantity + delta);
      this.pickupFee = this.boxQuantity * 4900;
    }
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-row {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}

.header-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-row {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-field-wrapper {
  margin-bottom: 16px;
}

.form-field-wrapper label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.date-input,
.textarea-input {
  width: 100%;
  border: none; /* 전체 테두리 제거 */
  border-bottom: 1px solid #E0E0E0; /* 하단 선 추가 */
  background-color: transparent; /* 배경색 제거 */
  padding: 8px;
  box-sizing: border-box;
}

.date-input:focus,
.textarea-input:focus {
  outline: none; /* 포커스 시 기본 아웃라인 제거 */
  border-bottom: 1px solid #2196F3; /* 포커스 시 하단 선 색상 변경 */
}

.date-display {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

.blue-text {
  font-size: 13px;
  color: #2196F3;
}

/* 프리미엄 케어 */
.info-box-wrapper {
  margin-bottom: 16px; /* 다음 버튼과 상자 사이의 간격 */
}
.info-box {
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 가로 중앙 정렬 */
  padding: 15px;
  border: 1px solid #64B5F6;
  border-radius: 10px;
}

.info-box-header {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
}

.info-box-icon {
  font-size: 24px;
  color: #64B5F6;
  margin-right: 10px; /* 아이콘과 텍스트 간격 */
}

.info-box-text {
  font-size: 16px;
  color: #64B5F6;
  margin-right: 80px; 
  font-weight: bold;
}

.info-box-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff; /* 기본 배경색 */
  border: 2px solid #64B5F6; /* 기본 테두리 색상 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}

.info-box-button.checked {
  background: #2196F3; /* 체크된 상태에서 파란색으로 채워지기 */
  border-color: #2196F3; /* 테두리 색상도 파란색으로 변경 */
}

.info-box-button .material-symbols-outlined {
  font-size: 18px;
  color: #ffffff; /* 아이콘 색상 */
  display: none; /* 아이콘 숨기기 */
}

.info-box-detail {
  width: 100%;
  text-align: center;
}

.info-box-line {
  border: 0;
  border-top: 1px solid #E0E0E0;
  margin: 10px 0; /* 선과 텍스트 간격 */
}

.info-box-detail-text {
  font-size: 13px;
  color: #798094;
  text-align: left;
}


/* 유의사항 */
.notice-box-wrapper {
  margin-bottom: 16px; /* 폼과 상자 사이의 간격 */
}
.notice-box {
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 가로 중앙 정렬 */
  padding: 15px;
  border-radius: 10px;
  background: #F4FAFE;
  position: relative; /* 자식 요소의 절대 위치 지정을 위한 부모의 상대 위치 지정 */
}

.notice-box-header {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%; /* 전체 너비를 사용 */
  position: relative;
}

.notice-box-icon {
  position: absolute; /* 상자 왼쪽 상단에 위치 */
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px; /* 아이콘 크기 조정 */
  height: 30px; /* 아이콘 크기 조정 */
}

.notice-box-text {
  font-size: 16px;
  color: #000000;
  font-weight: bold; /* 텍스트 두껍게 */
  text-align: center; /* 텍스트 가운데 정렬 */
  flex: 1; /* 텍스트가 중앙에 위치하도록 하기 */
}


.notice-box-detail {
  margin-top: 10px;
}

.notice-box-detail-text {
  font-size: 13px;
  color: #798094;
  line-height: 1.5; /* 줄 간격 조정 */
}


.submit-button {
  width: 100%;
  background: #2196F3;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: none;
}

</style>
