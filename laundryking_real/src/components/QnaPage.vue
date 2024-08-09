<template>
    <v-main style="padding:0;">
        <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>자주 묻는 질문</h2></v-col>
        <v-col></v-col>
        </v-row>

        <v-container class="mt-10">
            <v-row>
                <div class="button_box d-flex justify-center align-center"> <!--버튼-->
                    <v-col offset="1" cols="10" class="d-flex flex-wrap justify-center" style="height:190px">
                        <button v-for="(item,index) in items" :key="index" class="button_select" @click="selectTab(index)" :class="{ 'active': index === selectedTab }">
                        {{ item.select }}
                        </button>
                    </v-col>
                </div>
            </v-row> 
        </v-container>

         <!--컨텐츠-->
                <v-container class="mt-13">
                    <v-expansion-panels>
                        <v-row>
                        <v-col cols="1"></v-col>
                            <v-col cols="10" v-if="selectedTab !== null">
                                <v-expansion-panel v-for="(accordion,index) in items[selectedTab].accordions" :key="index" class="mb-2">

                                    <v-expansion-panel-title class="custom" :icon="chevron_backward">
                                        <div class="title_wrap">
                                            <p><span class="material-symbols-outlined question_mark">{{accordion.icon}}</span>{{ accordion.title }}</p>
                                        </div>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <p v-html="accordion.content"></p>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-col>
                        <v-col cols="1"></v-col>
                        </v-row>
                    </v-expansion-panels>
                
                </v-container> 
    </v-main>

</template>

<script>
    export default{
        data(){
        return{
            selectedTab: 0,
            items:[
            {
            select: "일반배송",
            accordions:[
            {icon: "contact_support",
            title: "주문은 어떻게 하나요?",
            content: `&#8226; 세탁왕 앱 > 픽업신청 > 신청하기를 눌러주세요&#46; <br> &#40; 배송지 정보와 결제 시 사용할 카드를 등록해야 픽업신청이 가능해요&#46;&#41; <br>&#8226; 배송주소와 공동현관 출입방법을 꼭 확인해주시고 신청하기를 눌러 주문해주시면 돼요&#46; ` },
            
            {icon: "contact_support",
            title: "수거와 배송은 언제하나요?",
            content: "&#8226; 수거와 배송은 오후 1시부터 오후 9시까지 배송직원이 순차적으로 방문하고 있어요&#46; " },
            
            {icon: "contact_support",
            title: "최소 주문금액은 얼마인가요?",
            content: `&#8226; 1회 최소 주문금액은 30,000원이에요&#46; <br>금액 미달 시 30,000원 자동 결제<br>&#8226; 첫 주문 시 최소 주문금액이 적용되지 않으니, 세탁물 1개라도 부담없이 맡겨보세요&#46; <br>&#8226; 최소 주문금액 미달 시 기준가인 30,000원에서 쿠폰 등 할인이 적용돼요&#46; ` },
            
            {icon: "contact_support",
            title: "세탁물은 어떻게 담나요?",
            content: `&#91; 첫주문인 경우 &#93; <br>1&#46; 가정에서 찾기 쉬운 쇼핑백이나 비닐봉지에 세탁물을 담아주세요&#46; <br>2&#46; 일반세탁과 신발을 분리해서 문 앞에 놓아주세요&#46; <br>&#91; 재주문인 경우 &#93; <br>저희가 배송해 드릴 때 포장해드린 세탁왕 대형 비닐봉지에 담아 묶어서 문 앞에 놓아주세요&#46; ` },
            
            {icon: "contact_support",
            title: "세탁이 불가한 품목이 있나요?",
            content: `&#8226; 아래의 항목은 서비스 이용이 어려우니 참고해주세요&#46; <br>&#8226; 생활빨래는 취급하지 않아요<br>&#8226; 세탁물없이 수선 서비스만은 제공하지 않아요&#46; <br> &#45;  가방, 신발 등의 수선` },

            {icon: "contact_support",
            title: "방문시 따로 연락을 주시나요?",
            content: `&#8226; 수거와 배송은 별도로 연락드리지 않아요&#46; <br>&#8226; 특별한 경우&#40; 주소,공동현관비밀번호 불일치등 &#41; 만 따로 연락을 드려요&#46; <br>&#8226; 수거와 배송 관련 주문현황은 앱을 통해 확인이 가능해요&#46; ` }
            ]},

            {
            select: "택배픽업",
            accordions:[
            {icon: "contact_support",
            title: "세탁이 불가한 품목이 있나요?",
            content: `&#8226; 택배를 통해 배송이 진행되기 때문에 구김이 발생하여 착용이나 사용이어려운 세탁물은 피해주세요&#46; <br>물론 어느정도 구김이 있어도 사용하시기 원하면 이용 가능합니다&#46; <br>&#40; 세탁물 구김으로 인한 재세탁은 불가하니 참고해주세요&#46; &#41; <br>&#8226; 택배 배송 특성상 접어서 박스 포장되지 않는 카페트는 취급하지 않습니다&#46; <br>&#8226; 세탁물없이 수선 서비스만은 제공하지 않아요&#46; `
            },{icon: "contact_support",
            title: "세탁물 배송까지 얼마나 걸리나요?",
            content: `&#8226; 택배를 보내고 세탁 이후 다시 택배를 받는데까지 약 5일~7일정도가 소요돼요&#46; &#40; 주말 및 공휴일 제외 &#41; <br>&#8226; 명절이나 연휴기간에는 택배사의 사정에 따라 배송이 다소 지연될 수 있어요&#46; `
            },
            {icon: "contact_support",
            title: "주문은 어떻게 하나요?",
            content: `&#8226; 세탁왕 앱 > 픽업신청 > 택배픽업 신청하기를 눌러주세요&#46; <br>&#8226; 주소와 연락처 확인 후&#44;  세탁물이 담긴 택배 박스 수량을 선택해주세요&#46; <br>&#8226; 유의사항 확인 후 접수 완료하면 픽업 택배비가 결제돼요&#46; <br>&#8226; 주문 시간 &#40; 오후 5시 기준 &#41; 에 따라 다음날 또는 이틀 후 택배기사님이 방문해서 박스를 픽업해요&#46; <br>&#42;  택배박스 수량에 따라 픽업 택배비가 결제돼요&#46; <br>&#42;  픽업 택배비 결제가 실패되면 주문은 취소돼요&#46; <br>&#42;  배송 택배비는 세탁왕에서 부담해요&#46; `
            },
            {icon: "contact_support",
            title: "최소 주문금액은 얼마인가요?",
            content: `&#8226; 1회 최소 주문금액은 30&#44; 000원이에요&#46; &#40; 픽업 택배비는 별도 결제 &#41; <br>&#8226; 최소 주문금액 미달 시 기준가인 30&#44; 000원에서 쿠폰 등 할인이 적용돼요&#46; `
            },
            {icon: "contact_support",
            title: "세탁물은 어떻게 담나요?",
            content: `&#8226; 택배박스 안에 일반세탁물과 신발을 분리해서 담아주세요&#46; <br>주변에서 쉽게 구할 수 있는 종이박스를 이용하시면 됩니다&#46; `
            },
            {icon: "contact_support",
            title: "택배비는 얼마인가요?",
            content: `&#8226; 픽업 택배비는 박스 1개당 4&#44; 900원이 부과 돼요&#46; <br>&#42;  제주도 등 도서산간 지역은 3&#44; 000원이 추가 돼요&#46; <br>&#42;  추가 택배비가 발생한 경우 인수증에 요금이 추가로 부과 돼요&#46; `
            },
            {icon: "contact_support",
            title: "택배박스 크기에 제한이 있나요?",
            content: `&#8226; 가로+세로+높이의 합이 150cm 이하 크기로만 가능해요&#46; <br>&#8226; 150cm가 초과되는 박스는 택배사에서 픽업을 거부하니 크기를 꼭 확인해주세요&#46; <br>&#42; 박스 크기 초과로 인해 택배사에서 픽업을 거부한 경우&#44;  픽업 택배비는 환불되지 않으니 이점 꼭 참고해주세요&#46; `
            },
            {icon: "contact_support",
            title: "택배박스 픽업은 언제,  어떻게 하나요?",
            content: `&#8226; 택배픽업을 신청한 시간 &#40; 오후 3시 기준 &#41; 에 따라 다음날 또는 이틀 뒤에 택배기사님이 방문하여 픽업해요&#46; <br>&#8226; 외출시에는 문 앞에 박스를 두시고 "세탁왕" 이라고 적어 주세요`
            },
            {icon: "contact_support",
            title: '택배기사님이 간혹 "반품 있어요?"라고 할 수 있어요',
            content: `&#8226; 고객님들의 택배요금을 줄여 드리고 이용의 편의를 위해 택배를 세탁왕이 직접 접수해 드려요<br>따라서 택배사 입장에서는 "반품"으로 인식이 됩니다<br>&#8226; 택배기사님에 따라 간혹 전화나 문자 등으로 "반품있어요?<br>또는 택배 있어요?" 라고 연락을 드릴 수 있어요&#46; `
            },
            {icon: "contact_support",
            title: "세탁물 배송까지 얼마나 걸리나요?",
            content: `&#8226; 택배를 보내고 세탁 이후 다시 택배를 받는데까지 약 5일~7일정도가 소요돼요&#46; &#40; 주말 및 공휴일 제외 &#41; <br>&#8226; 명절이나 연휴기간에는 택배사의 사정에 따라 배송이 다소 지연될 수 있어요&#46; `
            }
        ]},

            {
            select: "주문",
            accordions:[
            {icon: "contact_support",
            title: "주문취소시 반송비는 있나요?",
            content: `&#8226; 수거된 상태에서 주문취소를 하실 경우 반송비 5천원이 부과됩니다&#46; `
            },
            {icon: "contact_support",
            title: "세탁왕 앱을 꼭 설치해야 되나요?",
            content: `&#8226; 세탁왕은 앱을 통해서만 서비스 이용이 가능해요&#46; <br>&#8226; 안드로이드&#47; 아이폰 모두 이용이 가능해요&#46; <br>&#8226; 다양한 이벤트와 프로모션을 진행하고 있으니 세탁왕 앱을 꼭 설치해주세요&#46; `
            },
            {icon: "contact_support",
            title: "서비스지역이 어딘가요?",
            content: `&#91; 일반픽업 서비스 지역 &#93; <br>&#45;  마포구&#44;  은평구&#44;  서대문구&#44;  노원구&#44;  의정부시 전체<br>&#45;  고양시 일부&#44;  남양주시 일부<br>&#8226; 그외 지역은 &#91; 오픈알림 &#93;  신청을 하면 서비스 오픈 시 문자로 알려드려요&#46; <br>&#8226; 픽업 서비스지역은 점차 확대될 예정이니 조금만 기다려주세요&#46; <br>&#91; 택배픽업 서비스 지역 &#93; <br>&#45; 택배픽업은 일반픽업 지역을 제외한 모든 지역에서 이용 가능해요&#46; <br>&#42;  주문하시는 지역에 따라 자동으로 일반픽업과 택배픽업으로 구분되어 주문신청 됩니다&#46; <br>자세한 내용은 세탁왕 어플에서 “지역안내”를 참조해 주세요&#46; `
            },
            {icon: "contact_support",
            title: "주문취소는 어떻게 하나요?",
            content: `&#8226; 세탁왕 앱 > 이용내역 > 주문정보를 눌러주세요&#46; <br>&#8226; &#91; 주문취소 &#93; 를 눌러주세요&#46; <br>&#42; 일반픽업: 주문당일 오후 1시까지 취소가 가능하며&#44;  수거를 완료한 뒤에는 취소가 불가해요&#46; <br>&#42; 택배픽업: 주문당일 오후 3시까지 취소가 가능하며&#44;  오후 5시 이후 주문은 다음날 오후 3시까지 주문취소가 가능해요&#46; <br> &#91; 오후 3시 이후에는 자동으로 송장이 발급되셔서 택배비 환불이 불가해요&#46; &#93; <br>&#42; 택배 직원이 박스를 픽업한 이후엔 주문취소가 불가하며&#44;  취소를 희망하시는 경우 반송 택배비는 고객님이 부담하셔야해요&#46; `
            }
        ]},

            {
            select: "수거/배송",
            accordions:[
            {icon: "contact_support",
            title: "이미 수거한 상태에서 세탁물을 추가로 맡기고 싶어요. ",
            content: `주문이 진행 중일때 추가 주문을 원하실 경우 주문확인 &#61;&#62;  주문예약을 해주세요<br>&#42;  추가 주문한 건은 먼저 주문한 세탁물 배송때 수거를 해드려요<br>&#42;  예약건은 주문내역에서 확인가능합니다&#46; <br>&#42;  세탁물을 수거한 이후에는 당일 재방문이 어려운점 양해 부탁드려요&#46; `
            },
            {icon: "contact_support",
            title: "배송비가 따로 있나요?",
            content: `&#8226; 별도의 배송비는 없으니 부담없이 맡겨주세요&#46; `
            },
            {icon: "contact_support",
            title: "수거/배송 일정을 변경할 수 있나요?",
            content: `&#8226; 스케줄에 맞춰 배송직원과 택배예약을 준비하고 있어 수거와 배송일정 변경은 어려워요&#46; <br>&#8226; 수거일정 변경이 필요하신 경우&#44;  주문취소 후 다시 주문을 해주세요&#46; <br>&#8226; 부득이하게 일정을 변경해야되는 경우 고객센터로 미리 연락주세요&#46; `
            },
            {icon: "contact_support",
            title: "세탁물 배송까지 얼마나 걸리나요?",
            content: `&#8226; 세탁물의 수거부터 배송까지 2박3일이 소요돼요&#46; <br>&#8226; 세탁요금이 결제되지 않은 경우 배송이 지연될 수 있어요&#46; <br>&#8226; 완성도 높은 세탁을 위해 세탁&#44;  건조 시간이 늘어난 경우 고객센터에서 별도로 연락드려요&#46; <br>&#42; 공휴일은 운영하지 않으니 참고해주세요&#46; `
            },
            {icon: "contact_support",
            title: "수거지와 배송지의 주소가 달라도 되나요?",
            content: `&#8226; 수거지와 배송지의 주소가 같은 경우에만 서비스 이용이 가능해요&#46; `
            }
        ]},

            {
            select: "세탁",
            accordions:[
            {icon: "contact_support",
            title: "수선도 가능한가요?",
            content: `&#8226; 네 수선도 가능합니다&#46; <br>단&#44;  요금표에 적혀있는 수선 항목만 가능합니다&#46; <br>&#42;  세탁물없이 수선 서비스만은 제공하지 않아요&#46; `
            },
            {icon: "contact_support",
            title: "세탁과정이 궁금해요.",
            content: `&#8226; 세탁은 20년 경력의 전문가가 모든 세탁물을 직접 세탁해요&#46; <br>&#8226; 세탁이 완료되면 건조작업 이후 포장하여 배송하고 있어요&#46; <br>&#8226; 맡겨주신 모든 세탁물은 추가요금없이 보풀 제거 케어&#44;  친환경 세제 사용&#44;  항균 케어를 해드리고 있어요&#46; `
            },
            {icon: "contact_support",
            title: "세탁요금이 궁금해요.",
            content: `&#8226; 세탁왕은 세탁요금 정찰제를 실시하고 있어요&#46; <br>&#8226; 메인화면에 &#91; 요금표 &#93; 를 눌러 추가요금이 없는 안심 요금표를 확인해보세요&#46; `
            },
            {icon: "contact_support",
            title: "세탁이 만족스럽지 않으면 어떻게 하나요?",
            content: `&#8226; 세탁왕은 안전하고 깨끗한 친환경 항균세탁을 추구하고 있어요&#46; <br>혹시라도 세탁결과가 마음에 들지 않는다면 배송완료일&#40; 택배 배송완료일 &#41; 로부터 7일 이내에 고객센터로 연락주세요&#46; <br>&#42; 착용전에만 가능<br>&#8226; 세탁물 관련사고로 인한 배상은 &#91; 세탁업 표준약관 &#93; 과 &#91; 소비자피해보상 &#93;  기준을 따르고 있어요&#46; <br>손해배상액의 산정은 세탁물의 구입가격과 소비자피해규정 상의 배상비율에 따라&#44;  구입영수증 등의 증빙을 고객님께 요청할 수 있어요&#46; <br>구입영수증의 증빙이 어려운 경우&#44;  세탁업 표준약관에 따라 최대 배상액은 세탁요금의 20배 이내로 하고 있어요&#46; <br>세탁과정이나 배송상의 문제가 아님이 증명된 경우엔 면책돼요&#46; `
            }
        ]},

            {
            select: "결제",
            accordions:[
            {icon: "contact_support",
            title: "결제는 어떻게 해요?",
            content: `&#8226; 결제는 신용카드나 체크카드를 앱에 등록해야만 가능해요&#46; <br>&#8226; 결제할 카드를 등록하면&#44;  배송일&#40; 택배발송일 &#41;  오전 9시에 자동결제가 돼요&#46; <br>&#8226; 법인카드도 등록 가능해요&#46; <br>&#8226; 결제는 등록한 카드로만 결제가 가능해요&#46; `
            },
            {icon: "contact_support",
            title: "인수증이 무엇인가요?",
            content: `&#8226; 인수증은 고객님께서 맡겨주신 세탁물의 분실등의 사고를 예방하기 위해 세탁물의 품목과 수량&#44;  세탁요금의 정보가 담긴 영수증이에요&#46; <br>&#8226; 일반픽업은 수거당일 오전에 앱을 통해 발급해드리고 있어요&#46; <br>&#8226; 택배핍업은 택배박스가 세탁소 도착 이후 2일내로 앱을 통해 발급해드리고 있어요&#46; <br>&#42; 택배픽업의 경우 택배사 사정으로 일정이 지연될 수 있어요&#46; `
            },
            {icon: "contact_support",
            title: "쿠폰은 어떻게 사용하나요?",
            content: `&#8226; 쿠폰은 인수증이 발급된 이후&#44;  주문정보에서 &#91; 쿠폰선택 &#93; 을 눌러 사용하실 쿠폰을 선택해주세요&#46; <br>&#8226; 배송일 &#40; 택배발송일 &#41;  오전 9시에 앱에 등록하신 카드로 자동결제가 되기 때문에 그전에 쿠폰을 미리 선택해주세요&#46; <br>&#8226; 최소 주문금액 미달 시 기준가인 30&#44; 000원에서 쿠폰 할인이 적용돼요&#46; `
            },
            {icon: "contact_support",
            title: "등록한 카드는 어떻게 변경하나요?",
            content: `&#8226; 등록된 카드 변경은 마이페이지 &#45;&#62; 결제카드 변경하기를 눌러 가능해요&#46; `
            },
            {icon: "contact_support",
            title: "결제가 실패되었어요. ",
            content: `&#8226; 결제가 실패되었다면 마이페이지 &#45;&#62; 결제카드 변경하기를 통해 결제 가능한 카드로 변경해주세요&#46; <br>&#8226; 일반픽업은 배송일 오전 11시전까지 결제 가능한 카드로 변경해야 정상 배송이 진행돼요&#46; <br>&#8226; 택배픽업은 발송일 오후 1시전까지 결제 가능한 카드로 변경해야 정상 발송이 진행돼요&#46; <br>&#42; 결제가 완료되야 배송을 진행하고 있으니 이점 꼭 참고해주세요&#46; `
            }
        ]},

            {
            select: "회원",
            accordions:[
            {icon: "contact_support",
            title: "회원탈퇴는 어떻게 하나요?",
            content: `회원탈퇴는 앱에서 마이페이지&#45; >설정에 들어가 &#91; 회원탈퇴 &#93; 를 누르면 탈퇴가 가능해요&#46; <br>&#8226; 배송이 완료되지 않은 주문이 있는 경우 탈퇴가 불가해요&#46; <br>&#8226; 회원탈퇴 시 보유하고 계신 쿠폰은 모두 소멸되며&#44;  다시 가입해도 발행되지 않아요&#46; `
            }
        ]},

        {
            select: "주문정보",
            accordions:[
            {icon: "contact_support",
            title: "등록된 질문이 없습니다. ",
            content: `궁금하신 사항은 고객센터에 문의해주세요&#46; `
            }
        ]}  
    ]}
},
        methods: {
        goBack(){
        this.$router.push('/');
        },
        selectTab(index) {
            this.selectedTab = index;
        }
    }    
}
        
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 80px;
    color: #A1A8BD;
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 24;
}

template, div, footer{
    padding:0;
}


.button_box{
    background-color:#f7f9fc;
    width: 100%;
    height: 250px;
}
.button_select{
    font-size: 16px;
    width: 25%;
    background-color: #fff;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2196F3;
}
.button_select.active{
    background-color: #F4FAFE;
    color: #2196F3;
}
.button_select:hover{
    background-color: #F4FAFE;
    color: #2196F3;
}
.title_wrap p{
    display:flex;
    align-items: center;
    gap: 10px
}
.flex-wrap{
    margin:0;
    padding:0;
}

.question_mark{
    font-size: 30px;
    font-variation-settings:
    'FILL' 0,
    'wght'400,
    'GRAD' 0,
    'opsz' 20;
    color: #64B5F6;
}
.cursor_custom{
    width: 100%;
    height: 25%;
    flex-wrap:wrap;
    display:flex;
}
.custom{
    background-color: #F4FAFE;
}
.custom:hover{
    background-color: #e0f2ff;
}
</style>