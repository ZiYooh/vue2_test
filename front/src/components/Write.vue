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
          
          <v-btn class="float-right" color="success" type="submit">
            게시글 등록
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
import router from "../router";
import jwtDecode from "jwt-decode";

export default {
  data() {
    const token = localStorage.usertoken;
		const decoded = jwtDecode(token);
    return {
      subject: "",
      content: "",
      compName: decoded.compName,
    };
  },
  methods: {
    write() {
      axios
        .post("http://localhost:5000/users/write", {
          subject: this.subject,
          content: this.content,
          writer: this.compName,
        })
        .then(() => {
          alert('등록되었습니다.');
          router.push({ name: "Notice" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
     toNotice() {
			router.push("./notice");
		}
  },
};
</script>
