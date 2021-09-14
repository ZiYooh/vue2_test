<template>
  <v-main>
    <v-card class="mx-auto" max-width="1250">
      <v-carousel cycle height="400" interval="4000">
        <v-carousel-item to="/FAQ" :src="require('@/assets/banner_test.png')">
        </v-carousel-item>

        <v-carousel-item to="/nowvote/HELLO" :src="require('@/assets/banner_test2.png')">
        </v-carousel-item>

        <v-carousel-item to="/nowvote/SANGSU" :src="require('@/assets/banner_test3.png')">
        </v-carousel-item>
        
        <v-carousel-item to="/nowvote/TESTONE" :src="require('@/assets/banner_test4.png')">
        </v-carousel-item>
      </v-carousel>
    </v-card>
    
    <!-- 최근 공지 카드 -->
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1250"
    >
    <h3 class="mt-3 ml-5 mb-4">최근 공지사항</h3>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-simple-table dense class="mx-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              번호
            </th>
            <th class="text-center">
              제목
            </th>
            <th class="text-center">
              작성자
            </th>
            <th class="text-center">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(write, index) in reverse" :key="write.id">
						<td class="text-center">{{ index + 1 }}</td>
            <!-- <td class="txt_left"><a href="javascript:;" @click="fnView(`${write.id}`)">{{write.subject}}</a></td> -->
						<td v-on:click.stop="showCont(write)" style="cursor:pointer;">{{ write.subject }}</td>
						<td class="text-center">{{ write.writer}}</td>
						<td class="text-center">{{ write.date }}</td>
					</tr>
        </tbody>        
      </template>
    </v-simple-table>
    <v-col class="text-right">
      <v-btn to="/notice" depressed small color="#D3D3D3"> 더보기 </v-btn>
    </v-col>
    </v-card>

    <!-- 최근 투표 카드 -->
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1250"
    >
    <h3 class="mt-3 ml-5 mb-4">최근 진행중인 투표</h3>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-simple-table dense class="mx-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              번호
            </th>
            <th class="text-center">
              투표 제목
            </th>
            <th class="text-center">
              시작일
            </th>
            <th class="text-center">
              종료일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in votes" :key="item.id">
						<td class="text-center">{{ index + 1 }}</td>
            <td>
            <router-link class="myclass" :to="{ name: 'NowVote', params: {code: item.voteCode} }">
              {{ item.voteName }}
            </router-link>
            </td>
            <td class="text-center">{{ item.startDate }}</td>
						<td class="text-center">{{ item.endDate }}</td>
					</tr>
        </tbody>      
      </template>
    </v-simple-table>
    
    <v-col class="text-right">
      <v-btn to="/votelist" depressed small color="#D3D3D3"> 더보기 </v-btn>
    </v-col>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../router";

let i;
let j = 4;

  export default {
    data() {
      return {
        writes: [],
        body: [],
        final: [],
        votes: [],
      };
    },

    created() {
      axios.get("http://localhost:5000/users/getlist").then((response) => {
        this.writes = response.data;
      });
      axios.get("http://localhost:5000/users/votelist").then((response) => {
        this.votes = response.data;
      });
    },

    computed: {
      reverse: function() {
        for(i = 0; i < this.writes.length; i++){
          this.writes[i].date = this.writes[i].date.substring(0,10);
        }
        for(i = 0; i < this.votes.length; i++){
          this.votes[i].startDate = this.votes[i].startDate.substring(0,10);
          this.votes[i].endDate = this.votes[i].endDate.substring(0,10);
        }
        
        if(this.writes.length > 5){
          for(i = 0; i < 5; i++) {
            this.final[i] = this.writes[i];
          }
        }
        else{
          for(i = 0; i <this.writes.length; i++) {
            this.final[i] = this.writes[i];
          }
        }
          return this.final.reverse();
      },
    },

    mounted() {

    },

    methods: {
      fnView(num) {
        this.body.num = num;
			  this.$router.push({path:'./view',query:this.body}); //추가한 상세페이지 라우터

        //router.push({ name: "ContPage" , query: this.writes});
      },
      showCont(write) {
      //router.push({ name: "ContPage"});
      
        router.push({ name: "ContPage" , query: write._id});
      }
    },
  };
</script>

<style scoped>
.myclass{
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>