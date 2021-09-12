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
      
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1250"
    >
    <h2 class="text-center mt-3 mb-3"> 최근 공지사항 </h2>
    <v-simple-table class="" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              번호
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              작성자
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(write, index) in reverse" :key="write.id">
						<td >{{ index + 1 }}</td>
            <!-- <td class="txt_left"><a href="javascript:;" @click="fnView(`${write.id}`)">{{write.subject}}</a></td> -->
						<td v-on:click.stop="showCont(write)">{{ write.subject }}</td>
						<td>관리자</td>
						<td>{{ write._id }}</td>
					</tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-col class="text-right">
      <v-btn to="/notice" depressed small color="#779999"> 더보기 </v-btn>
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
      };
    },

    created() {
        axios.get("http://localhost:5000/users/getlist").then((response) => {
        this.writes = response.data;
      
      });
    },

    computed: {
      reverse: function() {
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

</style>