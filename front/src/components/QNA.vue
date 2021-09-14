<template>
  <v-main>
  <v-content class="mx-15">
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1500"
    >
    <v-col>
      <h3 class="mt-3 ml-2">QnA (묻고 답하기)</h3>
    </v-col>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-simple-table class="mx-4">
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
      <v-btn v-if="this.$store.state.user >= 1" color="info" @click="toWrite">
            게시글 등록
      </v-btn>
    </v-col>
    <v-pagination
      v-model="page"
      :length="1"
    ></v-pagination>
    </v-card>
  </v-content>  
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../router";

let i;

export default {
    data() {
		return {
			writes: [],
      body: [],
      page: 1,
		};
	},
	created() {
		axios.get("http://localhost:5000/users/getqnalist").then((response) => {
			this.writes = response.data;
		});
	},

  computed: {
    reverse: function() {
      for(i = 0; i < this.writes.length; i++){
        this.writes[i].date = this.writes[i].date.substring(0,10);
      }
        return this.writes.reverse();
    }
  },

  methods: {
    toWrite() {
			router.push("./qnawrite");
		},
    fnView(num) {
			this.body.num = num;
			this.$router.push({path:'./view',query:this.body}); //추가한 상세페이지 라우터
      
      //router.push({ name: "ContPage" , query: this.writes});
    },
    showCont(write) {
      //router.push({ name: "ContPage"});
      router.push({ name: "QNAContPage" , query: write._id});
		}
  },
  
};

</script>

<style>

</style>
