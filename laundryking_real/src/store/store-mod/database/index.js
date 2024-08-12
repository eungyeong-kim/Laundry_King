// src/store/index.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '@/firebase'; // Firestore 인스턴스 가져오기

export default {
  state: {
    oUser: null,
    loading: false,
    errorMessage: '',
    order: {
      address: '',
      detailAddress: '',
      phone: '',
      pickupDate: '',
      deliveryDate: '',
      cleaningRequest: '',
      isChecked: false,
      type: '',                 // 주문 종류
      category: '',             // 구분
      item: '',                 // 품목
      amount: 0,                // 상품 금액
      boxQuantity: 1,           // 박스 개수
      pickupFee: 0,             // 택배 픽업비
      totalAmount: 0,           // 총 결제 금액
      recipient: '',            // 수령인
      name: ''                  // 이름 추가
    },
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
    fnSetLoading(state, status) {
      state.loading = status;
    },
    fnSetErrorMessage(state, message) {
      state.errorMessage = message;
    },
    setOrderInfo(state, payload) {
      // Update order with payload and synchronize name and recipient
      const updatedOrder = { ...state.order, ...payload };
      if (updatedOrder.name) {
        updatedOrder.recipient = updatedOrder.name;
      }
      state.order = updatedOrder;
      console.log('Order info updated:', state.order); // 상태 업데이트 확인용 로그
    },
  },
  getters: {
    fnGetUser(state) {
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      return state.oUser !== null;
    },
    fnGetOrderInfo(state) {
      return state.order;
    },
  },
  actions: {
    async submitOrder({ commit, state }) {
      const user = firebase.auth().currentUser;
      if (user) {
        commit('fnSetLoading', true);
        try {
          // Ensure all order details are included and boxQuantity is correct
          const cleanOrder = { ...state.order };
          if (cleanOrder.name) {
            cleanOrder.recipient = cleanOrder.name; // Synchronize recipient with name
          }

          console.log('Order data before saving:', cleanOrder);

          const docRef = db.collection('users').doc(user.uid).collection('orders').doc();
          console.log('Saving order information to Firestore:', cleanOrder);
          
          await docRef.set({
            ...cleanOrder,
            createdAt: new Date(),
          });
          
          console.log('Order information submitted successfully');
        } catch (error) {
          console.error('Error submitting order information:', error);
          commit('fnSetErrorMessage', 'Error submitting order information: ' + error.message);
        } finally {
          commit('fnSetLoading', false);
        }
      } else {
        commit('fnSetErrorMessage', 'User not authenticated');
        throw new Error('User not authenticated');
      }
    },
  },
};
