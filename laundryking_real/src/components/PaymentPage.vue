<template>
  <div id="app">
    <!-- 상단 바와 선택 메뉴 -->
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

    <!-- 폼과 선택 목록 -->
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

        <!-- 품목 선택 -->
        <div class="form-group">
          <label for="item">품목</label>
          <div class="custom-select">
            <div
              class="select-trigger"
              @click="toggleDropdown('item')"
              :class="{ disabled: !selectedCategory }"
            >
              <span>{{ selectedItem ? selectedItem.name : '품목 선택' }}</span>
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

        <!-- 금액 입력 -->
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

      <!-- 추가하기 버튼 -->
      <div class="button-group">
        <button @click="addItemToSelection" :disabled="!selectedCategory || !selectedItem">
          추가하기
        </button>
      </div>
    </div>

    <!-- 선택 목록 박스 -->
    <div class="selection-box" v-if="selectedItems.length">
      <h3>선택목록</h3>
      <p>(최소주문 금액은 30,000원 입니다.)</p>
      <ul>
        <li v-for="(item, index) in selectedItems" :key="index">
          구분: {{ item.category }} - 품목: {{ item.name }} - 금액: {{
            (item.price * item.quantity).toLocaleString()
          }}
          원
          <div class="quantity-control">
            수량:
            <button
              class="quantity-button"
              @click="changeQuantity(item, -1)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <input
              type="number"
              v-model.number="item.quantity"
              @input="updateItemAmount(item)"
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
      </div>
      <div class="total-amount">
        상품 금액: {{ totalAmount.toLocaleString() }} 원
        <br />
        픽업 택배비: {{ pickupFee.toLocaleString() }} 원
        <br />
        결제 금액: {{ finalPaymentAmount.toLocaleString() }} 원
      </div>
    </div>

    <!-- 신청하기 버튼 -->
    <div class="apply-button-container">
      <button @click="applyOrder" :disabled="!selectedItems.length || isSubmitting">신청하기</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      showTypeDropdown: false,
      showCategoryDropdown: false,
      showItemDropdown: false,
      selectedType: '',
      selectedCategory: '',
      selectedItem: null,
      amount: 0,
      types: ['의류', '신발', '리빙'],
      categories: ['블라우스', '운동화', '이불'],
      itemsByCategory: {
        블라우스: [{ name: '와이셔츠', price: 3000 }, { name: '후드티', price: 7000 }],
        운동화: [{ name: '슬리퍼', price: 8000 }, { name: '구두', price: 12000 }],
        이불: [{ name: '홑 이불', price: 10000 }, { name: '담요', price: 12000 }],
      },
      selectedItems: [],
      boxQuantity: 1,
      pickupFeePerBox: 4900,
      isSubmitting: false, // Prevent multiple submissions
    };
  },
  computed: {
    ...mapGetters(['fnGetOrderInfo']),
    filteredItems() {
      return this.itemsByCategory[this.selectedCategory] || [];
    },
    totalAmount() {
      return this.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    pickupFee() {
      return this.boxQuantity * this.pickupFeePerBox;
    },
    finalPaymentAmount() {
      return this.totalAmount + this.pickupFee;
    },
    canApplyOrder() {
      return this.finalPaymentAmount >= 30000;
    },
  },
  methods: {
    ...mapActions(['submitOrder']),
    ...mapMutations(['setOrderInfo']),
    toggleDropdown(type) {
      if (type === 'type') {
        this.showTypeDropdown = !this.showTypeDropdown;
      } else if (type === 'category') {
        this.showCategoryDropdown = !this.showCategoryDropdown;
      } else if (type === 'item') {
        this.showItemDropdown = !this.showItemDropdown;
      }
    },
    selectType(type) {
      this.selectedType = type;
      this.showTypeDropdown = false;
      this.setOrderInfo({ type });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.showCategoryDropdown = false;
      this.setOrderInfo({ category });
      this.selectedItem = null;
      this.amount = 0;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.amount = item.price;
      this.showItemDropdown = false;
    },
    addItemToSelection() {
      if (this.selectedItem) {
        const existingItem = this.selectedItems.find((i) => i.name === this.selectedItem.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.selectedItems.push({ ...this.selectedItem, category: this.selectedCategory, quantity: 1 });
        }
        this.setOrderInfo({ item: this.selectedItem.name, amount: this.amount });
      }
    },
    changeQuantity(item, amount) {
      const index = this.selectedItems.findIndex((i) => i.name === item.name);
      if (index !== -1) {
        this.selectedItems[index].quantity += amount;
        this.updateItemAmount(this.selectedItems[index]);
      }
    },
    updateItemAmount(item) {
      const index = this.selectedItems.findIndex((i) => i.name === item.name);
      if (index !== -1) {
        this.selectedItems[index].price = item.price;
      }
    },
    removeItem(index) {
      this.selectedItems.splice(index, 1);
    },
    changeBoxQuantity(amount) {
      this.boxQuantity = Math.max(1, this.boxQuantity + amount);
    },
    async applyOrder() {
      if (!this.canApplyOrder) {
        alert("최소 주문 금액은 30,000원 입니다.");
        return;
      }
      
      if (this.isSubmitting) {
        return; // Prevent multiple submissions
      }
      
      this.isSubmitting = true; // Set submitting state
      const orderData = {
        totalAmount: this.totalAmount,
        pickupFee: this.pickupFee,
        finalPaymentAmount: this.finalPaymentAmount,
        boxQuantity: this.boxQuantity,
        items: this.selectedItems
      };
      console.log('Applying order with:', orderData); // 디버깅용 로그
      try {
        await this.submitOrder(orderData);
        alert("신청이 완료되었습니다!");
        this.$router.push('/ordersuccess');
      } catch (error) {
        console.error('주문 제출 실패:', error);
        alert("주문 제출에 실패했습니다. 다시 시도해 주세요.");
      } finally {
        this.isSubmitting = false; // Reset submitting state
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>





<style scoped>
/* Your CSS styling here */
.apply-button-container {
  text-align: center;
  margin-top: 20px;
}
.apply-button-container button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.apply-button-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}





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
