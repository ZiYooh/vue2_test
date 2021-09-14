<template>
  <v-main>
    <v-content class="mx-15">
		<v-card
      class="mx-auto px-8 mt-7"
      max-width="1000"
    >
    <v-row>
      <v-col class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">
						투표 개설 신청 페이지
					</h1>
          <v-item-group>
            <label for="voteName">투표 제목</label>
            <v-text-field
              type="text"
              v-model="voteName"
              class="form-control"
              name="voteName"
              label="투표 제목"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="voteCode">투표 고유 코드</label>
            <v-text-field
              type="text"
              v-model="voteCode"
              class="form-control"
              name="voteCode"
              label="임의 길이의 영문을 입력 해 주세요"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="startDate">투표 시작일</label>
            <v-text-field
              type="date"
              v-model="startDate"
              class="form-control"
              name="startDate"
              label="투표 시작일"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="endDate">투표 마감일</label>
            <v-text-field
              type="date"
              v-model="endDate"
              class="form-control"
              name="endDate"
              label="투표 마감일"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="candidates">후보 등록</label>
            <v-text-field
              outlined
              dense
              type="text"
              v-model="candidates"
              class="form-control"
              name="voteName"
              placeholder="후보들을 콤마(,)로 구분 하여 입력 해 주세요"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="description">투표 설명</label>
            <v-text-field
              type="textarea"
              v-model="description"
              class="form-control"
              name="description"
              placeholder="투표의 목적과 정보를 적으세요"></v-text-field>
          </v-item-group>
          <v-btn class="mb-5" large block color="info" type="submit">
            신청
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    </v-card>
    </v-content>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      voteName: "",
      voteCode: "",
      startDate: "",
      endDate: "",
      cadidates: "",
      description: "",
      //voteImage: "",
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:5000/users/makevote", {
          voteName: this.voteName,
          voteCode: this.voteCode,
          startDate: this.startDate,
          endDate: this.endDate,
          candidates: this.candidates,
          description: this.description,
          //voteImage: this.voteImage,
        })
        .then(() => {
          alert("신청이 완료되었습니다!");
          router.push({ name: "HelloWorld" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /*
    onInputImage(){
      this.voteimage = this.$refs.voteImage.files
      console.log(this.voteimage)
    },
    */
  },
};
</script>
