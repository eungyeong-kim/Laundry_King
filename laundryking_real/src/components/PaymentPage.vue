<template>
  <div id="app">
    <v-row style="padding:0;">
      <v-col cols="1">
        <button @click="goBack">
          <span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span>
        </button>
      </v-col>
      <v-col cols="10" class="d-flex justify-center align-center">
        <h2>의류 품목을 선택하세요</h2>
      </v-col>
    </v-row>

    <div class="form-container">
      <div class="form-row">
        <!-- 종류 추가 -->
        <div class="form-group">
          <label for="type">종류</label>
          <div class="custom-select">
            <div class="select-trigger" @click="toggleDropdown('type')">
              <span>{{ selectedType || '종류 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <div class="select-options" v-if="showTypeDropdown">
              <div
                v-for="type in types"
                :key="type"
                class="select-option"
                @click="selectType(type)"
              >
                {{ type }}
              </div>
            </div>
          </div>
        </div>

        <!-- 구분 -->
        <div class="form-group">
          <label for="category">구분</label>
          <div class="custom-select">
            <div class="select-trigger" @click="toggleDropdown('category')">
              <span>{{ selectedCategory || '구분 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <div class="select-options" v-if="showCategoryDropdown">
              <div
                v-for="category in categories"
                :key="category"
                class="select-option"
                @click="selectCategory(category)"
              >
                {{ category }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="item">품목</label>
          <div class="custom-select">
            <div class="select-trigger" @click="toggleDropdown('item')" :class="{ disabled: !selectedCategory }">
              <span>{{ selectedItem || '품목 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <div class="select-options" v-if="showItemDropdown">
              <div
                v-for="item in filteredItems"
                :key="item.name"
                class="select-option"
                @click="selectItem(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="amount">금액</label>
          <input
            type="number"
            id="amount"
            v-model="amount"
            placeholder="금액이 자동으로 표시됩니다"
            readonly
          />
        </div>
      </div>

      <div class="button-group">
        <button @click="submitForm" :disabled="!selectedCategory || !selectedItem">추가하기</button>
      </div>
    </div>

    <!-- 선택 목록 박스 추가 -->
    <div class="selection-box">
      <h3>선택목록</h3>
      <p>(최소주문 금액은 30,000원 입니다.)</p>
      <ul>
        <li v-for="(item, index) in selectedItems" :key="index">
          구분: {{ item.category }} - 품목: {{ item.name }} - 금액: {{ (item.price * item.quantity).toLocaleString() }} 원 
          <div class="quantity-control">
            수량: 
            <button class="quantity-button" @click="changeQuantity(item, -1)" :disabled="item.quantity <= 1">-</button>
            <input
              type="number"
              v-model.number="item.quantity"
              @input="updateAmount(item)"
              min="1"
              class="quantity-input"
            />
            <button class="quantity-button" @click="changeQuantity(item, 1)">+</button>
            <button class="delete-button" @click="removeItem(index)">X</button>
          </div>
        </li>
      </ul>
      <hr class="separator" />
      <div class="total-amount">
        상품 금액: {{ totalAmount.toLocaleString() }} 원
      </div>
    </div>

    <!-- 새로운 섹션 추가 -->
    <div class="shipping-container">
      <label for="box-quantity">보낼 박스는 몇 개 인가요?</label>
      <div class="box-info">
        <p class="shipping-container-p">택배박스</p>
        <div class="box-control">
          <button @click="changeBoxQuantity(-1)" :disabled="boxQuantity <= 1">-</button>
          <input
            type="number"
            id="box-quantity"
            v-model.number="boxQuantity"
            min="1"
            class="box-input"
          />
          <button @click="changeBoxQuantity(1)">+</button>
        </div>
        <p class="pickupfee">택배 픽업비: {{ pickupFee.toLocaleString() }} 원</p>
      </div>

      <div class="notice-box-wrapper">
        <div class="notice-box">
          <div class="notice-box-header">
            <img src="/images/images/info.png" alt="Info Icon" class="notice-box-icon" />
            <span class="notice-box-text">유의사항</span>
          </div>
          <div class="notice-box-detail">
            <p class="notice-box-detail-text">
              • 주문접수 시 택배비가 선결제됩니다. <br>
              • 가로+세로+높이 합계가 150cm 이상인 박스의 경우 택배사에서 인수 거부 또는 추가 요금이 발생할 수 있습니다. <br>
              • 택배비 추가 요금 발생 시, 차액은 세탁 요금에 부과됩니다. <br>
              • 택배 기사 방문 시, 고객 부재 또는 포장 미비 등의 이유로 택배 수거가 2회 이상 실패한 경우 주문이 자동으로 취소되며, 결제하신 접수 택배비는 위약금으로 환불이 불가능합니다.
            </p>
          </div>
        </div>
      </div>

      <!-- 체크박스 추가 -->
      <div class="checkbox-container">
        <input type="checkbox" id="terms-checkbox" v-model="termsChecked" />
        <label for="terms-checkbox">주문 시 유의사항을 확인했습니다.</label>
      </div>
    </div>

    <!-- 결제 금액과 신청하기 버튼 추가 -->
    <div class="payment-summary">
      <div class="summary-details">
        <p>상품 금액: {{ totalAmount.toLocaleString() }} 원</p>
        <p>택배 픽업비: {{ pickupFee.toLocaleString() }} 원</p>
        <hr class="separator" />
        <p class="total-payment">총 결제 금액: {{ (totalAmount + pickupFee).toLocaleString() }} 원</p>
      </div>
    </div>

    <div class="payment-summary">
      <div class="button-group">
        <button @click="goToOrderSuccess" :disabled="!termsChecked || totalAmount < 30000" class="submit-button">신청하기</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      types: ['의류', '신발', '리빙', '가죽/모피', '잡화', '수선/기술'], // 종류 항목
      categories: ['셔츠/블라우스', '신발', '리빙','악세서리'], // 구분 항목
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
          { name: '준 명품 운동화', price: 20000 },
        ],
        '리빙': [
          { name: '이불', price: 10000 },
          { name: '이불 커버', price: 12000 },
          { name: '이불 커버 대', price: 16000 },
          { name: '솜/극세사 이불', price: 15000 },
          { name: '오리/거위털 이불', price: 25000 },
          { name: '오리/거위털 이불 대', price: 35000 },
        ],
        '악세서리': [
          { name: '스카프/목도리', price: 4000 },
          { name: '고급소재 스카프/목도리', price: 7000 },
          { name: '일반/캡 모자', price: 5000 },
          { name: '털 모자', price: 10000 },
          { name: '모직 장갑', price: 6000 },
          { name: '털 장갑', price: 9000 },
        ]
      },
      selectedType: null,
      selectedCategory: null,
      selectedItem: null,
      amount: null,
      filteredItems: [],
      showTypeDropdown: false,
      showCategoryDropdown: false,
      showItemDropdown: false,
      selectedItems: [],
      boxQuantity: 1,
      pickupFeePerBox: 4900,
      termsChecked: false
    };
  },
  computed: {
    totalAmount() {
      return this.selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    pickupFee() {
      return this.boxQuantity * this.pickupFeePerBox;
    }
  },
  methods: {
    goBack() {
      window.location.href = '/orderinfo';
    },
    toggleDropdown(type) {
      if (type === 'type') {
        this.showTypeDropdown = !this.showTypeDropdown;
        this.showCategoryDropdown = false;
        this.showItemDropdown = false;
      } else if (type === 'category') {
        this.showCategoryDropdown = !this.showCategoryDropdown;
        this.showItemDropdown = false;
      } else if (type === 'item') {
        this.showItemDropdown = !this.showItemDropdown;
      }
    },
    selectType(type) {
      this.selectedType = type;
      this.showTypeDropdown = false;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.filteredItems = this.itemsByCategory[category];
      this.selectedItem = null;
      this.amount = null;
      this.showCategoryDropdown = false;
    },
    selectItem(item) {
      this.selectedItem = item.name;
      this.amount = item.price;
      this.showItemDropdown = false;
    },
    submitForm() {
      if (this.selectedCategory && this.selectedItem) {
        const item = this.itemsByCategory[this.selectedCategory].find(i => i.name === this.selectedItem);
        if (item) {
          const existingItemIndex = this.selectedItems.findIndex(i => i.name === item.name);
          if (existingItemIndex > -1) {
            this.selectedItems[existingItemIndex].quantity += 1;
          } else {
            this.selectedItems.push({ ...item, quantity: 1 });
          }
          this.resetForm();
        }
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
    changeQuantity(item, amount) {
      const selectedItem = this.selectedItems.find(i => i.name === item.name);
      if (selectedItem) {
        selectedItem.quantity += amount;
        if (selectedItem.quantity <= 0) {
          this.removeItem(this.selectedItems.indexOf(selectedItem));
        } else {
          this.updateAmount(selectedItem);
        }
      }
    },
    updateAmount(item) {
      this.amount = item.price * item.quantity;
    },
    removeItem(index) {
      this.selectedItems.splice(index, 1);
    },
    changeBoxQuantity(amount) {
      this.boxQuantity = Math.max(this.boxQuantity + amount, 1);
    },
    goToOrderSuccess() {
      if (this.termsChecked && this.totalAmount >= 30000) {
        window.location.href = '/ordersuccess';
      }
    }
  }
};
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

/* 여기서부터 */
.form-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  font-size: 15px; 
  margin-bottom: 4px;
  color: #333;
}

.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
  
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #CACACA; /*이 친구랑 */
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

@media (max-width: 600px) {
  .select-trigger {
    max-width: 90px;
  }
}

.select-trigger .arrow {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #64B5F6;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd; 
  border-radius: 4px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  z-index: 1000;
  overflow: hidden; 
}

.select-option {
  padding: 10px 12px; 
  cursor: pointer;
  font-size: 14px; 
  color: #333; 
  transition: background 0.3s, color 0.3s;
}

.select-option:hover {
  background: #f5f5f5; 
  color: #2196F3; 
}

.disabled {
  cursor: not-allowed;
  color: #ccc;
}

.form-group input {
  width: 100%;
  padding: 6px;
  border-bottom: 1px solid #CACACA; /* 이 친구랑 */
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
  font-size: 14px; 
}

.button-group {
  margin-top: 20px; 
  text-align: center;
  
}

.button-group button {
  background-color: #ffffff;
  color: #2196F3;
  border: 1px solid #2196F3;
  border-radius: 15px;
  width: 100%;
  padding: 15px;
  font-size: 18px; 
  font-weight: bold;
  cursor: pointer;
}

/* 선택목록 */
.selection-box {
  width: 100%; 
  max-width: 900px; /* 최대 너비 설정 */
  margin: 20px auto;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #F0F2F9;
  box-sizing: border-box; 
}

.selection-box h3 {
  margin: 0;
  font-size: 20px; 
  color: #333;
  text-align: center;
  font-weight: bold;
}

.selection-box p {
  margin: 5px 0 15px;
  font-size: 12px; 
  color: #666;
  text-align: center;
}

.selection-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selection-box li {
  margin-bottom: 8px; 
  font-size: 15px; 
  color: #333;
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  gap: 8px; 
}

.selection-box .quantity-control {
  display: flex;
  align-items: center;
  gap: 8px; 
}



.quantity-button {
  background-color: #ffffff;
  border: 1px solid #2196F3;
  border-radius: 50%;
  width: 28px; 
  height: 28px; 
  text-align: center;
  font-size: 14px; 
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  color: #2196F3;
}

.quantity-button:hover {
  background-color: #e0e0e0;
}

.quantity-button:disabled {
  cursor: not-allowed;
  background-color: #d0d0d0;
}

.quantity-input {
  width: 50px; 
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px; 
}

.delete-button {
  background-color: #ffdddd;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  color: #d9534f;
  width: 28px; 
  height: 28px; 
  text-align: center;
  font-size: 14px; 
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.delete-button:hover {
  background-color: #f7b7b7;
}

.delete-button:focus {
  outline: none;
}

.separator {
  margin: 15px 0; 
  border: 0;
  border-top: 1px solid #ddd;
}

.total-amount {
  font-size: 20px; 
  font-weight: bold;
  color: #333;
  text-align: right;
}

/* 새로운 섹션 */
.shipping-container {
  max-width: 900px;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
}

.shipping-container label {
  font-size: 20px; 
  color: #333;
  font-weight: bold;
}

.box-info {
  margin-top: 10px;
  text-align: center;
}

.shipping-container-p {
  font-size: 14px; 
  margin: 5px 0;
  color: #A1A8BD;
  text-align: left;
  margin-bottom: 30px;
}

.pickupfee {
  font-size: 20px; 
  color: #333;
  text-align: right;
  font-weight: bold;
  margin-bottom: 50px;
} 



.box-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px; 
  margin: 10px 0;
  margin-bottom: 50px;
}

.box-input {
  width: 50px; 
  text-align: center;
  border-radius: 4px;
  font-size: 20px; 
  font-weight: bold;
}

.box-control button {
  background-color: #64B5F6;
  color: #ffffff;
  border-radius: 50%;
  width: 28px; 
  height: 28px; 
  text-align: center;
  font-size: 14px; 
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.box-control button:hover {
  background-color: #2994ec;
}

.box-control button:disabled {
  cursor: not-allowed;
  background-color: #d0d0d0;
}


/* 유의사항 */
.notice-box-wrapper {
  margin-bottom: 16px; 
}
.notice-box {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 35px;
  border-radius: 10px;
  background: #F4FAFE;
  position: relative; 
}

.notice-box-header {
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 100%; 
  position: relative;
}

.notice-box-icon {
  position: absolute; 
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px; 
  height: 30px; 
}

.notice-box-text {
  font-size: 18px;
  color: #000000;
  font-weight: bold; 
  text-align: center; 
  flex: 1; /* 텍스트가 중앙에 위치하도록 하기 */
}

.notice-box-detail {
  margin-top: 10px;
}

.notice-box-detail-text {
  font-size: 13px;
  color: #798094;
  line-height: 1.5; 
}


/* 체크박스 */
.checkbox-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 30px;
  height: 30px;
  border: 1px solid #64B5F6;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-container input[type="checkbox"]:checked {
  background-color: #ffffff;
}

.checkbox-container input[type="checkbox"]:checked::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #64B5F6;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-container label {
  margin-left: 8px;
  font-size: 16px;
  font-weight: lighter;
  color: #64B5F6;
}




/* 결제 금액 섹션 */
.payment-summary {
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
}

.summary-details p {
  font-size: 20px; 
  margin: 5px 0;
  color: #333;
  text-align: right;
  font-weight: bold;
}

.total-payment {
  font-size: 16px; 
  font-weight: bold;
  color: #333;
  text-align: right;
}


/* 신청하기 버튼 */
.button-group button.submit-button {
  background-color: #2196F3; 
  color: #ffffff; 
  border: none; 
  border-radius: 20px; 
  width: 100%;
  padding: 15px; 
  font-size: 18px; 
  font-weight: bold;
  cursor: pointer;
}

.button-group button.submit-button:hover {
  background-color: rgb(0, 140, 255); 
}


</style>
