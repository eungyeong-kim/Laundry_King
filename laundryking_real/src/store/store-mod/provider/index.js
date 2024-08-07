import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import router from "@/router"

export default {
    state: {
        oUser: null
    },
    mutations: {
        fnSetUser(state, payload){
            state.oUser = payload
        }
    },
    getters: {
        fnGetUser(state){ // 사용자 정보
            return state.oUser
        },
        fnGetAuthStatus(state){ // 로그인 상태
            return (state.oUser != null)
        }
    },
    actions: {

        //email 회원가입
        fnRegisterUser( {commit}, payload) {
            commit("fnSetLoading", true) // 로딩 상태로 변경

            firebase.auth().createUserWithEmailAndPassword(payload.pEmail, payload.pPassword).then(pUserInfo => {
                commit("fnSetUser", {
                    email: pUserInfo.user.email
                })
                commit("fnSetLoading", false) // 로딩 완료
                commit("fnSetErrorMessage", "") // 에러메세지 초기화
                router.push("/main")
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message)
                commit("fnSetLoading", false)
            })
        },

        // email 로그인
        fnDoLogin({commit}, payload){
            commit("fnSetLoading", true) // 로딩 상태로 변경

            firebase.auth().signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then(pUserInfo => {
                commit("fnSetUser", {
                    name: pUserInfo.user.email
                })
                commit("fnSetLoading", false) // 로딩완료
                commit("fnSetErrorMessage", "")
                router.push("/main") // 로그인 후 main 으로 이동
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message)
                commit("fnSetLoading", false)
            })
        },

        //구글 로그인
        fnDoGoogleLogin_Popup({commit}){
            commit("fnSetLoading", true) // 로딩 상태로 변경

            var oProvider = new firebase.auth.GoogleAuthProvider();
            oProvider.addScope("profile");
            oProvider.addScope("email");
            firebase.auth().signInWithPopup(oProvider)
            .then(pUserInfo => {
                commit("fnSetUser", {
                    id: pUserInfo.user.uid,
                    name: pUserInfo.user.displayName,
                    email: pUserInfo.user.email,
                    photoURL: pUserInfo.user.photoURL
                })
                commit("fnsetLoading", false) // 로딩 완료
                commit("fnSetErrorMessage", "")
                router.push("/main")
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message)
                commit("fnSetLoading", false)
            })
        },

        //자동 로그인
        fnDoLoginAuto({commit}, pUserInfo) {
            //로그인 시 스토어에 정보 저장
            commit("fnSetUser", {
                id: pUserInfo.uid,
                name: pUserInfo.displayName,
                email: pUserInfo.email,
                photoURL: pUserInfo.photoURL
            })
            commit("fnSetLoading", false) // 로딩완료 상태로 변경
            commit("fnSetErrorMessage", "")
        },

        //로그아웃
        fnDoLogout({commit}) {
            firebase.auth().signOut()
            commit("fnSetUser", null)
            router.push("/")
        }
    }
}