<template>
    <v-main style="padding:0;">
      <v-row style="padding:0;">
        <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>
        <v-col class="d-flex justify-center align-center mt-2"><h2>요금표</h2></v-col>
        <v-col></v-col>
      </v-row>
    </v-main>
    <v-container>
      <v-row class="mt-10 mb-5">
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-card class="justify-center align-center pl-10 pr-10 pt-5 card_custom">
            <div class="flex_wrap">
              <img :src="imagePath" alt="" class="info">
              <h3 class="mb-3 text-center">{{ title }}</h3>
            </div>
            <p v-html="text" style="color:#798094"></p>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
  
      <v-row class="mt-10 mb-10">
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <div class="flex_wrap_for_buttons">
            <button v-for="(button, index) in buttons" :key="index" class="button_style" @click="changeContent(index)" :class="{'activeButton':index===activeButtonIndex}">
              <img :src="activeButtonIndex===index?button.activeImg:button.defaultImg" alt="">
              {{ button.buttonTitle }}
            </button>
          </div>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>

    <v-container class="mt-13 mb-10" v-if="accordions && accordions.length > 0">
                    <v-expansion-panels>
                        <v-row>
                        <v-col cols="1"></v-col>
                            <v-col cols="10">
                                <v-expansion-panel v-for="(accordion,index) in accordions" :key="index" class="mb-2" >

                                    <v-expansion-panel-title>
                                            <p class="charge_box_title">{{ accordion.title }}</p>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <div class="charge_box mb-5">
                                        <p v-if="accordion.content" v-html="accordion.content"></p>
                                        </div>
                                        <div v-for="charge in accordion.charges" :key="charge.chargeTitle" class="charge_style">
                                            <p><span class="chargeTitle_style">{{ charge.chargeTitle }}</span>
                                            <span>{{ charge.chargeText }}</span></p>
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-col>
                        <v-col cols="1"></v-col>
                        </v-row>
                    </v-expansion-panels>
                </v-container> 

    <v-container>
        <v-col cols="10" offset="1">
        <div class="not_handled">
            <div class="not_handled_title_wrap">
                <img :src="cancelImage">
                <h4>{{ not_handled_title }}</h4>
            </div>
            <p v-html="not_handled_text"></p>
        </div>
        </v-col>
    </v-container>
  
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeButtonIndex: null,
        imagePath: "/images/images/info.png",
        cancelImage: require("@/assets/images/cancel.png"),
        title: "유의사항",
        text: `<p>&#8226; 명품 브랜드는 세탁왕만의 특별한 프리미엄코스&#40;친환경 기능성 전용세제&#44; 단독세탁&#44; 더블향균 풀 케어&#41;로 진행되며 일반요금에 2배가 적용됩니다&#46;&#40;가품도 동일적용&#41; <br>&#8226; 애용하시는 일반제품을 세탁왕만의 섬세한 프리미엄 케어를 희망하실 경우&#44; 주문접수시 프리미엄케어 신청란에 표기해 주세요&#46; 명품과 같은 기준으로 세탁 진행하며 일반 요금의 2배가 적용됩니다&#46;<br> &#8226; 일반세탁으로는 제거가 어려운 오염&#44; 보풀&#44; 반려동물 털케어가 필요한 경우&#44; 전문가의 판단에 따라 기술세탁을 진행하며 정도와 범위에 따라 책정된 기술 요금이 추가됩니다&#46; 수거된 상태에서 주문 취소 하실 경우 반송비 5&#44;000원이 부과됩니다&#46;<p>`,
        not_handled_title:"취급하지 않는 품목",
        not_handled_text: `<p>&#8226; 생활빨래 <br> &#8226; 가방&#44; 신발 등의 수선과 한복의 동정은 달지 않아요&#46;<br>  &#8226; 세탁물없이 수선 서비스만은 제공하지 않아요&#46; <br> &#8226; 애완동물의 의류 및 용품</p> <br> <p>&#91;주의사항&#93; <br> &#8226; 카페트/가죽 제품은 5~7일 정도 추가시간이 필요해요&#46; 완성도 높은 세탁을 위해 세탁&#44; 건조 시간이 추가로 필요한 경우 고객센터에서 별도로 연락드려요&#46; <br> &#8226; 인형&#44; 솜이불&#44; 솜베게 등 솜 충전재가 들어간 경우 세탁시 뭉침현상이 발생되며 구매초기의 형태가 유지되지 않을 수 있습니다&#46; <br> &#8226; 토사물/곰팡이가 있는 세탁물은 고착상태에 따라 오염이 일부 남을 수 있고 원단의 수축&#44; 변색 등이 발생할 수 있어요&#46; <br> &#8226; 세탁물 검수 시 손상이나 파손이 우려되는 경우 전문가 의견에 따라 세탁하지 않고 반송해드려요&#46; <br> &#8226; 기상상황에 따라 배송이 지연될 수 있어요&#46; </p> <br> <p>&#91;명품목록&#93; <br> 구찌&#44; 샤넬&#44; 루이비통&#44; 프라다&#44; 버버리&#44; 디올&#44; 페라가모&#44; 발렌시아가&#44; 배르사체&#44; 발렌티노&#44; 돌체앤가바나&#44; 팬디&#44; 미우미우&#44; 톰브라운&#44; 까르띠에&#44; 에르메네질도 제냐&#44; 몽클레어&#44; 캐나다구스&#44; 스톤아일랜드&#44; 겐조&#44; 입생로랑&#44; 비비안웨스트우드&#44; 무스너클&#44; 골든구스&#44; 알렉산더맥퀸 메종마르지엘라&#44; 지방시&#44; 보스&#44; 셀린느&#44; 알렉산더왕&#44; 막스마라&#44; 이자벨 마랑&#44; 로샤스&#44; 랑방&#44; 마크제이콥스&#44; 에르메스&#44; 아르마니 등</p>`,
        accordions:[],
        buttons: [
          { buttonTitle: "의류",
            defaultImg: require("@/assets/images/clean-clothes.png"),
            activeImg: require("@/assets/images/clean-clothes_blue.png"), 
            accordions:[
            {
                    title:"셔츠/블라우스",
                    content:`&#8226; 와이셔츠: 카라가 빳빳하고&#44; 넥타이를 사용하는 흰색&#44; 파스텔톤의 일반핏 정장셔츠<br>&#8226; 남방셔츠: 와이셔츠/슬림핏셔츠를 제외한 유색셔츠<br>&#8226; 롱/빅 사이즈: 추가요금 적용<br>&#8226; 셔츠/블라우스의 옷깃부터 총 길이가 80cm이상인 경우 롱 사이즈로 분류&#44; 3XL부터 빅사이즈로 분류함&#46;`,
                    charges:[
                {
                    chargeTitle:"셔츠/블라우스",
                    chargeText: "1,900원"
                },
                {
                    chargeTitle:"슬림핏 와이셔츠/교복셔츠",
                    chargeText: "3,000원"
                },
                {
                    chargeTitle:"남방/티셔츠",
                    chargeText: "4,000원"
                },
                {
                    chargeTitle:"롱/빅 와이셔츠",
                    chargeText: "4,000원"
                },
                {
                    chargeTitle:"롱/빅 남방/티셔츠",
                    chargeText: "5,000원"
                },
                {
                    chargeTitle:"린넨/골덴/데님/면 셔츠",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"롱/빅 린넨/골덴/데님/면 셔츠",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"맨투맨/후드티",
                    chargeText: "5,000원"
                },
                {
                    chargeTitle:"블라우스/티블라우스",
                    chargeText: "5,000원"
                },
                {
                    chargeTitle:"롱/빅 블라우스/티블라우스",
                    chargeText: "7,000원"
                }
            ]},
            {
                title:"원피스/점프수트/멜빵하의/가운",
                content:`&#8226; 원피스의 옷깃부터 총 길이가 110cm 이상인 경우&#44; 롱 사이즈로 분류`,
            charges:[
            {
              chargeTitle:"원피스/멜빵하의",
              chargeText: "7,000원"
            },
            {
              chargeTitle:"고급소재 원피스",
              chargeText: "9,000원"
            },
            {
              chargeTitle:"롱 원피스/점프수트",
              chargeText: "9,000원"
            },
            {
              chargeTitle:"롱 고급소재 원피스",
              chargeText: "12,000원"
            },
            {
              chargeTitle:"레이스 원피스",
              chargeText: "15,000원"
            },
            {
              chargeTitle:"성직자/학위/의사가운",
              chargeText: "9,000원"
            },
            ]},
            {
                title:"스웨터/가디건/니트",
                content:`&#8226; 스웨터/가디건/니트의 총 길이가 80cm 이상인 경우&#44; 품목과 요금은 롱 사이즈로 적용함`,
              charges:[
              {
                chargeTitle:"스웨터/니트",
                chargeText: "5,000원"
              },
              {
                chargeTitle:"고급소재 스웨터",
                chargeText: "7,000원"
              },
              {
                chargeTitle:"두꺼운/롱 스웨터",
                chargeText: "7,000원"
              },
              {
                chargeTitle:"고급소재 두꺼운/롱 스웨터",
                chargeText: "9,000원"
              },
              {
                chargeTitle:"가디건(지퍼 단추가 있는 디자인)",
                chargeText: "6,000원"
              },
              {
                chargeTitle:"고급소재 가디건",
                chargeText: "8,000원"
              },
              {
                chargeTitle:"두꺼운/롱 가디건",
                chargeText: "8,000원"
              },
              {
                chargeTitle:"고급소재 두꺼운/롱 가디건",
                chargeText: "10,000원"
              }
            ]},
            {
                title:"상의/재킷/조끼",
                content:`&#8226; 재킷 기준: 옷깃&#44; 소매가 있는 정장/교복상의<br>&#8226; 재킷/조끼의 옷깃부터 총 길이가 80cm 이상인 경우 롱 사이즈로 분류`,
              charges:[
              {
                chargeTitle:"정장/교복상의",
                chargeText: "5,000원"
              },
              {
                chargeTitle: "재킷(린넨/골덴/벨벳/트위드 등)",
                chargeText: "6,000원"
              },
              {
                chargeTitle: "재킷(다운/누빔 내피)",
                chargeText: "15,000원"
              },
              {
                chargeTitle: "재킷(모피 내피)",
                chargeText: "30,000원"
              },
              {
                chargeTitle: "일반조끼(교복/정장조끼)",
                chargeText: "4,000원"
              },
              {
                chargeTitle: "니트 조끼",
                chargeText: "4,000원"
              },
              {
                chargeTitle: "보아털 조끼(인조 양털)",
                chargeText: "9,000원"
              },
              {
                chargeTitle: "두꺼운/롱 조끼",
                chargeText: "7,000원"
              },
              {
                chargeTitle: "경량 패딩 조끼",
                chargeText: "8,000원"
              },
              {
                chargeTitle: "경량 롱 패딩 조끼",
                chargeText: "12,000원"
              },
              {
                chargeTitle: "패딩 조끼",
                chargeText: "10,000원"
              },
              {
                chargeTitle: "롱 패딩 조끼",
                chargeText: "15,000원"
              }
            ]},
            {
                title:"바지/스커트",
                content:`&#8226; 정장&#44; 교복&#44; 반바지&#44; 면/청/린넨/골덴 바지 등 <br> &#8226; 스커트의 총 길이가 70cm 이상인 경우 롱 사이즈로 분류`,
              charges:[
              {
                chargeTitle:"정장/교복하의",
                chargeText: "5,000원"
              },
              {
                chargeTitle:"바지/스커트(롱/린넨/골덴/청/벨벳/트위드/기모 등)",
                chargeText: "6,000원"
              },
              {
                chargeTitle:"고급소재 하의",
                chargeText: "7,000원"
              },
              {
                chargeTitle:"롱 스커트/주름스커트",
                chargeText: "9,000원"
              },
              {
                chargeTitle:"패딩 하의",
                chargeText: "12,000원"
              }
            ]},
            {
                title:"아웃도어",
                content:`&#8226; 바람막이&#44; 골프&#44; 등산의류&#44; 방수니트 &#40; 조끼포함 &#41; 등 아웃도어 기능성 의류`,
              charges:[
              {
                chargeTitle:"기능성 셔츠",
                chargeText: "10,000원"
              },
              {
                chargeTitle:"기능성 방수니트 셔츠",
                chargeText: "12,000원"
              },
              {
                chargeTitle:"기능성 상의",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"기능성 하의",
                chargeText: "10,000원"
              },
              {
                chargeTitle:"스키/보드 상의",
                chargeText: "30,000원"
              },
              {
                chargeTitle:"스키/보드 하의",
                chargeText: "20,000원"
              },
              {
                chargeTitle:"스키/보드 기능성 장갑",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"침낭",
                chargeText: "25,000원"
              }
            ]},
            {
                title:"점퍼/패딩",
                content:`&#8226; 점퍼 기준 : 바람막이&#44; 항공점퍼&#44; 야상&#44; 집업&#44; 인조양털/폴라프리스 등의 품이 넉넉하고 캐쥬얼한 상의<br> &#8226; 패딩 기준 : 일반솜&#44; 오리털&#44; 거위털 포함 <br> &#8226; 점퍼/패딩의 옷깃부터 총 길이가 80cm 부터 99cm 이하인 경우 하프 사이즈로 분류하고 총 길이가 100cm이상인 경우 롱 사이즈로 분류 함&#46;`,
              charges:[
              {
                chargeTitle:"봄점퍼",
                chargeText: "6,000원"
              },
              {
                chargeTitle:"롱 봄점퍼",
                chargeText: "8,000원"
              },
              {
                chargeTitle:"점퍼",
                chargeText: "9,000원"
              },
              {
                chargeTitle:"보아털 점퍼(인조양털)",
                chargeText: "12,000원"
              },
              {
                chargeTitle:"점퍼(다운/누빔/내피)",
                chargeText: "20,000원"
              },
              {
                chargeTitle:"점퍼(모피 내피)",
                chargeText: "35,000원"
              },
              {
                chargeTitle:"롱 점퍼",
                chargeText: "13,000원"
              },
              {
                chargeTitle:"봄점퍼",
                chargeText: "6,000원"
              },
              {
                chargeTitle:"롱 보아털 점퍼",
                chargeText: "18,000원"
              },
              {
                chargeTitle:"롱 점퍼(다운/누빔 내피)",
                chargeText: "30,000원"
              },
              {
                chargeTitle:"롱 점퍼(모피 내피)",
                chargeText: "50,000원"
              },
              {
                chargeTitle:"야구/학과 점퍼(소매 인조가죽)",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"야구/학과 점퍼(인조가죽)",
                chargeText: "30,000원"
              },
              {
                chargeTitle:"경량 패딩",
                chargeText: "10,000원"
              },
              {
                chargeTitle:"경량 롱 패딩",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"패딩",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"하프/헤비다운 패딩",
                chargeText: "20,000원"
              },
              {
                chargeTitle:"롱 패딩/벤치코트",
                chargeText: "25,000원"
              }
            ]},
            {
                title:"코트",
                content:`&#8226; 코트의 옷깃부터 총 길이가 100cm 이상인 경우&#44; 롱 사이즈로 분류`,
              charges:[
              {
                chargeTitle:"코트",
                chargeText: "10,000원"
              },
              {
                chargeTitle:"고급소재 코트",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"롱 코트",
                chargeText: "15,000원"
              },
              {
                chargeTitle:"롱 고급소재 코트",
                chargeText: "20,000원"
              },
              {
                chargeTitle:"코트(다운/누빔/내피)",
                chargeText: "35,000원"
              },
              {
                chargeTitle:"코트(모피 내피)",
                chargeText: "60,000원"
              },
              {
                chargeTitle:"트렌치코트",
                chargeText: "12,000원"
              },
              {
                chargeTitle:"롱 트렌치코트",
                chargeText: "17,000원"
              }
            ]},
            {
                title:"한복",
                content:`&#8226; 전통, 개량한복 공통적용 <br> &#8226; 종류와 관계없이 품목 개수만큼 과금 <br>&#91; 영유아 한복 기준 &#93;<br>&#8226; 상의 길이 : 110cm 이하 &#40;양쪽 소매간의 길이&#41; <br>&#8226; 바지길이 : 75cm 이하 / &#8226; 치마길이 : 95cm 이하`,
              charges:[
              {
                chargeTitle:"한복 1피스(성인)",
                chargeText: "10,000원"
              },
              {
                chargeTitle:"한복 1피스(영유아)",
                chargeText: "7,000원"
              }
            ]}
          ]},
          { buttonTitle: "신발", 
            defaultImg: require("@/assets/images/shoes.png"),
            activeImg: require("@/assets/images/shoes_blue.png"), 
            accordions:[
                {
                    title:"운동화/샌들/구두",
                    content:`&#8226; 준 명품: 아디다스 이지부스트&#44; 나이키 사카이 와플&#44; 에어조던 등에 준하는 브랜드<br>&#8226; 명품 : 명품 브랜드 기준 적용 &#40; 가품도 동일 적용 &#41;`,
                    charges:[
                {
                    chargeTitle:"운동화(천, 메시, 컨버스 재질 운동화, 단화포함)",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"발목 운동화",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"아동 운동화 (운동화에 가죽/스웨이드 재질이 일부라도 포함된 경우)",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"슬리퍼",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"어그 슬리퍼",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"어그 슬리퍼",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"준 명품 운동화",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"명품 운동화/구두/샌들(명품 브랜드 기준 적용)",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"구두/샌들",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"캐쥬얼화",
                    chargeText: "10,000원"
                }]},
                {
                    title:"스포츠화",
                    content: "",
                    charges:[
                {
                    chargeTitle:"트래킹/농구/축구화",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"등산/골프화",
                    chargeText: "12,000원"
                }
              ]},
                {
                    title:"부츠",
                    content:`&#8226; 부츠의 총 길이가 25cm 이상인 경우 &#44; 롱 사이즈로 구분`,
                    charges:[
                {
                    chargeTitle:"부츠",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"롱 부츠",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"어그 부츠",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"롱 어그 부츠",
                    chargeText: "35,000원"
                }]}
        ]
          },
          { buttonTitle: "리빙", 
            defaultImg: require("@/assets/images/pillows.png"),
            activeImg: require("@/assets/images/pillows_blue.png"),
            accordions:[
            {
                    title:"이불",
                    content:`&#8226; 짧은 면의 길이가 180cm 이상은 "대"로 분류합니다&#46;<br>&#8226; 짧은 면의 길이가 210cm 부터 "특대"로 분류하며 요금이 추가됩니다.&#46;`,
                    charges:[
                {
                    chargeTitle:"홑 이불",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"홑 이불 대",
                    chargeText: "14,000원"
                },
                {
                    chargeTitle:"차렵 이불",
                    chargeText: "13,000원"
                },
                {
                    chargeTitle:"차렵 이불 대",
                    chargeText: "17,000원"
                },
                {
                    chargeTitle:"이불 커버",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"이불 커버 대",
                    chargeText: "16,000원"
                },
                {
                    chargeTitle:"솜/극세사 이불",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"오리/거위털 이불",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"오리/거위털 이불 대",
                    chargeText: "35,000원"
                },
                {
                    chargeTitle:"양모 이불",
                    chargeText: "30,000원"
                },
                {
                    chargeTitle:"양모 이불 대",
                    chargeText: "40,000원"
                },
                {
                    chargeTitle:"담요",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"무릎 담요 (한 면의 길이가 100cm 이하)",
                    chargeText: "6,000원"
                }]
          },
          {
                    title:"패드",
                    content:`&#8226; 짧은 면의 길이가 150cm 이상은 "대"로 분류합니다&#46;<br>&#8226; 짧은 면의 길이가 170cm부터 "특대"로 분류되어 요금이 추가 됩니다&#46;`,
                    charges:[
                {
                    chargeTitle:"일반 패드",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"일반 패드 대",
                    chargeText: "14,000원"
                },
                {
                    chargeTitle:"극세사 패드",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"극세사 패드 대",
                    chargeText: "16,000원"
                },
                {
                    chargeTitle:"침대/요 커버",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"침대/요 커버 대",
                    chargeText: "16,000원"
                },
                {
                    chargeTitle:"누빔 패드/커버",
                    chargeText: "14,000원"
                },
                {
                    chargeTitle:"누빔 패드/커버 대",
                    chargeText: "16,000원"
                }]
          },
          {
                    title:"토퍼",
                    content:`&#8226; 짧은 면의 길이가 150cm 이상은 "대"로 분류합니다&#46;<br>&#8226; 짧은 면의 길이가 170cm부터 "특대"로 분류하며 요금이 추가 됩니다&#46;`,
                    charges:[
                {
                    chargeTitle:"일반 토퍼",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"일반 토퍼 대",
                    chargeText: "35,000원"
                },
                {
                    chargeTitle:"오리/거위털 토퍼",
                    chargeText: "35,000원"
                },{
                    chargeTitle:"오리/거위털 토퍼 대",
                    chargeText: "50,000원"
                }]
          },
          {
                    title:"배게/쿠션",
                    content:`&#8226; 가로 길이 100cm 이상인 경우&#44; 대 사이즈로 분류합니다&#46;`,
                    charges:[
                {
                    chargeTitle:"배게/쿠션 커버",
                    chargeText: "4,000원"
                },
                {
                    chargeTitle:"배게/쿠션 커버 대",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"베개/쿠션 솜",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"배게/쿠션 솜 대",
                    chargeText: "12,000원"
                },
                {
                    chargeTitle:"오리털/거위털 베개",
                    chargeText: "15,000원"
                }]
          },
          {
                    title:"커튼",
                    content:`&#8226; 가로길이 180cm 이상인 경우&#44; 대 사이즈로 분류합니다&#46;<br>&#8226; 가로 길이 210cm 이상인 경우 "특대"로 분류하며 요금이 추가됩니다&#46;`,
                    charges:[
                {
                    chargeTitle:"일반 커튼",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"일반 커튼 대",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"실크/암막/이중 커튼",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"실크/암막/이중 커튼 대",
                    chargeText: "30,000원"
                }]
          },
          {
                    title:"카페트/러그",
                    content:`&#8226; 한 면의 길이가 220cm 이상인 경우 "대"로 분류합니다&#46;<br>&#8226; 한 면의 길이가 270cm 이상인 경우 "특대"로 분류하며 요금이 추가됩니다&#46;<br>&#8226; 러그는 물빨래 가능 품목`,
                    charges:[
                {
                    chargeTitle:"러그",
                    chargeText: "40,000원"
                },
                {
                    chargeTitle:"러그 대",
                    chargeText: "70,000원"
                },
                {
                    chargeTitle:"카페트",
                    chargeText: "90,000원"
                },
                {
                    chargeTitle:"카페트 대",
                    chargeText: "130,000원"
                },
                {
                    chargeTitle:"샤기 카페트",
                    chargeText: "120,000원"
                },
                {
                    chargeTitle:"샤기 카페트 대",
                    chargeText: "160,000원"
                },
                {
                    chargeTitle:"발매트",
                    chargeText: "8,000원"
                }]
          }
        ]
          },
          { buttonTitle: "가죽/모피", 
            defaultImg: require("@/assets/images/fur-coat.png"),
            activeImg: require("@/assets/images/fur-coat_blue.png"),
            accordions:[
            {
                    title:"가죽",
                    content:`&#8226; 롱 사이즈 포함`,
                    charges:[
                {
                    chargeTitle:"가죽 재킷",
                    chargeText: "60,000원"
                },
                {
                    chargeTitle:"인조/부분가족 재킷",
                    chargeText: "35,000원"
                },
                {
                    chargeTitle:"가죽 점퍼",
                    chargeText: "70,000원"
                },
                {
                    chargeTitle:"인조/부분가죽 점퍼",
                    chargeText: "40,000원"
                },
                {
                    chargeTitle:"가죽 코트",
                    chargeText: "110,000원"
                },
                {
                    chargeTitle:"인조/부분가죽 코트",
                    chargeText: "60,000원"
                },
                {
                    chargeTitle:"가죽 조끼/하의",
                    chargeText: "45,000원"
                },
                {
                    chargeTitle:"인조/부분가죽 조끼/하의",
                    chargeText: "30,000원"
                },
                {
                    chargeTitle:"가죽 장갑/모자",
                    chargeText: "20,000원"
            }]},
            {
                    title:"가죽모피",
                    content:`&#8226; 스웨이드&#44; 밍크&#44; 무스탕&#44; 모피&#44; 토끼털&#44; 여우털&#44; 양털 포함<br>&#8226; 롱사이즈 포함`,
                    charges:[
                {
                    chargeTitle:"모피 재킷",
                    chargeText: "70,000원"
                },
                {
                    chargeTitle:"인조/부분모피 재킷",
                    chargeText: "40,000원"
                },
                {
                    chargeTitle:"모피 점퍼",
                    chargeText: "80,000원"
                },
                {
                    chargeTitle:"인조/부분모피 점퍼",
                    chargeText: "50,000원"
                },
                {
                    chargeTitle:"모피 코트",
                    chargeText: "140,000원"
                },
                {
                    chargeTitle:"인조/부분모피 코트",
                    chargeText: "70,000원"
                },
                {
                    chargeTitle:"모피 조끼/하의",
                    chargeText: "50,000원"
                },
                {
                    chargeTitle:"인조/부분모피 조끼/하의",
                    chargeText: "40,000원"
                },
                {
                    chargeTitle:"모피 장갑/모자",
                    chargeText: "30,000원"
                },
                {
                    chargeTitle:"모피 숄/목도리",
                    chargeText: "30,000원"
                }]}]
          },
          { buttonTitle: "잡화", 
            defaultImg: require("@/assets/images/cap.png"),
            activeImg: require("@/assets/images/cap_blue.png"),
            accordions:[
            {
                    title:"악세사리",
                    content:"",
                    charges:[
                {
                    chargeTitle:"스카프/목도리",
                    chargeText: "4,000원"
                },{
                    chargeTitle:"고급소재 스카프/목도리",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"일반/캡 모자",
                    chargeText: "5,000원"
                },
                {
                    chargeTitle:"털 모자",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"모직 장갑",
                    chargeText: "6,000원"
                },
                {
                    chargeTitle:"털 장갑",
                    chargeText: "9,000원"
                },
                {
                    chargeTitle:"숄",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"고급소재 숄",
                    chargeText: "12,000원"
                }
          ]},
          {
                    title:"가방",
                    content:"",
                    charges:[
                {
                    chargeTitle:"신발가방",
                    chargeText: "7,000원"
                },
                {
                    chargeTitle:"에코백",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"백팩/크로스백",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"등산용 가방 (25L 이하)",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"등산용 가방 (25L 이상)",
                    chargeText: "30,000원"
                },
                {
                    chargeTitle:"클러치백",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"핸드백",
                    chargeText: "30,000원"
                },
                {
                    chargeTitle:"가죽가방",
                    chargeText: "50,000원"
                }
              ]},
              {
                    title:"인형",
                    content:"",
                    charges:[
                {
                    chargeTitle:"인형 소 (인형 높이 60cm 이하)",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"인형 중 (인형 높이 80cm 이하)",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"인형 대 (인형 높이 1m 이하)",
                    chargeText: "30,000원"
                }
              ]},
              {
                    title:"시트",
                    content:"",
                    charges:[
                {
                    chargeTitle:"차량용 양털시트",
                    chargeText: "25,000원"
                }
              ]}
        ]},
          { buttonTitle: "수선/기술", 
            defaultImg: require("@/assets/images/machine.png"),
            activeImg: require("@/assets/images/machine_blue.png"),
            accordions:[
            {
                    title:"단추",
                    content:"",
                    charges:[
                {
                    chargeTitle:"단추 (예비단추 제공시)",
                    chargeText: "2,000원"
                },
                {
                    chargeTitle:"후크/똑딱이 달기",
                    chargeText: "5,000원"
                }
              ]},
          {
                    title:"단수선",
                    content:"",
                    charges:[
                {
                    chargeTitle:"정장 하의",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"원피스/주름 스커트",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"캐쥬얼 하의 (말아 박음)",
                    chargeText: "6,000원"
                },
                {
                    chargeTitle:"캐쥬얼 하의 (밑단 살림)",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"소매 수선1",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"소매 수선2 (단추 옮김)",
                    chargeText: "35,000원"
                },
                {
                    chargeTitle:"코트 단수선 (핸드메이드)",
                    chargeText: "40,000원"
                }

              ]
          },
          {
                    title:"통수선",
                    content:"",
                    charges:[
                {
                    chargeTitle:"캐쥬얼 하의",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"정장 하의",
                    chargeText: "25,000원"
                }]
          },
          {
                    title:"일반수선",
                    content:"",
                    charges:[
                {
                    chargeTitle:"정장 하의 허리수선",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"캐주얼 하의 허리수선",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"하의 허리 고무줄",
                    chargeText: "15,000원"
                },
                {
                    chargeTitle:"박음질1",
                    chargeText: "4,000원"
                },
                {
                    chargeTitle:"박음질2 (30cm 이상)",
                    chargeText: "8,000원"
                },
                {
                    chargeTitle:"누빔1",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"누빔2 (15cm이상)",
                    chargeText: "15,000원"
                }
              ]
          },
          {
                    title:"지퍼수선",
                    content:"",
                    charges:[
                {
                    chargeTitle:"정장 하의",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"캐주얼 하의",
                    chargeText: "13,000원"
                },
                {
                    chargeTitle:"콘솔 지퍼",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"원피스",
                    chargeText: "25,000원"
                },
                {
                    chargeTitle:"점퍼",
                    chargeText: "35,000원"
                },
                {
                    chargeTitle:"지퍼슬라이더 교체",
                    chargeText: "7,000원"
                }]
          },
          {
                    title:"기타 수선",
                    content:`&#8226; 수선항목에 없는 수선일 경우 전문가의 판단에 따라 분류`,
                    charges:[
                {
                    chargeTitle:"수선1",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"수선2",
                    chargeText: "20,000원"
                },
                {
                    chargeTitle:"수선3",
                    chargeText: "30,000원"
                }]
          },
          {
                    title:"오염제거",
                    content:`&#8226; 혈액&#44; 커피&#44; 기름&#44; 볼펜&#44; 황변 등 일반세탁으로 제거되지 않는 얼룩제거 작업이 필요한 경우 <br>1단계 : 10cm 이상 <br>2단계 : 10cm 이상`,
                    charges:[
                {
                    chargeTitle:"오염 1단계",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"오염 2단계",
                    chargeText: "20,000원"
                }]
          },
          {
                    title:"반려동물 털케어",
                    content:`&#8226; 반려동물의 털이 많이 묻어 단독세탁과 별도의 털제거 작업과 항균케어가 필요한 경우 <br> 1단계 : 전체 50% 이하 범위 <br> 2단계 : 전체 50% 이상 범위`,
                    charges:[
                {
                    chargeTitle:"반려동물 털케어 1단계",
                    chargeText: "10,000원"
                },
                {
                    chargeTitle:"반려동물 털케어 2단계",
                    chargeText: "20,000원"
                }]
          },
          {
                    title:"보풀제거",
                    content:`&#8226; 기본 제공되는 서비스 범위를 넘는 경우 <br> 1단계 : 전체 50% 이하 범위 <br> 2단계 : 전체 50% 이상 범위`,
                    charges:[
                {
                    chargeTitle:"보풀제거 1단계",
                    chargeText: "5,000원"
                },
                {
                    chargeTitle:"보풀제거 2단계",
                    chargeText: "10,000원"
                }]
          }
        ]
          }]
        }
    },
      methods: {
          goBack(){
          this.$router.push('/');
          },
          changeContent(index){
            this.activeButtonIndex=index;
            const selectedContent = this.buttons[index];
            this.accordions = selectedContent.accordions;
          }
        }
  };
  </script>
  
  <style scoped>
  .material-symbols-outlined {
    font-size: 80px;
    color: #A1A8BD;
    font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
  }
  template, div, footer {
    padding: 0;
  }
  .card_custom {
    font-size: 14px;
    padding: 15px;
    background-color: #F4FAFE;
    border-radius: 20px;
  }
  .flex_wrap h3 {
    font-size: 20px;
  }
  .info {
    width: 30px;
    height: 30px;
    position: absolute;
  }
  .button_style {
    border: 1px solid #CCD3E8;
    width: 130px;
    height: 140px;
    border-radius: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #b5b5b5;
    font-weight: bold;
    font-size: 18px;
  }
  .button_style img {
    width: 70px;
    height: 70px;
    margin-bottom: 14px;
  }
  .flex_wrap_for_buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .button_style:hover {
    border: 2px solid #2196F3;
    background-color: #e5f1fc;
    color: #2196F3;
  }
  .button_style.active{
    border: 2px solid #2196F3;
    background-color: #e5f1fc;
    color: #2196F3;
  }
  .button_style.active:first-child{
    background-image: url("/public/images/images/clean-clothes_blue.png");
  }
  .activeButton{
    border: 2px solid #2196F3;
    background-color: #e5f1fc;
    color: #2196F3;
  }
  .charge_box{
    background-color: #F4FAFE;
    font-size: 14px;
    
    border-radius: 10px;
    box-sizing: border-box;
  }
  .charge_box_title{
    font-size: 18px;
    font-weight: bold;
  }
  .charge_box p{
    color: #798094;
    padding: 20px;
  }
  .not_handled{
    padding: 20px;
    border: 2px solid #F4FAFE;
    border-radius: 11px;
    
}
.not_handled_title_wrap{
    display:flex;
    margin-bottom: 10px;
}
 .not_handled img{
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
.charge_style{
    border-bottom: 1px solid #939393;
    font-size: 17px;
    color: #2F3647
}
.charge_style p{
    display:flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;
}
.chargeTitle_style{
  width: 240px
}

  </style>
  