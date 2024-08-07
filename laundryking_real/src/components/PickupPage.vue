<template>
    <div>
        <v-main style="padding:0;">
            <v-row style="padding:0;">
                <v-col><button @click="goBack"><span class="material-symbols-outlined d-flex align-center mt-1">chevron_backward</span></button></v-col>

                <v-col class="d-flex justify-center align-center mt-2"><h2>픽업 지역</h2></v-col>
                <v-col></v-col>
            </v-row>

            <v-container>
                <v-row class="d-flex justify-center">
                    <v-col cols="10">
                        <img src="/images/images/pickup_map_img.png" alt="" width="100%">
                    </v-col>
                </v-row>

                <v-row class="d-flex justify-center">
                    <v-col cols="10" class="title">
                        <h3>픽업지역 <span>안내</span></h3>
                        <p>세탁왕은 서울, 수도권 지역을 중심으로 픽업지역을 확대해나가고 있습니다.<br>
                        빠르게 하지만 신중하게 지역을 확장해 나가도록 하겠습니다.</p>
                    </v-col>
                    <v-col cols="10" class="explain_text">
                        <p>&ast; 당사의 상황에 따라 일반픽업지역은 예고없이 조정(확대, 축소)될 수 있습니다.<br>
                        &ast; 비대면 픽업이 불가한 지역은 부득이하게 택배사를 통해 수거, 배송을 진행하고 있습니다.<br>
                        기간은 좀 더 소요되지만, 더욱 신경써서 케어하도록 하겠습니다.</p>
                    </v-col>
                </v-row>


                <v-row class="d-flex justify-center mt-10">
                    <v-col cols="10">
                        <div id="map" style="height: 300px;"></div>
                    </v-col>
                </v-row>

                <v-row class="d-flex justify-center mt-10">
                    <v-col cols="10">
                        <v-card variant="outlined">
                            dd
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
    export default{
        mounted() {
            this.initMap();
        },
        
        methods:{
            goBack(){
            this.$router.go(-1);
            },

            initMap() {
                const script = document.createElement('script');
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f140c994c5ebb7e74fda1c28655364fa`;
                script.onload = () => {
                    const mapContainer = document.getElementById('map');
                    const mapOption = {
                    center: new kakao.maps.LatLng(37.5665, 126.978),
                    level: 3
                    };
                    const map = new kakao.maps.Map(mapContainer, mapOption);
                    
                    // 마커 추가
                    const markerPosition = new kakao.maps.LatLng(37.5665, 126.978);
                    const marker = new kakao.maps.Marker({
                    position: markerPosition
                    });
                    marker.setMap(map);
                };
                document.head.appendChild(script);
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
  'opsz' 24
}
template, div, footer{
    padding:0
}

.title h3 {
    margin-top: 30px;
    font-size: 34px;
}
.title h3 span {
    font-weight: 100;
}

.title p {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 700;
}

.explain_text p {
    margin-top: 20px;
    font-size: 12px;
    color: #A1A8BD;
    font-weight: 300;
}
#map {
    border-radius: 25px;
}
</style>