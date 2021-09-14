<template>
  <v-main class>
  <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1500"
  >
      <v-col>
        <h3 class="mt-3 ml-2 mb-2">종료된 투표</h3>
      </v-col>
    <v-divider class="mb-5 mx-4"></v-divider>
      <v-row dense>
        <v-col
          v-for="card in votes"
          v-bind:key="card.voteName"
          :cols="card.flex"
        >
          <v-card :elevation="7" class="mx-4 mt-5 mb-8" min-width="1400">
            <router-link id="myid2" :to="{ name: 'EndVoteView', params: {code: card.voteCode} }">
              <v-card-title v-text="card.voteName"></v-card-title>
            </router-link>
            <span class="ml-4">투표 기간: {{card.startDate.substring(0,10)}} ~ {{card.endDate.substring(0,10)}}</span>
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
          <v-divider class="mx-4 mb-1"></v-divider>
        </v-col>
      </v-row>
  </v-card>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
			votes: [],
		};
  },

  created() {
		axios.get("http://localhost:5000/users/endvotelist").then((response) => {
			this.votes = response.data;
      console.log(this.votes[0].voteCode);
		});
	},
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

#myid2 {
  color: black;
  font-size: 20px;
  text-decoration: none;
  font-weight: normal;
}
</style>
