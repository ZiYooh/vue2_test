<template>
  <v-main>
    <v-content class="mx-15">
      <v-card
        outlined
        class="mx-auto mt-5"
        max-width="1500"
      >
        <v-col>
          <h3 class="mt-3 ml-2">공지사항</h3>
        </v-col>
        <v-divider class="mx-4"></v-divider>

        <v-col>
          <span class="mytitle mt-3 ml-2">제목: {{result[0].subject}}</span>
        </v-col>
        <v-divider class="mx-4"></v-divider>

        <v-col>
          <span class="ml-2">작성자: {{result[0].writer}}</span>
        </v-col>
        <v-divider class="mx-4"></v-divider>

        <v-col>
          <span class="ml-2">작성일: {{result[0].date}}</span>
        </v-col>
        <v-divider class="mx-4 mb-4"></v-divider>

        <v-col>
          <span class="ml-2">{{result[0].content}}</span>
        </v-col>
        <v-divider class="mx-4 mt-4 mb-4"></v-divider>
        
        <v-col class="mb-3 text-right">
          <v-btn v-if="this.$store.state.user == 2" large color="error" @click='sakjei'>
            게시글 삭제
          </v-btn>
          <v-btn v-if="this.$store.state.user == 2" large color="success" @click='soojung(result[0])'>
            게시글 수정
          </v-btn>
          <v-btn large color="info" @click='toNotice'>
            목록
          </v-btn>
        </v-col>
      </v-card>
    </v-content>
  </v-main>
</template>

<script>
import axios from "axios";

let i;

//import router from "../router";


export default {
    data() {
		return {
			writes: [],
      body: [],
      result : '',
		};
	},
	created() {
		axios.get("http://localhost:5000/users/getlist").then((response) => {
			this.writes = response.data;
      var id = this.$route.query;
      this.result = this.writes.filter(function(param){
        return param._id === id;
      }
    );
      this.result[0].date = this.result[0].date.substring(0,10);
      console.log(this.result[0]);
		});
	},

  methods: {
    toNotice() {
      this.$router.push({ name: "Notice"});
		},
    sakjei() {
      if(!confirm('정말로 삭제 하시겠습니까?')){
        alert('취소되었습니다.');
      } else {
        axios
        .post("http://localhost:5000/users/del", {
          _id: this.$route.query,
        })
        .then(() => {
          alert('삭제되었습니다.');
          this.$router.push({ name: "Notice" });
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    soojung(param) {
      this.$router.push({ name: "Update" , query: param});
    },
    // sakjei() {
    //   this.$router.push({ name: "Notice"});
		// },
  },

};

</script>

<style>
.mytitle {
  font-weight: bold;
  font-size: 18px;
}
</style>