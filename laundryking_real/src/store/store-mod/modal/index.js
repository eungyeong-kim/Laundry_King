const state = () => ({
    isModalOpen: false,
    modalMessage: ''  // 모달에 표시할 메시지
  });
  
  const mutations = {
    OPEN_MODAL(state, message) {
      state.isModalOpen = true;
      state.modalMessage = message || '';  // 메시지가 있을 경우 설정
    },
    CLOSE_MODAL(state) {
      state.isModalOpen = false;
    },
  };
  
  const actions = {
    openModal({ commit }, message) {
      commit('OPEN_MODAL', message);
    },
    closeModal({ commit }) {
      commit('CLOSE_MODAL');
    },
  };
  
  const getters = {
    isModalOpen(state) {
      return state.isModalOpen;
    },
    modalMessage(state) {
      return state.modalMessage;
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  