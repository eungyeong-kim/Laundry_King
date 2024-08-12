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
      orderStatus: ''           // 주문 상태
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
      state.order = { ...state.order, ...payload };
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
    async fnUpdateUserProfile({ commit }, payload) {
      const user = firebase.auth().currentUser;
      if (user) {
        commit('fnSetLoading', true);
        try {
          // undefined 값이 있는 필드를 제거
          const cleanPayload = Object.fromEntries(
            Object.entries(payload).filter(([_, v]) => v !== undefined)
          );

          const docRef = db.collection('users').doc(user.uid).collection('additionalInfo').doc('additionalInfo');
          console.log('Updating user profile with:', cleanPayload);
          
          await docRef.set({
            ...cleanPayload,
            updatedAt: new Date(), // 이 필드는 업데이트 시점 기록
          }, { merge: true }); // merge: true를 사용하여 기존 데이터와 병합
          
          console.log('User profile updated successfully');
        } catch (error) {
          console.error('Error updating user profile:', error);
          commit('fnSetErrorMessage', 'Error updating user profile: ' + error.message);
        } finally {
          commit('fnSetLoading', false);
        }
      } else {
        commit('fnSetErrorMessage', 'User not authenticated');
        throw new Error('User not authenticated');
      }
    },
    async submitOrder({ commit, state }) {
      const user = firebase.auth().currentUser;
      if (user) {
        commit('fnSetLoading', true);
        try {
          // undefined 값이 있는 필드를 제거
          const cleanOrder = Object.fromEntries(
            Object.entries(state.order).filter(([_, v]) => v !== undefined)
          );

          console.log('Order data before saving:', cleanOrder);

          const docRef = db.collection('users').doc(user.uid).collection('orders').doc(); // 신규 문서 생성
          console.log('Saving order information to Firestore:', cleanOrder);
          
          await docRef.set({
            ...cleanOrder,
            createdAt: new Date(), // 현재 시간 저장
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
