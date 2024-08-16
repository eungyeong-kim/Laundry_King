<template>
  <div id="app">
    <!-- 상단 바와 선택 메뉴 -->
    <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>의류 품목을 선택하세요</h2></v-col>
        <v-col></v-col>
      </v-row>

    <!-- 폼과 선택 목록 -->
    <div class="form-container">
      <div class="form-row">
        <!-- 종류 추가 -->
        <div class="form-group">
          <label for="type">종류</label>
          <div class="custom-select" ref="typeSelect">
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
          <div class="custom-select" ref="categorySelect">
            <div class="select-trigger" @click="toggleDropdown('category')">
              <span>{{ selectedCategory || '구분 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <div class="select-options" v-if="showCategoryDropdown">
              <div
                v-for="category in filteredCategories"
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
          <div class="custom-select" ref="itemSelect">
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

      <div class="notice-box-wrapper">
              <div class="notice-box">
                <div class="notice-box-header">
                  <img src="/images/images/info.png" alt="Info Icon" class="notice-box-icon" />
                  <span class="notice-box-text">유의사항</span>
                </div>
                <div class="notice-box-detail">
                  <p class="notice-box-detail-text">
                    • 주문접수 시 틱업 택배비가 선결제됩니다. <br>

                    • 가로+세로+높이 합계가 150cm이상인 박스의 경우 택배사에서 인수거부 또는 추가요금이 발생할 수 있습니다.<br>

                    • 택배비 추가요금 발생 시, 차액은 세탁요금에 부과됩니다. <br>

                    • 택배기사 방문 시, 고객 부재 또는 포장 미비 등의 이유로 택배 수거가 2회 이상 실패한 경우 주문이 자동으로 <br>취소되며, 결제하신 접수 택배비는 위약금으로 환불이 불가능합니다.
                  </p>
                </div>
              </div>
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
import store from '@/store'; // Vuex 스토어 import

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
      categories: {
        의류: ['블라우스'],
        신발: ['운동화'],
        리빙: ['이불']
      },
      itemsByCategory: {
        블라우스: [{ name: '와이셔츠', price: 3000 }, { name: '후드티', price: 7000 }],
        운동화: [{ name: '슬리퍼', price: 8000 }, { name: '구두', price: 12000 }],
        이불: [{ name: '홑 이불', price: 10000 }, { name: '담요', price: 12000 }],
      },
      selectedItems: [],
      boxQuantity: 1,
      pickupFeePerBox: 4900,
      isSubmitting: false,
    };
  },
  computed: {
    ...mapGetters(['fnGetOrderInfo']),
    filteredCategories() {
      return this.categories[this.selectedType] || [];
    },
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
      this.showCategoryDropdown = false;
      this.showItemDropdown = false;
      this.setOrderInfo({ type });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.showCategoryDropdown = false;
      this.showItemDropdown = false;
      this.setOrderInfo({ category });
      this.selectedItem = null;
      this.amount = 0;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.amount = item.price;
      this.showItemDropdown = false;
      this.setOrderInfo({ item: item.name, amount: this.amount });
    },
    addItemToSelection() {
      if (this.selectedItem && this.amount > 0) {
        const existingItem = this.selectedItems.find(
          (i) => i.name === this.selectedItem.name
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.selectedItems.push({
            category: this.selectedCategory,
            name: this.selectedItem.name,
            price: this.amount,
            quantity: 1,
          });
        }
      }
    },
    removeItem(index) {
      this.selectedItems.splice(index, 1);
    },
    changeQuantity(item, delta) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        item.quantity = newQuantity;
        this.updateItemAmount(item);
      }
    },
    updateItemAmount(item) {
      item.amount = item.price * item.quantity;
    },
    changeBoxQuantity(delta) {
      const newQuantity = this.boxQuantity + delta;
      if (newQuantity > 0) {
        this.boxQuantity = newQuantity;
      }
    },
    async applyOrder() {
      if (!this.canApplyOrder) {
        store.dispatch('modal/openModal', '최소 주문 금액은 30,000원 입니다.');
        return;
      }

      this.isSubmitting = true;
      this.setOrderInfo({
        selectedItems: this.selectedItems,
        boxQuantity: this.boxQuantity,
        finalPaymentAmount: this.finalPaymentAmount,
        pickupFee: this.pickupFee,
        totalAmount: this.totalAmount
      });

      const orderData = {
        items: this.selectedItems,
        boxQuantity: this.boxQuantity,
        finalPaymentAmount: this.finalPaymentAmount,
        createdAt: new Date(),
        pickupFee: this.pickupFee,
        totalAmount: this.totalAmount
      };

      try {
        await this.submitOrder(orderData);

        // 팝업창 열기
        store.dispatch('modal/openModal', '신청이 완료되었습니다!');

        // 팝업창이 열린 후 페이지 이동
        setTimeout(() => {
          this.$router.push('/ordersuccess');
        }, 1000); // 1초 후 페이지 이동
      } catch (error) {
        console.error('주문 제출 실패:', error);
        store.dispatch('modal/openModal', '주문 제출에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        this.isSubmitting = false; // Reset submitting state
      }
    },
    goBack() {
      this.$router.push('/orderinfo');
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 특정 요소에 포커스를 맞춰 스크롤을 자동으로 이동
      const typeSelect = this.$refs.typeSelect;
      if (typeSelect) {
        typeSelect.querySelector('.select-trigger').focus();
        window.scrollTo(0, 0); // 페이지의 맨 위로 스크롤
      }
    });
  },
};
</script>




<style scoped>
/* Apply Button Container */
.apply-button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px; /* 최대 너비 설정 */
  padding: 0 15px; /* 화면 가장자리와의 간격을 유지하기 위한 패딩 */
  box-sizing: border-box; /* 패딩을 포함하여 너비를 계산하도록 설정 */
  margin-left: auto; /* 수평 중앙 정렬을 위한 추가 설정 */
  margin-right: auto; /* 수평 중앙 정렬을 위한 추가 설정 */
}

.apply-button-container button {
  background: #2196F3;
  color: #ffffff;
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: none;
  width: 1000px;
  max-width: 100%; /* 버튼의 최대 너비를 컨테이너의 너비에 맞게 조정 */
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
  background-color: #2196F3;
  color: #ffffff;
}

.quantity-button:disabled {
  cursor: not-allowed;
  background-color: #d0d0d0;
}

.quantity-input { /* 이거임 */
  width: 50px; 
  text-align: center;
  border-radius: 4px;
  font-size: 20px; 
  margin-left: 12px;

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
  margin-left: 20px;
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
  margin-bottom: 50px;
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
  font-size: 28px; 
  font-weight: bold;
}

.box-control button {
  background-color: #64B5F6;
  color: #ffffff;
  border-radius: 50%;
  width: 50px; 
  height: 50px; 
  text-align: center;
  font-size: 14px; 
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  font-size: 25px;
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
  padding: 25px;
  border-radius: 10px;
  background: #FFEDED;
}

.notice-box-header {
  display: flex;
  align-items: center; /* 아이콘과 텍스트 수직 정렬 */
  width: 100%;
  justify-content: center; /* 아이콘과 텍스트가 가운데 정렬되도록 */
}

.notice-box-icon {
  width: 30px; 
  height: 30px; 
  margin-right: 10px; /* 아이콘과 텍스트 사이의 간격 조정 */
}

.notice-box-text {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  text-align: center;
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
