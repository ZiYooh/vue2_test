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
        <v-btn large block color="info" @click='toNotice' style='width:100px;'>
            목록
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
      console.log(this.result[0]);
		});
	},
  mounted(){
   
  },

  methods: {
    toNotice() {
      //router.push({ name: "Notice" , query: {name: 'cat', age: 3}});
      this.$router.push({ name: "Notice"});
		},
  },

};

</script>
