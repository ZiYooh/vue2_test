<template>
  <v-main class="mt-15">
    <h1 class="text-center title">현재 진행중인 투표</h1>
  <v-card
    class="mx-auto"
    max-width="1250"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <router-link to="/candidate">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
            </router-link>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    cards: [
      { title: '롯데리아 레전드 버거 투표!! (2021/09/01 ~ 2021/12/31)', src: 'http://www.iconsumer.or.kr/news/photo/201909/9801_12230_5033.png', flex: 12 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12 },
    ],
  }),
};
</script>

<style>
@font-face {
    font-family: 'InfinitySans-RegularA1';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.title {
  font-family: InfinitySans-RegularA1;
}
</style>
