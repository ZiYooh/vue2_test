<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="update">
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
        <v-btn large block color="info" @click='update' style='width:100px;float: right;'>
            게시글 수정
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
//import router from "../router";

export default {
  data() {
    return {
      //_id : this.$route.query._id,
      oldsubject: this.$route.query.subject,
      subject: this.$route.query.subject,
      content: this.$route.query.content,
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
