import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import router from "@/router";
import db from "@/firebase"; // Firestore를 import합니다.
import store from '@/store';  // Vuex 스토어 import

export default {
  state: {
    oUser: null,
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },
  getters: {
    fnGetUser(state) {
      // 사용자 정보
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      // 로그인 상태
      return state.oUser != null;
    },
  },
  actions: {
    // email 회원가입
    async fnRegisterUser({ commit }, payload) {
      commit("fnSetLoading", true); // 로딩 상태로 변경
      try {
        // Firebase 인증을 통한 유저 생성
        const pUserInfo = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.pEmail, payload.pPassword);
    
        // Firestore에 사용자 정보 저장
        await db.collection("users").doc(pUserInfo.user.uid).set({
          email: pUserInfo.user.email,
          name: payload.pName, // 이름 정보 추가
          createdAt: new Date(), // 생성 날짜를 추가합니다.
          photoURL: pUserInfo.user.photoURL,
          phone: payload.pPhone, // 전화번호 정보 추가
          birth: payload.pBirth, // 생년월일 정보 추가
          postalCode: payload.pPost, // 우편번호 정보 추가
          adress: payload.pAdress, // 기본주소 정보 추가
          adressDetail: payload.pAdressdetail, // 상세주소 정보 추가
        });
    
        // 사용자 정보를 스토어에 저장하지 않음
        // 회원가입 완료 후 메인 페이지가 아닌 로그인 페이지로 리디렉션
        commit("fnSetLoading", false); // 로딩 완료
        commit("fnSetErrorMessage", ""); // 에러메세지 초기화
        // alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."); // 성공 메시지 표시
        router.push("/login"); // 로그인 페이지로 이동
      } catch (err) {
        commit("fnSetErrorMessage", err.message);
        commit("fnSetLoading", false);
      }
    },

    // email 로그인
    fnDoLogin({ commit }, payload) {
      
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
          .then(async (pUserInfo) => {
            // Firestore에서 사용자 정보 가져오기
            const userDoc = await db.collection("users").doc(pUserInfo.user.uid).get();
            const userData = userDoc.data();
      
            commit("fnSetUser", {
              id: pUserInfo.user.uid,
              name: userData.name, // Firestore에서 가져온 사용자 이름
              email: pUserInfo.user.email,
              photoURL: pUserInfo.user.photoURL,
              phone: userData.phone, // 전화번호 정보 추가
              birth: userData.birth, // 생년월일 정보 추가
              postalCode: userData.postalCode, // 우편번호 정보 추가
              adress: userData.adress, // 기본주소 정보 추가
              adressDetail: userData.adressDetail, // 상세주소 정보 추가
            });
            commit("fnSetErrorMessage", "");
            router.push("/main"); // 로그인 후 main 으로 이동
          })
          .catch((err) => {
            commit("fnSetErrorMessage", store.dispatch('modal/openModal', '이메일이나 비밀번호가 일치하지 않습니다.'));
          });
      },

    //구글 로그인
    fnDoGoogleLogin_Popup({ commit }) {
      var oProvider = new firebase.auth.GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");
    
      firebase
        .auth()
        .signInWithPopup(oProvider)
        .then(async (pUserInfo) => {
          // Firestore에 사용자 정보 저장
          const user = pUserInfo.user;
          const userData = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
    
          // Firestore에 저장
          await db.collection("users").doc(user.uid).set(userData, { merge: true });
    
          // 스토어에 사용자 정보 저장
          commit("fnSetUser", userData);
          commit("fnSetErrorMessage", "");
          router.push("/main");
        })
        .catch((err) => {
          commit("fnSetErrorMessage", err);
        });
    },

    //자동 로그인
    fnDoLoginAuto({ commit }, pUserInfo) {
      //로그인 시 스토어에 정보 저장
      commit("fnSetUser", {
        id: pUserInfo.uid,
        name: pUserInfo.displayName,
        email: pUserInfo.email,
        photoURL: pUserInfo.photoURL,
      });
      commit("fnSetLoading", false); // 로딩완료 상태로 변경
      commit("fnSetErrorMessage", "");
    },

    //로그아웃
    fnDoLogout({ commit }) {
      firebase.auth().signOut();
      commit("fnSetUser", null);
      router.push("/");
    },
  },
};
