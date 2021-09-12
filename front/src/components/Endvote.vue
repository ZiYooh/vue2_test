<template>
  <v-main class>
    <h1 class="text-center title">종료된 투표</h1>
  <v-card
    class="mx-auto"
    max-width="1000"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in votes"
          v-bind:key="card.voteName"
          :cols="card.flex"
        >
          <v-card min-width="1000">
            <router-link :to="{ name: 'NowVote', params: {code: card.voteCode} }">
              <v-card-title v-text="card.voteName"></v-card-title>
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
// TODO: 백엔드쪽 라우터 수정, 모델 만들어서 종료된 투표 리스트 가져오기
import axios from "axios";

export default {
  data() {
    return {
			votes: [],
		};
  },

  beforeCreate: function () {
      console.log('beforeCreate');
    },

  created() {
		axios.get("http://localhost:5000/users/votelist").then((response) => {
			this.votes = response.data;
      console.log(this.votes[0].voteCode);
		});
	},

  mounted: function () {
      console.log('mounted');
    },

  updated: function () {
      console.log('updated');
  }
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
