<template>
    <v-container>
        <h2>회원가입</h2>
        <v-row class="d-flex justify-center">
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="이름" color="blue" :rules="rules"></v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="이메일" color="blue" :rules="rules"></v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="비밀번호" color="blue" :rules="rules" :type="showPassword ? 'text' : 'password'">
                    <v-icon @click="togglePasswordVisibility" class="custom-icon">
                    {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                </v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="비밀번호 확인" color="blue" :rules="rules":type="showPassword ? 'text' : 'password'">
                    <v-icon @click="togglePasswordVisibility" class="custom-icon">
                    {{ showPassword ? 'mdi-eye' :'mdi-eye-off' }}
                    </v-icon>
                </v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="전화번호" color="blue" placeholder="010-0000-0000" maxlength="13"></v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field variant="outlined" label="생년월일" color="blue"></v-text-field>
            </v-col>
            <v-col cols="7" class="custom-margin">
                <v-text-field variant="outlined" label="우편번호" color="blue" v-model="postalCode" readonly></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-btn @click="openAddressModal" width="100%" height="55px" variant="outlined" color="blue">주소검색</v-btn>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field v-model="address" label="기본 주소" placeholder="기본 주소" readonly variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="10" class="custom-margin">
                <v-text-field v-model="detailedAddress" label="상세 주소" placeholder="상세 주소" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="10">
                <v-btn @click="dialog2 = true" color="blue" variant="outlined" height="49px">이용약관 보기</v-btn>
                <v-dialog v-model="dialog2" max-width="600px">
                    <v-card>
                    <v-card-title>이용 약관</v-card-title>
                    <v-card-text>
                        <p>여기에 약관 내용을 입력하세요...</p>
                        <v-checkbox
                        v-model="termsAccepted"
                        label="이용 약관에 동의합니다."
                        required
                        ></v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog2 = false" :disabled="!termsAccepted">
                        확인
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="10">
                <v-btn width="100%" height="49px" flat color="blue" @click="submitForm" :disabled="!termsAccepted">회원가입</v-btn>
            </v-col>
        </v-row>
        
        <!--다음 주소 검색 모달-->
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title class="headline">
                주소 검색
                </v-card-title>
                <v-card-text>
                <div id="daum-postcode"></div>
                </v-card-text>
                <v-card-actions>
                <v-btn color="primary" text @click="dialog = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const postalCode = ref('');
const address = ref('');
const detailedAddress = ref('');
const dialog = ref(false);
const formValid = ref(false);
const showPassword = ref(false);

const dialog2 = ref(false); // 모달 창 상태
const termsAccepted = ref(false); // 약관 동의 여부

// 카카오 주소 검색 API 사용을 위한 함수
const loadDaumPostcodeScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('daum-postcode-script')) {
      return resolve();
    }

    const script = document.createElement('script');
    script.id = 'daum-postcode-script';
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 주소 검색 모달 열기
const openAddressModal = async () => {
  dialog.value = true;
  await loadDaumPostcodeScript();
  new daum.Postcode({
    oncomplete: function(data) {
      postalCode.value = data.zonecode;
      address.value = data.address;
      dialog.value = false;
    }
  }).embed(document.getElementById('daum-postcode'));
};

const submitForm = () => {
  if (termsAccepted.value) {
    alert('폼이 제출되었습니다.');
  } else {
    alert('약관에 동의해야 합니다.');
  }
};

const rules = ref([
    value => !!value || '입력해주세요.'
]);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>

<style>
h2 {
    margin: 30px 0;
    text-align: center;
}
.custom-margin {
  margin-bottom: -20px; /* 기본보다 좁은 간격으로 조정 */
}
.custom-icon {
    position: absolute;
    right: 15px;
}
</style>