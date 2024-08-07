import { createStore } from 'vuex';
import VuexPersistence from "vuex-persist"
import modCommon from "./store-mod/common"
import modProvider from "./store-mod/provider"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});


//common: 로딩, 에러처리 등 공통 정보
// provider: 구글, 이메일 인증 처리

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common: modCommon,
    provider: modProvider
  },
  plugins: [vuexLocal.plugin], // VuexPersistence 플러그인 사용
})
