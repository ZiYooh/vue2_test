<template>
  <div>
  <v-content class="mx-15">
    <h1>공지사항 페이지 입니다</h1>
    <h1>{{writes[0]}}</h1>
    
    <v-simple-table class="mx-15" dense>
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
          
          <tbody>
				</tbody>
          <!-- <tr>
            <td>02</td>
            <td>서버 점검 입니다</td>
            <td>관리자</td>
            <td>2021/01/02</td>
          </tr>
          <tr>
            <td>01</td>
            <td>공지사항 입니다</td>
            <td>관리자</td>
            <td>2021/01/01</td>
          </tr> -->
          
          
        </tbody>
        
      </template>
    </v-simple-table>
  </v-content>
  <div>
    <v-container>
      <v-card style="width: 10%; float: right;">
        <v-btn large block color="info" @click="toWrite" style='width:20px;float: right;'>
            게시글 등록
      </v-btn>
    </v-card>
    
    </v-container>
  </div>

  
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    data() {
		return {
			writes: [],
      body: [],
		};
	},
	created() {
		axios.get("http://localhost:5000/users/getlist").then((response) => {
			this.writes = response.data;
		});
	},

  computed: {
    reverse: function() {
        return this.writes.reverse();
    }
  },

  methods: {
    toWrite() {
			router.push("./write");
		},
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

<style>

</style>
