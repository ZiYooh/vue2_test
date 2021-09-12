<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
          <v-item-group>
            <!-- <label for="subject">제목</label> -->
            <v-card outlined dense >
              {{result[0].subject}}
            </v-card>
            <!-- <v-text-field
              outlined
              dense
              type="text"
              v-model="subject"
              class="form-control"
              name="subject"
              >
            </v-text-field> -->
          </v-item-group>
          <v-item-group>
            <!-- <label for="content">게시글 내용</label> -->
            <v-card outlined dense height="250" >
              {{result[0].content}}
            </v-card>
            <!-- <v-textarea
              outlined
              dense
              height="175"
              v-model="content"
              class="form-control"
              name="content"
              placeholder="">
              </v-textarea> -->
          </v-item-group>          
          <v-container>
            <v-card style="width: 10%; float: left;">
              <v-btn large block color="info" @click='toNotice' style='width:100px;float: left'>
                목록
              </v-btn>
            </v-card>
            <v-card style="width: 10%; float: right;">
              <v-btn v-if="this.$store.state.user == 2" large block color="info" @click='sakjei' style='width:100px;float: right;'>
                게시글 삭제
              </v-btn>
            </v-card>
            <v-card style="width: 10%; float: middle;">
              <v-btn v-if="this.$store.state.user == 2" large block color="info" @click='soojung(result[0])' style='width:100px;float: middle;'>
                게시글 수정
              </v-btn>
            </v-card>
    
    </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from "axios";
//import router from "../router";


export default {
    data() {
		return {
			writes: [],
      result : '',
		};
	},
	created() {
		axios.get("http://localhost:5000/users/getlist").then((response) => {
			this.writes = response.data;
      var id = this.$route.query;
      this.result = this.writes.filter(function(param){
      return param._id === id;
     });
      //console.log(this.result[0]);
		});
	},
  mounted(){
   
  },

  methods: {
    toNotice() {
      this.$router.push({ name: "Notice"});
		},
    sakjei() {
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
