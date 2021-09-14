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
          <v-form v-on:submit.prevent="write">
          <v-item-group>
            <label for="subject">제목</label>
            <v-text-field
              type="text"
              v-model="subject"
              class="form-control"
              name="subject"
              placeholder="제목을 입력하세요"></v-text-field>
          </v-item-group>
        <v-divider class="mx-4 mb-4"></v-divider>

          <v-item-group>
          <label for="content">내용</label>
            <v-textarea
            solo
              height="400"
              v-model="content"
              class="form-control"
              name="content"
              placeholder="내용을 입력하세요"></v-textarea>
          </v-item-group>
          <v-divider class="mx-4 mb-5"></v-divider>
          
          <v-btn class="float-right" color="success" @click='update'>
            게시글 수정
          </v-btn>
          <v-btn color="info" @click='toNotice'>
            목록
          </v-btn>
        </v-form>
      </v-col>

      </v-card>
    </v-content>
  </v-main>
</template>

<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
//import router from "../router";

export default {
  data() {
    const token = localStorage.usertoken;
		const decoded = jwtDecode(token);
    return {
      //_id : this.$route.query._id,
      oldsubject: this.$route.query.subject,
      subject: this.$route.query.subject,
      content: this.$route.query.content,
      compName: decoded.compName,
      newSubject: "",
      newContent: "",
    };
  },
  methods: {
    update() {
      axios
        .post("http://localhost:5000/users/upd", {
          //_id : this._id,
          
          oldsubject: this.oldsubject,
          subject: this.subject,//여기서 안
          content: this.content,//들어가는 듯? alert도 안 뜨는거 보니
          writer: this.compName,
        })
        .then(() => {
          alert('수정되었습니다.');
          this.$router.push({ name: "Notice" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
     toNotice() {
			this.$router.push("./notice");
		}
  },
};
</script>
