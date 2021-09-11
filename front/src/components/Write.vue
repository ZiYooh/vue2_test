<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="write">
          <v-item-group>
            <label for="subject">제목</label>
            <v-text-field
              outlined
              dense
              type="text"
              v-model="subject"
              class="form-control"
              name="subject"
              placeholder="제목을 입력하세요"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="content">게시글 내용</label>
            <v-textarea
              outlined
              dense
              height="175"
              v-model="content"
              class="form-control"
              name="content"
              placeholder=""></v-textarea>
          </v-item-group>          
          <v-container>
            <v-card style="width: 10%; float: left;">
        <v-btn large block color="info" @click='toNotice' style='width:100px;'>
            목록
      </v-btn>
    </v-card>
      <v-card style="width: 10%; float: right;">
        <v-btn large block color="info" type="submit" style='width:100px;float: right;'>
            게시글 등록
      </v-btn>
    </v-card>
    </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      subject: "",
      content: "",
    };
  },
  methods: {
    write() {
      axios
        .post("http://localhost:5000/users/write", {
          subject: this.subject,
          content: this.content,
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
