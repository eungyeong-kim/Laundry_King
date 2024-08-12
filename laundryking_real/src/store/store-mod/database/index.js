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
      name: '',                  // 이름 추가
      orderStatus: '주문완료'           // 주문 상태
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
      const updatedOrder = { ...state.order, ...payload };
      if (updatedOrder.name) {
        updatedOrder.recipient = updatedOrder.name;
      }
      state.order = updatedOrder;
      console.log('Order info updated:', state.order);
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
            cleanOrder.recipient = cleanOrder.name;
          }

          console.log('Order data before saving:', cleanOrder);

          // Create a unique document ID if one does not exist
          const userOrdersRef = db.collection('users').doc(user.uid).collection('orders');
          let orderDoc = userOrdersRef.doc('currentOrder');

          const docSnapshot = await orderDoc.get();
          if (!docSnapshot.exists) {
            console.log('Creating new order document');
            await orderDoc.set({
              ...cleanOrder,
              createdAt: new Date(),
            });
          } else {
            console.log('Order document already exists');
            await orderDoc.update({
              ...cleanOrder,
              updatedAt: new Date(),
            });
          }

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
