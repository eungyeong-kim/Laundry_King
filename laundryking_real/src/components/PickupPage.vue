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
                        <v-card variant="outlined" color="#CCD3E8" class="d-flex align-center location-card">
                            <img src="images/images/image3.jpg" alt="" width="100px" class="clean-img my-5 ml-5">
                            <div class="ml-5">
                                <h4>크린세탁 구산점</h4>
                                <p class="mt-2"><v-icon color="#CCD3E8" class="mr-2">mdi-map-marker</v-icon>서울 은평구 연서로15길 34 1층 크린세탁</p>
                                <p class="d-flex align-center mt-1"><v-icon color="#CCD3E8" class="mr-2">mdi-clock-outline</v-icon>9:00 ~ 20:30 <v-icon color="#CCD3E8" class="mx-2">mdi-phone</v-icon>02-338-4133</p>
                            </div>
                            
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
                    center: new kakao.maps.LatLng(37.611, 126.913),
                    level: 2
                    };
                    const map = new kakao.maps.Map(mapContainer, mapOption);
                    
                    var imageSrc = '/images/images/map-marker.png', // 마커이미지의 주소입니다    
                        imageSize = new kakao.maps.Size(59, 59), // 마커이미지의 크기입니다
                        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                        
                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                        markerPosition = new kakao.maps.LatLng(37.611, 126.913); // 마커가 표시될 위치입니다

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        position: markerPosition, 
                        image: markerImage // 마커이미지 설정 
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
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
.clean-img {
    border-radius: 10px;
}

.location-card {
    border-radius: 15px;
}
.location-card h4 {
    font-size: 18px;
}
.location-card p {
    font-size: 12px;
}
</style>